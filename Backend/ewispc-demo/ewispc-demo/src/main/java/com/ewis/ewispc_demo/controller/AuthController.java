package com.ewis.ewispc_demo.controller;

import com.ewis.ewispc_demo.model.Admin;
import com.ewis.ewispc_demo.repository.AdminRepository;
import com.ewis.ewispc_demo.security.JwtService;
import com.ewis.ewispc_demo.service.AdminDetailsService;
import com.ewis.ewispc_demo.dto.LoginRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

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
    public String authenticate(@RequestBody LoginRequest request) {
        Authentication auth = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.username(), request.password())
        );

        if (auth.isAuthenticated()) {
            return jwtService.generateToken(
                    adminDetailsService.loadUserByUsername(request.username())
            );
        } else {
            throw new UsernameNotFoundException("Invalid credentials");
        }
    }
}
