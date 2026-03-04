package com.example.poc.websocket;

import java.io.IOException;
import java.time.Instant;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.CopyOnWriteArrayList;
import java.util.concurrent.CopyOnWriteArraySet;
import java.util.stream.Collectors;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.*;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.example.poc.entity.AstStats;
import com.example.poc.entity.BugInRoute;
import com.example.poc.entity.Clicked;
import com.example.poc.entity.CrewLogin;
import com.example.poc.repository.AstStatsRepository;
import com.example.poc.repository.BugInRouteRepository;
import com.example.poc.repository.ClickedRepository;
import com.example.poc.repository.CrewLoginRepository;
import com.example.poc.service.BatteryService;
import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * WebSocket handler for all real-time communication.
 *
 * Crew login:       crew_register, crew_ping_ack
 * Bug routing:      ReserveBug, RequestToPlaceWaypoint, RequestToClearWaypoint,
 *                   RequestToClearTerminalWaypoint, CancelBugRoute
 * Battery management: StartSimulation, ResetSimulation, QueryBugBatteries
 */
@Component
public class RawWebSocketHandler extends TextWebSocketHandler {

    private static final long PING_TIMEOUT_MS = 15_000;

    // ── Inner types ───────────────────────────────────────────────────────────

    private static class CrewSessionInfo {
        final String guid;
        final String crewId;
        volatile Instant lastPingAck;
        CrewSessionInfo(String guid, String crewId) {
            this.guid = guid;
            this.crewId = crewId;
            this.lastPingAck = Instant.now();
        }
    }

    private static class WaypointEntry {
        final double x, y, z;
        final boolean terminal;
        WaypointEntry(double x, double y, double z, boolean terminal) {
            this.x = x; this.y = y; this.z = z; this.terminal = terminal;
        }
    }

    private static class RouteState {
        final String guid;
        final String crewId;
        final String bugN;
        double cx, cy, cz;
        final List<WaypointEntry> waypoints = new CopyOnWriteArrayList<>();

        RouteState(String guid, String crewId, String bugN, double cx, double cy, double cz) {
            this.guid = guid; this.crewId = crewId; this.bugN = bugN;
            this.cx = cx; this.cy = cy; this.cz = cz;
        }
    }

    // ── Fields ────────────────────────────────────────────────────────────────

    private final CopyOnWriteArraySet<WebSocketSession> sessions = new CopyOnWriteArraySet<>();
    private final ConcurrentHashMap<WebSocketSession, CrewSessionInfo> crewSessions = new ConcurrentHashMap<>();
    private final ConcurrentHashMap<String, RouteState> activeRoutes = new ConcurrentHashMap<>();
    private final ConcurrentHashMap<String, double[]> bugLastPositions = new ConcurrentHashMap<>();
    private final ConcurrentHashMap<WebSocketSession, CopyOnWriteArraySet<String>> sessionBugReservations = new ConcurrentHashMap<>();

    private static final int MAX_BUGS_PER_SESSION = 2;

    private static final String[] ALL_CREW_IDS = {"bowman", "poole", "kimball", "hal"};

    private final ClickedRepository    clickedRepository;
    private final CrewLoginRepository  crewLoginRepository;
    private final BugInRouteRepository bugInRouteRepository;
    private final BatteryService       batteryService;
    private final AstStatsRepository   astStatsRepository;
    private final ObjectMapper         objectMapper = new ObjectMapper();

    public RawWebSocketHandler(ClickedRepository clickedRepository,
                                CrewLoginRepository crewLoginRepository,
                                BugInRouteRepository bugInRouteRepository,
                                BatteryService batteryService,
                                AstStatsRepository astStatsRepository) {
        this.clickedRepository    = clickedRepository;
        this.crewLoginRepository  = crewLoginRepository;
        this.bugInRouteRepository = bugInRouteRepository;
        this.batteryService       = batteryService;
        this.astStatsRepository   = astStatsRepository;
    }

    // ── Connection lifecycle ──────────────────────────────────────────────────

