package com.ewis.ewispc_demo.service;

import com.ewis.ewispc_demo.model.Admin;
import com.ewis.ewispc_demo.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AdminDetailsService implements UserDetailsService {

    @Autowired
    private AdminRepository repository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<Admin> admin = repository.findByUsername(username);
        if (admin.isPresent()) {
            var userObj = admin.get();
            return User.builder()
                    .username(userObj.getUsername())
                    .password(userObj.getPassword())
                    .roles(userObj.getRole().split(","))
                    .build();
        } else {
            throw new UsernameNotFoundException("Admin not found: " + username);
        }
    }
}