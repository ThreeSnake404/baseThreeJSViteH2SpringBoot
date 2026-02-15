package com.example.poc.config;

import org.springframework.beans.BeansException;
import org.springframework.beans.factory.config.BeanPostProcessor;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.boot.autoconfigure.jdbc.DataSourceProperties;
import org.springframework.boot.web.servlet.ServletRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.h2.server.web.CustomH2WebServlet;

/**
 * Replaces the default H2 console servlet with our custom one so the login form
 * defaults to the application's file-based datasource URL.
 */
@Configuration
@ConditionalOnProperty(prefix = "spring.h2.console", name = "enabled", havingValue = "true")
public class H2ConsoleConfig {

    @Bean
    public BeanPostProcessor h2ConsoleServletReplacer(DataSourceProperties dataSourceProperties) {
        return new BeanPostProcessor() {
            @Override
            public Object postProcessAfterInitialization(Object bean, String beanName) throws BeansException {
                if ("h2Console".equals(beanName) && bean instanceof ServletRegistrationBean<?> reg) {
                    reg.addInitParameter("jdbcUrl", dataSourceProperties.getUrl());
                    reg.addInitParameter("user",
                            dataSourceProperties.getUsername() != null ? dataSourceProperties.getUsername() : "sa");
                    @SuppressWarnings("unchecked")
                    ServletRegistrationBean<jakarta.servlet.Servlet> r = (ServletRegistrationBean<jakarta.servlet.Servlet>) reg;
                    r.setServlet(new CustomH2WebServlet());
                }
                return bean;
            }
        };
    }
}