    @Override
    public void afterConnectionEstablished(WebSocketSession session) {
        sessions.add(session);
        send(session, "{\"type\":\"connected\",\"message\":\"Welcome\"}");
        sendCrewStatus(session);

        // Send active route states so late-joiners reconstruct routing visuals.
        for (RouteState rs : activeRoutes.values()) {
            sendRouteSyncToSession(session, rs);
        }

        // Send resting positions for completed/cancelled routes.
        for (Map.Entry<String, double[]> e : bugLastPositions.entrySet()) {
            if (!activeRoutes.containsKey(e.getKey())) {
                double[] p = e.getValue();
                send(session, String.format(
                    "{\"type\":\"BugPositionSync\",\"bugN\":\"%s\",\"x\":%s,\"y\":%s,\"z\":%s}",
                    esc(e.getKey()), p[0], p[1], p[2]));
            }
        }

        // Send current battery state if simulation is running.
        if (batteryService.isSimulationStarted()) {
            sendSimulationStateSync(session);
            sendAstStatsUpdate(session);
        }
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) {
        sessions.remove(session);
        releaseCrewSession(session);
        releaseBugReservation(session);
    }

    @Override
    public void handleTransportError(WebSocketSession session, Throwable exception) {
        sessions.remove(session);
        releaseCrewSession(session);
        releaseBugReservation(session);
    }

    // ── Inbound messages ─────────────────────────────────────────────────────

    @Override
    @SuppressWarnings("unchecked")
    protected void handleTextMessage(WebSocketSession session, TextMessage message) {
        try {
            Map<String, Object> json = objectMapper.readValue(message.getPayload(), Map.class);
            if (json == null) return;
            String type = str(json, "type");
            switch (type == null ? "" : type) {
                case "click"                          -> handleClick(json);
                case "crew_register"                  -> handleCrewRegister(session, json);
                case "crew_ping_ack"                  -> handleCrewPingAck(session);
                case "ReserveBug"                     -> handleReserveBug(session, json);
                case "RequestToPlaceWaypoint"         -> handleRequestToPlaceWaypoint(json);
                case "RequestToClearWaypoint"         -> handleRequestToClearWaypoint(json);
                case "RequestToClearTerminalWaypoint" -> handleRequestToClearTerminalWaypoint(session, json);
                case "CancelBugRoute"                 -> handleCancelBugRoute(session, json);
                case "StartSimulation"                -> handleStartSimulation();
                case "ResetSimulation"                -> handleResetSimulation();
                case "QueryBugBatteries"              -> handleQueryBugBatteries(session, json);
                case "RouteTerrainStats"              -> handleRouteTerrainStats(session, json);
            }
        } catch (Exception e) {
            // invalid JSON — ignore
        }
    }

    // ── Click ─────────────────────────────────────────────────────────────────

    private void handleClick(Map<String, Object> json) {
        String guid = str(json, "guid");
        String cur  = str(json, "currentColor");
        String nxt  = str(json, "nextColor");
        if (guid != null && cur != null && nxt != null)
            clickedRepository.save(new Clicked(cur, nxt, guid));
    }

    // ── Crew login ────────────────────────────────────────────────────────────

    private void handleCrewRegister(WebSocketSession session, Map<String, Object> json) {
        String guid   = str(json, "guid");
        String crewId = str(json, "crewId");
        if (guid == null || crewId == null) return;

        if (crewLoginRepository.findActiveByCrewId(crewId).isPresent()) {
            send(session, sfmt("{\"type\":\"crew_register_response\",\"guid\":\"%s\",\"crewId\":\"%s\",\"status\":\"already_taken\"}",
                guid, crewId));
            return;
        }

        CrewSessionInfo old = crewSessions.remove(session);
        if (old != null) markCrewLoggedOut(old.guid);

        crewLoginRepository.save(new CrewLogin(guid, crewId));
        crewSessions.put(session, new CrewSessionInfo(guid, crewId));

        send(session, sfmt("{\"type\":\"crew_register_response\",\"guid\":\"%s\",\"crewId\":\"%s\",\"status\":\"ok\"}", guid, crewId));
        broadcastCrewStatus();
    }

    private void handleCrewPingAck(WebSocketSession session) {
        CrewSessionInfo info = crewSessions.get(session);
        if (info != null) info.lastPingAck = Instant.now();
    }

