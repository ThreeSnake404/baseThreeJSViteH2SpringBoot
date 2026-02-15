package com.example.poc.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.resource.PathResourceResolver;

import java.io.IOException;

@Configuration
public class WebMvcConfig implements WebMvcConfigurer {

    /**
     * Serve static files from classpath:/static. Fallback to index.html for SPA client-side routes.
     */
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.setOrder(Ordered.LOWEST_PRECEDENCE);
        registry.addResourceHandler("/**")
                .addResourceLocations("classpath:/static/")
                .resourceChain(true)
                .addResolver(new PathResourceResolver() {
                    @Override
                    protected Resource getResource(String path, Resource location) throws IOException {
                        Resource r = location.createRelative(path);
                        if (r.exists() && r.isReadable()) return r;
                        return new ClassPathResource("static/index.html");
                    }
                });
    }
}
