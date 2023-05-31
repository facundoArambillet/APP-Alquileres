package com.Aplicacion.Alquileres.services;

import com.Aplicacion.Alquileres.models.User;
import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.Date;

@Service
public class TokenService {
    private final String   KEY = "secretKey";
    public String createToken(User user){
        try {
            return JWT.create()
                    .withSubject(user.getEmail())
                    .withClaim("id", user.getIdUser())
                    .withExpiresAt(Date.from(LocalDateTime.now()
                            .plusHours(24)
                            .toInstant(ZoneOffset.of("-03:00")))
                    ).sign(Algorithm.HMAC256(KEY));
        }
        catch (Exception e) {
            System.err.println("Error al crear el token: " + e.getMessage());
            return null;
        }


    }

    public String getSubject(String token) {
        return JWT.require(Algorithm.HMAC256(KEY))
                .build().verify(token).getSubject();
    }
}
