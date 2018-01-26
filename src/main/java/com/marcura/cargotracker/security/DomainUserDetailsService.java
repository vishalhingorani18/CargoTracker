package com.marcura.cargotracker.security;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collection;

/**
 * Authenticate a user from the database.
 */
@Component("userDetailsService")
public class DomainUserDetailsService implements UserDetailsService {


    @Override
    @Transactional
    public UserDetails loadUserByUsername(final String login) {
       return new UserDetails() {
           @Override
           public Collection<? extends GrantedAuthority> getAuthorities() {
               return null;
           }

           @Override
           public String getPassword() {
               return null;
           }

           @Override
           public String getUsername() {
               return null;
           }

           @Override
           public boolean isAccountNonExpired() {
               return false;
           }

           @Override
           public boolean isAccountNonLocked() {
               return false;
           }

           @Override
           public boolean isCredentialsNonExpired() {
               return false;
           }

           @Override
           public boolean isEnabled() {
               return false;
           }
       };
    }
}
