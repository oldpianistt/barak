package com.ercan.barak.Services;

import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // Hardcoded admin user
        if ("STLStoneGalleryAdmin".equals(username)) {
            return User.builder()
                    .username("STLStoneGalleryAdmin")
                    // Password: rM8!Z@4QvP#2^xE7L9K$
                    .password(passwordEncoder.encode("rM8!Z@4QvP#2^xE7L9K$"))
                    .roles("ADMIN")
                    .build();
        }

        throw new UsernameNotFoundException("User not found: " + username);
    }
}