    @Scheduled(fixedDelay = 10_000)
    public void pingAndCheckSessions() {
        Instant threshold = Instant.now().minusMillis(PING_TIMEOUT_MS);
        boolean changed = false;
        for (Map.Entry<WebSocketSession, CrewSessionInfo> e : crewSessions.entrySet()) {
            WebSocketSession s = e.getKey();
            CrewSessionInfo info = e.getValue();
            if (!s.isOpen() || info.lastPingAck.isBefore(threshold)) {
                crewSessions.remove(s);
                markCrewLoggedOut(info.guid);
                send(s, sfmt("{\"type\":\"crew_logged_out\",\"guid\":\"%s\",\"crewId\":\"%s\",\"reason\":\"ping_timeout\"}",
                    info.guid, info.crewId));
                changed = true;
            } else {
                send(s, sfmt("{\"type\":\"crew_ping\",\"guid\":\"%s\",\"crewId\":\"%s\"}", info.guid, info.crewId));
            }
        }
        if (changed) broadcastCrewStatus();
    }

    // ── Bug routing ───────────────────────────────────────────────────────────

    private void handleReserveBug(WebSocketSession session, Map<String, Object> json) {
        String guid   = str(json, "guid");
        String crewId = str(json, "crewId");
        String bugN   = str(json, "bugN");
        if (guid == null || crewId == null || bugN == null) return;

        double cx = dbl(json, "x");
        double cy = dbl(json, "y");
        double cz = dbl(json, "z");

        if (bugInRouteRepository.findActiveByBugN(bugN).isPresent()) {
            send(session, sfmt("{\"type\":\"AlreadyReserved\",\"bugN\":\"%s\"}", bugN));
            return;
        }

        CopyOnWriteArraySet<String> myReservations = sessionBugReservations.getOrDefault(session, new CopyOnWriteArraySet<>());
        if (myReservations.size() >= MAX_BUGS_PER_SESSION) {
            send(session, "{\"type\":\"RoutingLimitExceeded\"}");
            return;
        }

        bugInRouteRepository.save(new BugInRoute(guid, crewId, bugN));
        sessionBugReservations.computeIfAbsent(session, k -> new CopyOnWriteArraySet<>()).add(bugN);
        activeRoutes.put(bugN, new RouteState(guid, crewId, bugN, cx, cy, cz));

        broadcast(sfmt("{\"type\":\"RoutingRequestGranted\",\"guid\":\"%s\",\"crewId\":\"%s\",\"bugN\":\"%s\"}",
            guid, crewId, bugN));
    }

    private void handleRequestToPlaceWaypoint(Map<String, Object> json) {
        String  guid     = str(json, "guid");
        String  crewId   = str(json, "crewId");
        String  bugN     = str(json, "bugN");
        double  x        = dbl(json, "x");
        double  y        = dbl(json, "y");
        double  z        = dbl(json, "z");
        boolean terminal = Boolean.parseBoolean(str(json, "terminal"));
        if (bugN == null) return;

        RouteState rs = activeRoutes.get(bugN);
        if (rs != null) rs.waypoints.add(new WaypointEntry(x, y, z, terminal));

        String msg = String.format(
            "{\"type\":\"ResponseToPlaceWaypoint\",\"guid\":\"%s\",\"crewId\":\"%s\"," +
            "\"bugN\":\"%s\",\"x\":%s,\"y\":%s,\"z\":%s,\"terminal\":%b}",
            esc(guid != null ? guid : ""), esc(crewId != null ? crewId : ""),
            esc(bugN), x, y, z, terminal);
        broadcast(msg);
    }

    private void handleRequestToClearWaypoint(Map<String, Object> json) {
        String bugN = str(json, "bugN");
        if (bugN == null) return;

        RouteState rs = activeRoutes.get(bugN);
        if (rs != null && !rs.waypoints.isEmpty()) {
            WaypointEntry cleared = rs.waypoints.remove(0);
            rs.cx = cleared.x;
            rs.cy = cleared.y;
            rs.cz = cleared.z;
        }

        broadcast(sfmt("{\"type\":\"ResponseToClearWaypoint\",\"bugN\":\"%s\"}", bugN));
    }

