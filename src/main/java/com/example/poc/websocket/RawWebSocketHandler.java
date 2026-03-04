package com.example.poc.websocket;

import java.io.IOException;
import java.time.Instant;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.CopyOnWriteArraySet;
import java.util.stream.Collectors;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.*;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.example.poc.entity.Clicked;
import com.example.poc.entity.CrewLogin;
import com.example.poc.repository.ClickedRepository;
import com.example.poc.repository.CrewLoginRepository;
import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * WebSocket handler for all real-time communication.
 * Handles click events (persisted to H2) and the crew login / ping protocol.
 *
 * Crew login protocol:
 *   client → server: { type:"crew_register",  guid, crewId }
 *   server → client: { type:"crew_register_response", guid, crewId, status:"ok"|"already_taken" }
 *   server → client: { type:"crew_ping",       guid, crewId }  (every 10 s per registered session)
 *   client → server: { type:"crew_ping_ack",   guid, crewId }
 *   server → all:    { type:"crew_status_broadcast", active:[crewId,...] }
 *   server → client: { type:"crew_logged_out", guid, crewId, reason }
 */
@Component
public class RawWebSocketHandler extends TextWebSocketHandler {

    /** How long (ms) to wait for a ping-ack before treating the session as gone. */
    private static final long PING_TIMEOUT_MS = 15_000;

    private static class SessionInfo {
        final String guid;
        final String crewId;
        volatile Instant lastPingAck;

        SessionInfo(String guid, String crewId) {
            this.guid = guid;
            this.crewId = crewId;
            this.lastPingAck = Instant.now();
        }
    }

    private final CopyOnWriteArraySet<WebSocketSession> sessions = new CopyOnWriteArraySet<>();
    /** Sessions that have successfully registered a crew member. */
    private final ConcurrentHashMap<WebSocketSession, SessionInfo> crewSessions = new ConcurrentHashMap<>();

    private final ClickedRepository clickedRepository;
    private final CrewLoginRepository crewLoginRepository;
    private final ObjectMapper objectMapper = new ObjectMapper();

    public RawWebSocketHandler(ClickedRepository clickedRepository,
                                CrewLoginRepository crewLoginRepository) {
        this.clickedRepository = clickedRepository;
        this.crewLoginRepository = crewLoginRepository;
    }

    // ── Connection lifecycle ──────────────────────────────────────────────────

    @Override
    public void afterConnectionEstablished(WebSocketSession session) {
        sessions.add(session);
        send(session, "{\"type\":\"connected\",\"message\":\"Welcome\"}");
        // Tell the new session which crew members are currently active.
        sendCrewStatus(session);
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) {
        sessions.remove(session);
        SessionInfo info = crewSessions.remove(session);
        if (info != null) {
            markLoggedOut(info.guid);
            broadcastCrewStatus();
        }
    }

    @Override
    public void handleTransportError(WebSocketSession session, Throwable exception) {
        sessions.remove(session);
        SessionInfo info = crewSessions.remove(session);
        if (info != null) markLoggedOut(info.guid);
    }

    // ── Inbound messages ─────────────────────────────────────────────────────

    @Override
    @SuppressWarnings("unchecked")
    protected void handleTextMessage(WebSocketSession session, TextMessage message) {
        try {
            Map<String, Object> json = objectMapper.readValue(message.getPayload(), Map.class);
            if (json == null) return;
            String type = str(json, "type");
            if ("click".equals(type)) {
                handleClick(json);
            } else if ("crew_register".equals(type)) {
                handleCrewRegister(session, json);
            } else if ("crew_ping_ack".equals(type)) {
                handleCrewPingAck(session);
            }
        } catch (Exception e) {
            // invalid JSON or missing fields — ignore
        }
    }

    private void handleClick(Map<String, Object> json) {
        String guid = str(json, "guid");
        String currentColor = str(json, "currentColor");
        String nextColor = str(json, "nextColor");
        if (guid != null && currentColor != null && nextColor != null) {
            clickedRepository.save(new Clicked(currentColor, nextColor, guid));
        }
    }

