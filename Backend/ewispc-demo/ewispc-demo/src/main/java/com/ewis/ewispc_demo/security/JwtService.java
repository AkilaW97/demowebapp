package com.ewis.ewispc_demo.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.time.Instant;
import java.util.Base64;
import java.util.Date;
import java.util.concurrent.TimeUnit;

@Service
public class JwtService {

    private static final String SECRET = "Wy6eUAqGOZuvcYYYOIWlJlNgN/cbu5Vw9q7NPYk4xB54ITw47UwJFHmg0xK/2PIt9GlpJliRx4lfh6TCbMElXQ==";
    private static final long VALIDITY = TimeUnit.MINUTES.toMillis(30);

    private SecretKey getKey() {
        byte[] decodedKey = Base64.getDecoder().decode(SECRET);
        return Keys.hmacShaKeyFor(decodedKey);
    }

//    private SecretKey getKey() {
//        return Keys.secretKeyFor(SignatureAlgorithm.HS512);
//    }

    public String generateToken(UserDetails userDetails) {
        return Jwts.builder()
                .subject(userDetails.getUsername())
                .issuedAt(Date.from(Instant.now()))
                .expiration(Date.from(Instant.now().plusMillis(VALIDITY)))
                .signWith(getKey())
                .compact();
    }

    public boolean isTokenValid(String token) {
        return extractAllClaims(token).getExpiration().after(new Date());
    }

    public String extractUsername(String token) {
        return extractAllClaims(token).getSubject();
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parser()
                .verifyWith(getKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }
}