    private void handleCancelBugRoute(WebSocketSession session, Map<String, Object> json) {
        String bugN = str(json, "bugN");
        if (bugN == null) return;
        double x = dbl(json, "x");
        double y = dbl(json, "y");
        double z = dbl(json, "z");

        activeRoutes.remove(bugN);
        bugLastPositions.put(bugN, new double[]{ x, y, z });
        bugInRouteRepository.findActiveByBugN(bugN).ifPresent(r -> {
            r.setReleasedTime(Instant.now());
            bugInRouteRepository.save(r);
        });
        removeSessionReservation(session, bugN);

        broadcast(String.format(
            "{\"type\":\"BugReservationReleased\",\"bugN\":\"%s\",\"x\":%s,\"y\":%s,\"z\":%s}",
            esc(bugN), x, y, z));
    }

    private void handleRequestToClearTerminalWaypoint(WebSocketSession session, Map<String, Object> json) {
        String guid  = str(json, "guid");
        String bugN  = str(json, "bugN");
        if (bugN == null) return;

        RouteState rs = activeRoutes.remove(bugN);
        String crewId = rs != null ? rs.crewId : null;
        double termX = 0, termY = 0, termZ = 0;
        if (rs != null) {
            if (!rs.waypoints.isEmpty()) {
                WaypointEntry terminal = rs.waypoints.get(0);
                termX = terminal.x; termY = terminal.y; termZ = terminal.z;
            } else {
                termX = rs.cx; termY = rs.cy; termZ = rs.cz;
            }
            bugLastPositions.put(bugN, new double[]{ termX, termY, termZ });
        }

        bugInRouteRepository.findActiveByBugN(bugN).ifPresent(r -> {
            r.setReleasedTime(Instant.now());
            bugInRouteRepository.save(r);
        });
        removeSessionReservation(session, bugN);

        // Increment route-completed count for the owning AST.
        int batteriesDelivered = 0;
        if (crewId != null) {
            AstStats stats = astStatsRepository.findById(crewId).orElse(new AstStats(crewId));
            stats.setRoutesCompleted(stats.getRoutesCompleted() + 1);
            astStatsRepository.save(stats);
        }

        // Server auto-detects docking and performs battery transfer.
        if (batteryService.isSimulationStarted()) {
            String nearestRack = batteryService.findNearestRack(termX, termZ);
            if (nearestRack != null) {
                Instant now = Instant.now();
                BatteryService.TransferResult result = batteryService.performTransfer(bugN, nearestRack, now);
                batteriesDelivered = result.batteriesDeliveredToFacility();

                // Update batteries_delivered stat for the owning AST.
                if (crewId != null && batteriesDelivered > 0) {
                    AstStats stats = astStatsRepository.findById(crewId).orElse(new AstStats(crewId));
                    stats.setBatteriesDelivered(stats.getBatteriesDelivered() + batteriesDelivered);
                    astStatsRepository.save(stats);
                }

                // Notify all clients of updated bug inventory.
                BatteryService.BugInventory inv = result.bugInventory();
                broadcast(String.format(
                    "{\"type\":\"BugInventoryUpdate\",\"bugN\":\"%s\",\"charged\":%d,\"drained\":%d}",
                    esc(bugN), inv.charged(), inv.drained()));

                // Notify all clients of updated battery levels for affected racks.
                for (String rackId : result.affectedRackIds()) {
                    String facilityId = BatteryService.FACILITY_RACKS.entrySet().stream()
                        .filter(e -> java.util.Arrays.asList(e.getValue()).contains(rackId))
                        .map(Map.Entry::getKey)
                        .findFirst().orElse(null);
                    if (facilityId != null) {
                        broadcastLocationBatteryUpdate(facilityId, now);
                    }
                }
            }
        }

        broadcastAstStatsUpdate();

        broadcast(sfmt("{\"type\":\"ResponseToClearTerminalWaypoint\",\"bugN\":\"%s\",\"guid\":\"%s\"}",
            bugN, guid != null ? guid : ""));
    }