    private void handleCrewRegister(WebSocketSession session, Map<String, Object> json) {
        String guid = str(json, "guid");
        String crewId = str(json, "crewId");
        if (guid == null || crewId == null) return;

        // If this crew member is already active (from any session), reject.
        if (crewLoginRepository.findActiveByCrewId(crewId).isPresent()) {
            send(session, String.format(
                "{\"type\":\"crew_register_response\",\"guid\":\"%s\",\"crewId\":\"%s\",\"status\":\"already_taken\"}",
                esc(guid), esc(crewId)));
            return;
        }

        // If this WebSocket session already registered a different crew member, log them out first.
        SessionInfo old = crewSessions.remove(session);
        if (old != null) markLoggedOut(old.guid);

        // Persist the new login row.
        crewLoginRepository.save(new CrewLogin(guid, crewId));
        crewSessions.put(session, new SessionInfo(guid, crewId));

        send(session, String.format(
            "{\"type\":\"crew_register_response\",\"guid\":\"%s\",\"crewId\":\"%s\",\"status\":\"ok\"}",
            esc(guid), esc(crewId)));

        broadcastCrewStatus();
    }

    private void handleCrewPingAck(WebSocketSession session) {
        SessionInfo info = crewSessions.get(session);
        if (info != null) info.lastPingAck = Instant.now();
    }

    // ── Ping scheduler ────────────────────────────────────────────────────────

    /**
     * Every 10 seconds:
     *  1. Remove and log out sessions that haven't acked within PING_TIMEOUT_MS.
     *  2. Send a ping to the remaining registered sessions.
     */
    @Scheduled(fixedDelay = 10_000)
    public void pingAndCheckSessions() {
        Instant threshold = Instant.now().minusMillis(PING_TIMEOUT_MS);
        boolean statusChanged = false;

        for (Map.Entry<WebSocketSession, SessionInfo> entry : crewSessions.entrySet()) {
            WebSocketSession session = entry.getKey();
            SessionInfo info = entry.getValue();

            if (!session.isOpen() || info.lastPingAck.isBefore(threshold)) {
                crewSessions.remove(session);
                markLoggedOut(info.guid);
                send(session, String.format(
                    "{\"type\":\"crew_logged_out\",\"guid\":\"%s\",\"crewId\":\"%s\",\"reason\":\"ping_timeout\"}",
                    esc(info.guid), esc(info.crewId)));
                statusChanged = true;
            } else {
                send(session, String.format(
                    "{\"type\":\"crew_ping\",\"guid\":\"%s\",\"crewId\":\"%s\"}",
                    esc(info.guid), esc(info.crewId)));
            }
        }

        if (statusChanged) broadcastCrewStatus();
    }

    // ── Helpers ───────────────────────────────────────────────────────────────

    private void markLoggedOut(String guid) {
        crewLoginRepository.findById(guid).ifPresent(login -> {
            if (login.getLoggedOutAt() == null) {
                login.setLoggedOutAt(Instant.now());
                crewLoginRepository.save(login);
            }
        });
    }

    private void broadcastCrewStatus() {
        List<String> active = crewLoginRepository.findActiveCrewIds();
        String msg = buildCrewStatusJson(active);
        for (WebSocketSession s : sessions) send(s, msg);
    }

    private void sendCrewStatus(WebSocketSession session) {
        List<String> active = crewLoginRepository.findActiveCrewIds();
        send(session, buildCrewStatusJson(active));
    }

    private static String buildCrewStatusJson(List<String> activeCrewIds) {
        String ids = activeCrewIds.stream()
            .map(id -> "\"" + esc(id) + "\"")
            .collect(Collectors.joining(","));
        return "{\"type\":\"crew_status_broadcast\",\"active\":[" + ids + "]}";
    }

    private void send(WebSocketSession session, String text) {
        try {
            if (session.isOpen()) session.sendMessage(new TextMessage(text));
        } catch (IOException e) {
            // ignore — connection already lost
        }
    }

    private static String str(Map<String, Object> json, String key) {
        Object v = json.get(key);
        return v != null ? v.toString() : null;
    }

    private static String esc(String s) {
        if (s == null) return "";
        return s.replace("\\", "\\\\").replace("\"", "\\\"");
    }
}
