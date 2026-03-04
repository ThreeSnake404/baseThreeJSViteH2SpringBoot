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

import com.example.poc.entity.BugInRoute;
import com.example.poc.entity.Clicked;
import com.example.poc.entity.CrewLogin;
import com.example.poc.repository.BugInRouteRepository;
import com.example.poc.repository.ClickedRepository;
import com.example.poc.repository.CrewLoginRepository;
import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * WebSocket handler for all real-time communication.
 *
 * Crew login protocol:
 *   client→server: crew_register, crew_ping_ack
 *   server→client: crew_register_response, crew_ping, crew_status_broadcast, crew_logged_out
 *
 * Bug routing protocol:
 *   client→server: ReserveBug, RequestToPlaceWaypoint, RequestToClearWaypoint,
 *                  RequestToClearTerminalWaypoint
 *   server→all:    RoutingRequestGranted, AlreadyReserved (sender only),
 *                  ResponseToPlaceWaypoint, ResponseToClearWaypoint,
 *                  ResponseToClearTerminalWaypoint, BugReservationReleased,
 *                  RouteStateSync (to newly connected session only)
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

    /** Server-side representation of an active bug route. */
    private static class RouteState {
        final String guid;
        final String crewId;
        final String bugN;
        /** Bug's last known position — initially the spawn position sent with ReserveBug;
         *  updated to the first waypoint's position each time it is cleared. */
        double cx, cy, cz;
        /** Remaining (not-yet-reached) waypoints, in order. */
        final List<WaypointEntry> waypoints = new CopyOnWriteArrayList<>();

        RouteState(String guid, String crewId, String bugN, double cx, double cy, double cz) {
            this.guid = guid; this.crewId = crewId; this.bugN = bugN;
            this.cx = cx; this.cy = cy; this.cz = cz;
        }
    }

    // ── Fields ────────────────────────────────────────────────────────────────

    private final CopyOnWriteArraySet<WebSocketSession> sessions      = new CopyOnWriteArraySet<>();
    private final ConcurrentHashMap<WebSocketSession, CrewSessionInfo> crewSessions        = new ConcurrentHashMap<>();
    /** bugN → current route state (only for bugs that are actively routed). */
    private final ConcurrentHashMap<String, RouteState> activeRoutes  = new ConcurrentHashMap<>();
    /** bugN → last known world position [x, y, z] — persists after a route completes or is cancelled.
     *  Used to sync bug positions to late-joining clients for routes that are no longer active. */
    private final ConcurrentHashMap<String, double[]> bugLastPositions = new ConcurrentHashMap<>();
    /** session → set of reserved bugN values; max 2 per session. */
    private final ConcurrentHashMap<WebSocketSession, CopyOnWriteArraySet<String>> sessionBugReservations = new ConcurrentHashMap<>();

    private static final int MAX_BUGS_PER_SESSION = 2;

    private final ClickedRepository    clickedRepository;
    private final CrewLoginRepository  crewLoginRepository;
    private final BugInRouteRepository bugInRouteRepository;
    private final ObjectMapper         objectMapper = new ObjectMapper();

    public RawWebSocketHandler(ClickedRepository clickedRepository,
                                CrewLoginRepository crewLoginRepository,
                                BugInRouteRepository bugInRouteRepository) {
        this.clickedRepository    = clickedRepository;
        this.crewLoginRepository  = crewLoginRepository;
        this.bugInRouteRepository = bugInRouteRepository;
    }

    // ── Connection lifecycle ──────────────────────────────────────────────────

    @Override
    public void afterConnectionEstablished(WebSocketSession session) {
        sessions.add(session);
        send(session, "{\"type\":\"connected\",\"message\":\"Welcome\"}");
        sendCrewStatus(session);
        // Send current route state for every actively routed bug so late-joiners
        // can reconstruct the routing visuals and bug positions.
        for (RouteState rs : activeRoutes.values()) {
            sendRouteSyncToSession(session, rs);
        }
        // Send final positions for bugs whose routes have already completed or were cancelled,
        // so late-joiners see them at the correct resting location rather than their spawn point.
        for (Map.Entry<String, double[]> e : bugLastPositions.entrySet()) {
            if (!activeRoutes.containsKey(e.getKey())) { // skip if an active RouteStateSync was already sent
                double[] p = e.getValue();
                send(session, String.format(
                    "{\"type\":\"BugPositionSync\",\"bugN\":\"%s\",\"x\":%s,\"y\":%s,\"z\":%s}",
                    esc(e.getKey()), p[0], p[1], p[2]));
            }
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

        // Enforce the per-session routing limit.
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

        // Use sfmt-safe approach: numbers are not strings and don't need escaping.
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
            // Update the bug's last known position to where it just arrived.
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

        // Broadcast with the bug's last known position so every client can sync.
        broadcast(String.format(
            "{\"type\":\"BugReservationReleased\",\"bugN\":\"%s\",\"x\":%s,\"y\":%s,\"z\":%s}",
            esc(bugN), x, y, z));
    }

    private void handleRequestToClearTerminalWaypoint(WebSocketSession session, Map<String, Object> json) {
        String guid = str(json, "guid");
        String bugN = str(json, "bugN");
        if (bugN == null) return;

        // Capture terminal position before removing from activeRoutes so late-joiners can sync.
        RouteState rs = activeRoutes.remove(bugN);
        if (rs != null) {
            // The terminal waypoint is the last remaining entry in rs.waypoints.
            if (!rs.waypoints.isEmpty()) {
                WaypointEntry terminal = rs.waypoints.get(0);
                bugLastPositions.put(bugN, new double[]{ terminal.x, terminal.y, terminal.z });
            } else {
                bugLastPositions.put(bugN, new double[]{ rs.cx, rs.cy, rs.cz });
            }
        }

        bugInRouteRepository.findActiveByBugN(bugN).ifPresent(r -> {
            r.setReleasedTime(Instant.now());
            bugInRouteRepository.save(r);
        });
        removeSessionReservation(session, bugN);

        broadcast(sfmt("{\"type\":\"ResponseToClearTerminalWaypoint\",\"bugN\":\"%s\",\"guid\":\"%s\"}",
            bugN, guid != null ? guid : ""));
    }

    // ── Cleanup helpers ───────────────────────────────────────────────────────

    private void releaseCrewSession(WebSocketSession session) {
        CrewSessionInfo info = crewSessions.remove(session);
        if (info != null) {
            markCrewLoggedOut(info.guid);
            broadcastCrewStatus();
        }
    }

    /** Release a single bug reservation from a session's set. */
    private void removeSessionReservation(WebSocketSession session, String bugN) {
        CopyOnWriteArraySet<String> reserved = sessionBugReservations.get(session);
        if (reserved != null) reserved.remove(bugN);
    }

    /** Release ALL bug reservations held by a session (called on disconnect). */
    private void releaseBugReservation(WebSocketSession session) {
        CopyOnWriteArraySet<String> reserved = sessionBugReservations.remove(session);
        if (reserved == null || reserved.isEmpty()) return;
        for (String bugN : reserved) {
            RouteState rs = activeRoutes.remove(bugN);
            // Persist best-known position so late-joiners can still see where the bug was.
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

    /** Send a complete route-state snapshot to a single (newly connected) session. */
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

    /** Extract a field as a String, or null if missing. */
    private static String str(Map<String, Object> json, String key) {
        Object v = json.get(key); return v != null ? v.toString() : null;
    }

    /** Extract a numeric field as double (0.0 if missing). */
    private static double dbl(Map<String, Object> json, String key) {
        Object v = json.get(key);
        if (v == null) return 0.0;
        if (v instanceof Number n) return n.doubleValue();
        try { return Double.parseDouble(v.toString()); } catch (NumberFormatException e) { return 0.0; }
    }

    /** Simple format that escapes every %s argument for JSON string safety. */
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