    /** Receives terrain travel distances from the routing client and persists them. */
    private void handleRouteTerrainStats(WebSocketSession session, Map<String, Object> json) {
        String crewId          = str(json, "crewId");
        double regolithDist    = dbl(json, "regolithDistance");
        double shinyBlueDist   = dbl(json, "shinyBlueDistance");
        if (crewId == null) return;
        AstStats stats = astStatsRepository.findById(crewId).orElse(new AstStats(crewId));
        stats.setRegolithDistance(stats.getRegolithDistance() + regolithDist);
        stats.setShinyBlueDistance(stats.getShinyBlueDistance() + shinyBlueDist);
        astStatsRepository.save(stats);
        broadcastAstStatsUpdate();
    }

    // ── Battery management ────────────────────────────────────────────────────

    private void handleStartSimulation() {
        if (!batteryService.isSimulationStarted()) {
            batteryService.initializeSimulation(Instant.now());
            initAstStats();
            broadcastSimulationStateSync();
            broadcastAstStatsUpdate();
        }
    }

    private void handleResetSimulation() {
        batteryService.resetSimulation();
        initAstStats();
        broadcastSimulationStateSync();
        broadcastAstStatsUpdate();
        broadcast("{\"type\":\"SimulationReset\"}");
    }

    /** Clears and re-creates zeroed rows for all four ASTs. */
    private void initAstStats() {
        astStatsRepository.deleteAll();
        for (String crewId : ALL_CREW_IDS) {
            astStatsRepository.save(new AstStats(crewId));
        }
    }

    private void handleQueryBugBatteries(WebSocketSession session, Map<String, Object> json) {
        String bugN = str(json, "bugN");
        if (bugN == null || !batteryService.isSimulationStarted()) return;
        Instant now = Instant.now();
        BatteryService.BugInventory inv = batteryService.getBugInventory(bugN, now);
        send(session, String.format(
            "{\"type\":\"BugBatteryStatus\",\"bugN\":\"%s\",\"charged\":%d,\"drained\":%d}",
            esc(bugN), inv.charged(), inv.drained()));
    }

    /**
     * 1-second tick: compute current battery charges, broadcast updates, detect failures.
     * Only runs if simulation has been started.
     */
    @Scheduled(fixedDelay = 1_000)
    public void tickBatteries() {
        if (!batteryService.isSimulationStarted() || sessions.isEmpty()) return;
        Instant now = Instant.now();

        // Broadcast updated charges for all drainable facilities and charging station
        for (String facilityId : BatteryService.FACILITY_RACKS.keySet()) {
            broadcastLocationBatteryUpdate(facilityId, now);
        }

        // Detect newly failed facilities
        List<String> newlyFailed = batteryService.detectNewFailures(now);
        for (String facilityId : newlyFailed) {
            broadcast(String.format("{\"type\":\"LocationFailed\",\"facilityId\":\"%s\"}", esc(facilityId)));
        }

        // Check for game over
        if (batteryService.checkGameOver()) {
            broadcast("{\"type\":\"GameOver\"}");
        }
    }

    /** Builds and broadcasts a LocationBatteryUpdate for a facility. */
    private void broadcastLocationBatteryUpdate(String facilityId, Instant now) {
        try {
            List<BatteryService.RackInfo> racks = batteryService.getFacilityState(facilityId, now);
            Map<String, Object> msg = new LinkedHashMap<>();
            msg.put("type", "LocationBatteryUpdate");
            msg.put("facilityId", facilityId);
            List<Map<String, Object>> rackList = new ArrayList<>();
            for (BatteryService.RackInfo rack : racks) {
                Map<String, Object> rackMap = new LinkedHashMap<>();
                rackMap.put("rackId", rack.rackId());
                List<Map<String, Object>> slotList = new ArrayList<>();
                for (BatteryService.SlotInfo slot : rack.slots()) {
                    Map<String, Object> slotMap = new LinkedHashMap<>();
                    slotMap.put("slot", slot.slot());
                    slotMap.put("charge", slot.charge());
                    slotList.add(slotMap);
                }
                rackMap.put("batteries", slotList);
                rackList.add(rackMap);
            }
            msg.put("racks", rackList);
            broadcast(objectMapper.writeValueAsString(msg));
        } catch (Exception e) {
            // serialization failure — skip
        }
    }

