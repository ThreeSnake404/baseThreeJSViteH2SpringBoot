package org.h2.server.web;

import java.util.ArrayList;
import java.util.Collections;

/**
 * WebServer that exposes a single connection preset from Spring's datasource URL
 * so the H2 console login form shows it by default instead of "Generic H2 (Embedded)" / demo.
 */
public class CustomH2WebServer extends WebServer {

    private final String connectionInfoStr;

    public CustomH2WebServer(String jdbcUrl, String user) {
        connectionInfoStr = "POC Database|org.h2.Driver|" + jdbcUrl + "|" + (user != null ? user : "sa");
    }

    @Override
    synchronized ArrayList<ConnectionInfo> getSettings() {
        ArrayList<ConnectionInfo> settings = new ArrayList<>();
        ConnectionInfo info = new ConnectionInfo(connectionInfoStr);
        settings.add(info);
        updateSetting(info);
        Collections.sort(settings);
        return settings;
    }
}
