package com.ewis.ewispc_demo;

import io.jsonwebtoken.Jwts;
import org.junit.jupiter.api.Test;

import javax.crypto.SecretKey;
import java.util.Base64;

public class JwtSecretGeneratorTest {

    @Test
    public void generateSecretKey() {
        SecretKey key = Jwts.SIG.HS512.key().build();
        String encodedKey = Base64.getEncoder().encodeToString(key.getEncoded());
        System.out.println("KEY: " + encodedKey);
    }
}