    /**
     * Sends a SimulationStateSync to a single newly-connected session.
     * Includes all current battery states and failure info.
     */
    private void sendSimulationStateSync(WebSocketSession session) {
        try {
            Instant now = Instant.now();
            Map<String, Object> msg = buildSimulationStateSyncMsg(now);
            send(session, objectMapper.writeValueAsString(msg));
        } catch (Exception e) {
            // serialization failure — skip
        }
    }

    /** Broadcasts SimulationStateSync to ALL sessions (called after start/reset). */
    private void broadcastSimulationStateSync() {
        try {
            Instant now = Instant.now();
            String json = objectMapper.writeValueAsString(buildSimulationStateSyncMsg(now));
            broadcast(json);
        } catch (Exception e) {
            // serialization failure — skip
        }
    }

    private Map<String, Object> buildSimulationStateSyncMsg(Instant now) {
        Map<String, Object> msg = new LinkedHashMap<>();
        msg.put("type", "SimulationStateSync");

        // All facility rack states
        Map<String, List<BatteryService.RackInfo>> allState = batteryService.getAllFacilitiesState(now);
        List<Map<String, Object>> facilityList = new ArrayList<>();
        for (Map.Entry<String, List<BatteryService.RackInfo>> entry : allState.entrySet()) {
            Map<String, Object> fMap = new LinkedHashMap<>();
            fMap.put("facilityId", entry.getKey());
            List<Map<String, Object>> rackList = new ArrayList<>();
            for (BatteryService.RackInfo rack : entry.getValue()) {
                Map<String, Object> rackMap = new LinkedHashMap<>();
                rackMap.put("rackId", rack.rackId());
                List<Map<String, Object>> slotList = new ArrayList<>();
                for (BatteryService.SlotInfo slot : rack.slots()) {
                    Map<String, Object> slotMap = new LinkedHashMap<>();
                    slotMap.put("slot", slot.slot());
                    slotMap.put("charge", slot.charge());
                    slotList.add(slotMap);
                }
                rackMap.put("batteries", slotList);
                rackList.add(rackMap);
            }
            fMap.put("racks", rackList);
            facilityList.add(fMap);
        }
        msg.put("facilities", facilityList);
        msg.put("failedFacilities", new ArrayList<>(batteryService.getFailedFacilities()));
        msg.put("gameOver", batteryService.isGameOver());

        return msg;
    }

    // ── AST stats helpers ─────────────────────────────────────────────────────

    /** Builds and broadcasts an AstStatsUpdate containing all four ASTs' current stats. */
    private void broadcastAstStatsUpdate() {
        try {
            broadcast(objectMapper.writeValueAsString(buildAstStatsMsg()));
        } catch (Exception e) {
            // serialization failure — skip
        }
    }

    /** Sends current AST stats to a single newly-connected session. */
    private void sendAstStatsUpdate(WebSocketSession session) {
        try {
            send(session, objectMapper.writeValueAsString(buildAstStatsMsg()));
        } catch (Exception e) {
            // serialization failure — skip
        }
    }

    private Map<String, Object> buildAstStatsMsg() {
        Map<String, Object> msg = new LinkedHashMap<>();
        msg.put("type", "AstStatsUpdate");
        Map<String, Object> statsMap = new LinkedHashMap<>();
        for (String crewId : ALL_CREW_IDS) {
            AstStats s = astStatsRepository.findById(crewId).orElse(new AstStats(crewId));
            Map<String, Object> entry = new LinkedHashMap<>();
            entry.put("routes",          s.getRoutesCompleted());
            entry.put("batteries",       s.getBatteriesDelivered());
            entry.put("regolithDistance",  s.getRegolithDistance());
            entry.put("shinyBlueDistance", s.getShinyBlueDistance());
            statsMap.put(crewId, entry);
        }
        msg.put("stats", statsMap);
        return msg;
    }

    // ── Cleanup helpers ───────────────────────────────────────────────────────

    private void releaseCrewSession(WebSocketSession session) {
        CrewSessionInfo info = crewSessions.remove(session);
        if (info != null) {
            markCrewLoggedOut(info.guid);
            broadcastCrewStatus();
        }
    }

    private void removeSessionReservation(WebSocketSession session, String bugN) {
        CopyOnWriteArraySet<String> reserved = sessionBugReservations.get(session);
        if (reserved != null) reserved.remove(bugN);
    }

