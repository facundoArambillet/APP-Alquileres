package com.Aplicacion.Alquileres.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfiguration {
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                WebMvcConfigurer.super.addCorsMappings(registry);
                registry.addMapping("/**")
                        .allowedOrigins("http://localhost:3000") // permite solo solicitudes desde localhost:3000
                        .allowedMethods("GET", "POST", "PUT", "DELETE") // permite solo los métodos GET, POST, PUT y DELETE
                        .allowedHeaders("*"); // permite todos los encabezados
            }
        };
    }
}
