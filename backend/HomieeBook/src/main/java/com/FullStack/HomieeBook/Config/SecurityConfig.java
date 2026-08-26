package com.FullStack.HomieeBook.Config;

import com.FullStack.HomieeBook.Security.JwtAuthenticationFilter;
import com.FullStack.HomieeBook.Security.OAuth2LoginSuccessHandler;
import org.apache.catalina.User;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
public class SecurityConfig {
    private JwtAuthenticationFilter jwtAuthenticationFilter;
    public SecurityConfig(JwtAuthenticationFilter jwtAuthenticationFilter) {
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
    }
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http, OAuth2LoginSuccessHandler oAuth2LoginSuccessHandler) throws Exception {
         http.csrf(csrf -> csrf.disable())
                 .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .authorizeHttpRequests(
                        auth -> auth
                                .requestMatchers(
                                        HttpMethod.OPTIONS,
                                        "/**"
                                ).permitAll()
                                .requestMatchers(
                                    "/api/users",
                                    "/api/users/login",
                                        "/api/bookings/property/**"
                                ).permitAll()
                                .requestMatchers(
                                        HttpMethod.GET,
                                        "/api/properties/**"
                                ).permitAll()
                                        .anyRequest().authenticated()
                ).addFilterBefore(
                        jwtAuthenticationFilter,
                        UsernamePasswordAuthenticationFilter.class
                ).oauth2Login(oauth ->{
                        oauth.successHandler(oAuth2LoginSuccessHandler);
                 });
        return http.build();
    }
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration corsConfiguration = new CorsConfiguration();
        corsConfiguration.setAllowedOrigins(
                List.of("http://localhost:5173")
        );
        corsConfiguration.setAllowedMethods(
                List.of("GET", "POST", "PUT", "DELETE", "PATCH", "HEAD", "OPTIONS")
        );
        corsConfiguration.setAllowedHeaders(
                List.of("*")
        );
        corsConfiguration.setAllowCredentials(true);
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();

        source.registerCorsConfiguration("/**", corsConfiguration);
        return source;
    }

}