    private void releaseBugReservation(WebSocketSession session) {
        CopyOnWriteArraySet<String> reserved = sessionBugReservations.remove(session);
        if (reserved == null || reserved.isEmpty()) return;
        for (String bugN : reserved) {
            RouteState rs = activeRoutes.remove(bugN);
            if (rs != null) {
                if (!rs.waypoints.isEmpty()) {
                    WaypointEntry last = rs.waypoints.get(0);
                    bugLastPositions.put(bugN, new double[]{ last.x, last.y, last.z });
                } else {
                    bugLastPositions.put(bugN, new double[]{ rs.cx, rs.cy, rs.cz });
                }
            }
            bugInRouteRepository.findActiveByBugN(bugN).ifPresent(r -> {
                r.setReleasedTime(Instant.now());
                bugInRouteRepository.save(r);
            });
            broadcast(sfmt("{\"type\":\"BugReservationReleased\",\"bugN\":\"%s\"}", bugN));
        }
    }

    private void markCrewLoggedOut(String guid) {
        crewLoginRepository.findById(guid).ifPresent(login -> {
            if (login.getLoggedOutAt() == null) {
                login.setLoggedOutAt(Instant.now());
                crewLoginRepository.save(login);
            }
        });
    }

    // ── Route state sync ──────────────────────────────────────────────────────

    private void sendRouteSyncToSession(WebSocketSession session, RouteState rs) {
        try {
            Map<String, Object> msg = new LinkedHashMap<>();
            msg.put("type", "RouteStateSync");
            msg.put("bugN",   rs.bugN);
            msg.put("crewId", rs.crewId);
            msg.put("guid",   rs.guid);
            msg.put("currentX", rs.cx);
            msg.put("currentY", rs.cy);
            msg.put("currentZ", rs.cz);
            List<Map<String, Object>> wps = new ArrayList<>();
            for (WaypointEntry wp : rs.waypoints) {
                Map<String, Object> wpMap = new LinkedHashMap<>();
                wpMap.put("x", wp.x);
                wpMap.put("y", wp.y);
                wpMap.put("z", wp.z);
                wpMap.put("terminal", wp.terminal);
                wps.add(wpMap);
            }
            msg.put("waypoints", wps);
            send(session, objectMapper.writeValueAsString(msg));
        } catch (Exception e) {
            // serialization failure — skip
        }
    }

    // ── Crew status broadcast ─────────────────────────────────────────────────

    private void broadcastCrewStatus() {
        List<String> active = crewLoginRepository.findActiveCrewIds();
        String msg = buildCrewStatusJson(active);
        for (WebSocketSession s : sessions) send(s, msg);
    }

    private void sendCrewStatus(WebSocketSession session) {
        send(session, buildCrewStatusJson(crewLoginRepository.findActiveCrewIds()));
    }

    private static String buildCrewStatusJson(List<String> ids) {
        String list = ids.stream().map(id -> "\"" + esc(id) + "\"").collect(Collectors.joining(","));
        return "{\"type\":\"crew_status_broadcast\",\"active\":[" + list + "]}";
    }

    // ── Low-level send / format helpers ───────────────────────────────────────

    private void send(WebSocketSession session, String text) {
        try { if (session.isOpen()) session.sendMessage(new TextMessage(text)); }
        catch (IOException ignored) {}
    }

    private void broadcast(String text) {
        for (WebSocketSession s : sessions) send(s, text);
    }

    private static String str(Map<String, Object> json, String key) {
        Object v = json.get(key); return v != null ? v.toString() : null;
    }

    private static double dbl(Map<String, Object> json, String key) {
        Object v = json.get(key);
        if (v == null) return 0.0;
        if (v instanceof Number n) return n.doubleValue();
        try { return Double.parseDouble(v.toString()); } catch (NumberFormatException e) { return 0.0; }
    }

    private static String sfmt(String template, String... args) {
        Object[] escaped = new Object[args.length];
        for (int i = 0; i < args.length; i++) escaped[i] = esc(args[i]);
        return String.format(template, escaped);
    }

    private static String esc(String s) {
        if (s == null) return "";
        return s.replace("\\", "\\\\").replace("\"", "\\\"");
    }
}
