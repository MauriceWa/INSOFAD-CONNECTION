package com.example.todoappdeel3.config;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.auth0.jwt.interfaces.JWTVerifier;
import com.example.todoappdeel3.dao.UserRepository;
import com.example.todoappdeel3.models.CustomUser;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Calendar;
import java.util.Date;

@Component
public class JWTUtil {
    @Value("${jwt.secret}")
    private String secret;

    private UserRepository userRepository;

    public JWTUtil(UserRepository userRepository){
        this.userRepository = userRepository;
    }

    public String generateToken(String email) throws IllegalArgumentException, JWTCreationException {
        CustomUser customUser = userRepository.findByEmail(email);
        return JWT.create()
                .withSubject("User Details")
                .withClaim("email", email)
                .withClaim("userId", customUser.getId())
                .withIssuedAt(new Date())
                .withExpiresAt(this.createExpirationDate())
                .withIssuer("Lina Xu")
                .sign(Algorithm.HMAC256(secret));
    }

    public String validateTokenAndRetrieveSubject(String token) throws JWTVerificationException {
        JWTVerifier verifier = JWT.require(Algorithm.HMAC256(secret))
                .withSubject("User Details")
                .withIssuer("Lina Xu")
                .build();
        DecodedJWT jwt = verifier.verify(token);
        return jwt.getClaim("email").asString();
    }

    private Date createExpirationDate(){
        int expirationHours = 6;
        Calendar appendableDate = Calendar.getInstance();
        appendableDate.setTime(new Date());
        appendableDate.add(Calendar.HOUR, expirationHours);
        return appendableDate.getTime();
    }



}
