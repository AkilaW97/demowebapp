package com.ewis.ewispc_demo.controller;

import com.ewis.ewispc_demo.model.Admin;
import com.ewis.ewispc_demo.repository.AdminRepository;
import com.ewis.ewispc_demo.security.JwtService;
import com.ewis.ewispc_demo.service.AdminDetailsService;
import com.ewis.ewispc_demo.dto.LoginRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
public class AuthController {

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private AdminDetailsService adminDetailsService;

    @PostMapping("/register/admin")
    public Admin registerAdmin(@RequestBody Admin admin) {
        admin.setPassword(passwordEncoder.encode(admin.getPassword()));
        admin.setRole("ADMIN");
        return adminRepository.save(admin);
    }

    @PostMapping("/authenticate")
    public ResponseEntity<?> authenticate(@RequestBody LoginRequest request, HttpServletResponse response) {
        Authentication auth = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.username(), request.password())
        );

        if (auth.isAuthenticated()) {
            var userDetails = adminDetailsService.loadUserByUsername(request.username());
            String token = jwtService.generateToken(userDetails);

            // Set HTTP-only cookie
            ResponseCookie cookie = ResponseCookie.from("token", token)
                    .httpOnly(true)
                    .secure(false) // set true in production
                    .path("/")
                    .maxAge(24 * 60 * 60)
                    .sameSite("Lax")
                    .build();

            response.setHeader(HttpHeaders.SET_COOKIE, cookie.toString());

            // Return role to frontend
            String role = userDetails.getAuthorities().stream()
                    .findFirst()
                    .map(authVal -> authVal.getAuthority().replace("ROLE_", ""))
                    .orElse("USER");

            return ResponseEntity.ok().body(Map.of("role", role));
        } else {
            throw new UsernameNotFoundException("Invalid credentials");
        }
    }


}
