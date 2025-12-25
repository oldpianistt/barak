package com.ercan.barak.Services;

import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    // Pre-encoded password for STLStoneGalleryAdmin (rM8!Z@4QvP#2^xE7L9K$)
    // Generated with BCryptPasswordEncoder - never re-encode on each request!
    private static final String ENCODED_ADMIN_PASSWORD = "$2a$10$nkL/XMXl5bAUk1jNrpXyYugOZsXxQA2mmWEkfdlN/5MReFLAM5XgS";

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // Hardcoded admin user
        if ("STLStoneGalleryAdmin".equals(username)) {
            return User.builder()
                    .username("STLStoneGalleryAdmin")
                    .password(ENCODED_ADMIN_PASSWORD)
                    .roles("ADMIN")
                    .build();
        }

        throw new UsernameNotFoundException("User not found: " + username);
    }
}
