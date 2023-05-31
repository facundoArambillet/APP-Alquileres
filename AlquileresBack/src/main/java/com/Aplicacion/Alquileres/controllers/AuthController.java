package com.Aplicacion.Alquileres.controllers;

import com.Aplicacion.Alquileres.models.User;
import com.Aplicacion.Alquileres.services.TokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController //Si uso @Controller no lo encuentra
@RequestMapping("/login")
public class AuthController {
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private TokenService tokenService;

    @PostMapping()
    public String login(@RequestBody User user){
        try{
            UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken =
                    new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword());
            Authentication auth = this.authenticationManager.authenticate(usernamePasswordAuthenticationToken);

            var userToken = (User) auth.getPrincipal();

            return tokenService.createToken(userToken);

        }
        catch (Exception e) {
            return String.valueOf(e);
        }
    }
}
