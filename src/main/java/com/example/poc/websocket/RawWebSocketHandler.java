package com.example.poc.websocket;

import java.io.IOException;
import java.util.Map;
import java.util.concurrent.CopyOnWriteArraySet;

import org.springframework.stereotype.Component;
import org.springframework.web.socket.*;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.example.poc.entity.Clicked;
import com.example.poc.entity.ScreenClick;
import com.example.poc.repository.ClickedRepository;
import com.example.poc.repository.ScreenClickRepository;
import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * WebSocket handler without STOMP. Handles dedicated client connections; persists "click" messages (guid, currentColor, nextColor) to H2.
 */
@Component
public class RawWebSocketHandler extends TextWebSocketHandler {

    private final CopyOnWriteArraySet<WebSocketSession> sessions = new CopyOnWriteArraySet<>();
    private final ClickedRepository clickedRepository;
    private final ScreenClickRepository screenClickRepository;
    private final ObjectMapper objectMapper = new ObjectMapper();

    public RawWebSocketHandler(ClickedRepository clickedRepository, ScreenClickRepository screenClickRepository) {
        this.clickedRepository = clickedRepository;
        this.screenClickRepository = screenClickRepository;
    }

    @Override
    public void afterConnectionEstablished(WebSocketSession session) {
        sessions.add(session);
        send(session, "{\"type\":\"connected\",\"message\":\"Welcome\"}");
    }

    @Override
    @SuppressWarnings("unchecked")
    protected void handleTextMessage(WebSocketSession session, TextMessage message) {
        String payload = message.getPayload();
        try {
            Map<String, Object> json = objectMapper.readValue(payload, Map.class);
            Object type = json != null ? json.get("type") : null;
            if ("click".equals(type)) {
                String guid = json.get("guid") != null ? json.get("guid").toString() : null;
                String currentColor = json.get("currentColor") != null ? json.get("currentColor").toString() : null;
                String nextColor = json.get("nextColor") != null ? json.get("nextColor").toString() : null;
                if (guid != null && currentColor != null && nextColor != null) {
                    clickedRepository.save(new Clicked(currentColor, nextColor, guid));
                }
            } else if ("screenClick".equals(type)) {
                String guid = json.get("guid") != null ? json.get("guid").toString() : null;
                Number cx = json.get("clientX") instanceof Number ? (Number) json.get("clientX") : null;
                Number cy = json.get("clientY") instanceof Number ? (Number) json.get("clientY") : null;
                if (guid != null && cx != null && cy != null) {
                    screenClickRepository.save(new ScreenClick(guid, cx.doubleValue(), cy.doubleValue()));
                }
            }
        } catch (Exception e) {
            // not a click message or invalid JSON; ignore
        }
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) {
        sessions.remove(session);
    }

    @Override
    public void handleTransportError(WebSocketSession session, Throwable exception) {
        sessions.remove(session);
    }

    private void send(WebSocketSession session, String text) {
        if (session.isOpen()) {
            try {
                session.sendMessage(new TextMessage(text));
            } catch (IOException e) {
                // ignore
            }
        }
    }

    private void broadcast(String text) {
        TextMessage msg = new TextMessage(text);
        for (WebSocketSession s : sessions) {
            if (s.isOpen()) {
                try {
                    s.sendMessage(msg);
                } catch (IOException e) {
                    // skip
                }
            }
        }
    }

    private static String escapeJson(String s) {
        if (s == null) return "";
        return s.replace("\\", "\\\\")
                .replace("\"", "\\\"")
                .replace("\n", "\\n")
                .replace("\r", "\\r")
                .replace("\t", "\\t");
    }
}
