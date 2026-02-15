package org.h2.server.web;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.Enumeration;

import jakarta.servlet.ServletConfig;
import jakarta.servlet.ServletException;

/**
 * H2 Console servlet that uses CustomH2WebServer so the login form
 * shows our datasource URL (jdbcUrl, user from init params) as the default.
 */
public class CustomH2WebServlet extends org.h2.server.web.JakartaWebServlet {

    @Override
    public void init(ServletConfig config) throws ServletException {
        String jdbcUrl = config.getInitParameter("jdbcUrl");
        String user = config.getInitParameter("user");
        if (jdbcUrl == null || jdbcUrl.isBlank()) {
            super.init(config);
            return;
        }
        Enumeration<String> en = config.getInitParameterNames();
        ArrayList<String> list = new ArrayList<>();
        while (en.hasMoreElements()) {
            String name = en.nextElement();
            if ("jdbcUrl".equals(name) || "user".equals(name)) continue;
            String value = config.getInitParameter(name);
            if (value == null) value = "";
            if (!name.startsWith("-")) name = "-" + name;
            list.add(name);
            if (!value.isEmpty()) list.add(value);
        }
        String[] args = list.toArray(new String[0]);
        WebServer server = new CustomH2WebServer(jdbcUrl, user);
        server.setAllowChunked(false);
        server.init(args);
        try {
            Field field = org.h2.server.web.JakartaWebServlet.class.getDeclaredField("server");
            field.setAccessible(true);
            field.set(this, server);
        } catch (Exception e) {
            throw new ServletException("Failed to set custom H2 WebServer", e);
        }
    }
}
