package com.example.BootApp.secutity;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.example.BootApp.models.Account;
import com.example.BootApp.models.Role;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.time.ZonedDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Component
public class JWTUtil {
    @Value("${jwt_secret}")
    private String secret;

    public String generateToken(Account account){
        Date expirationDate=Date.from(ZonedDateTime.now().plusMinutes(100).toInstant());


        List<String> roleNames = account.getRoles()
                .stream()
                .map(Role::getName)  // Замените на фактический метод получения имени роли
                .toList();
        return JWT.create()
                .withSubject("User details")
                .withClaim("username",account.getUsername())
                .withClaim("role", roleNames)
                .withIssuedAt(new Date())
                .withIssuer("spring-boot app")
                .withExpiresAt(expirationDate)
                .sign(Algorithm.HMAC256(secret));
    }

    public String validateTokenAndRetriveClaim(String token)throws JWTVerificationException {
        JWTVerifier verifier=JWT.require(Algorithm.HMAC256(secret))
                .withSubject("User details")
                .withIssuer("spring-boot app")
                .build();

        DecodedJWT jwt = verifier.verify(token);
        System.out.println(jwt.getClaim("username").asString());
        return jwt.getClaim("username").asString();
    }


}
