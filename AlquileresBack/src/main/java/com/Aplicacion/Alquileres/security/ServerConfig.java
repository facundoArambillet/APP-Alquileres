package com.Aplicacion.Alquileres.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
//import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;


@Configuration
@EnableWebSecurity
public class ServerConfig implements WebMvcConfigurer{
    @Autowired
    private FilterToken filterToken;

/*    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // permite CORS para todas las rutas
                .allowedOrigins("http://localhost:3000") // permite solo solicitudes desde localhost:3000
                .allowedMethods("GET", "POST", "PUT", "DELETE") // permite solo los métodos GET, POST, PUT y DELETE
                .allowedHeaders("*"); // permite todos los encabezados
    }*/

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        return http
                .csrf()
                .disable().sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and().authorizeHttpRequests()
                .requestMatchers("/login","/users/**")
                .permitAll()
                .anyRequest().hasAuthority("Admin") //Pregunto por la autoridad porque asi lo tengo seteado en User
                .and().addFilterBefore(filterToken, UsernamePasswordAuthenticationFilter.class)
                .cors(Customizer.withDefaults()) //Configuro los CORS Por spring security
                .build();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }
}