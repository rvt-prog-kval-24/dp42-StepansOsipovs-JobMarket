package com.example.BootApp.secutity;

import com.example.BootApp.services.impl.UserDetailsServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.authentication.dao.AbstractUserDetailsAuthenticationProvider;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Collections;

@Component
@RequiredArgsConstructor
public class AccountAuthenticationProvider extends AbstractUserDetailsAuthenticationProvider {
    private final UserDetailsServiceImpl userDetailsService;
    private final PasswordEncoder encoder;

    @Override
    protected void additionalAuthenticationChecks(UserDetails userDetails, UsernamePasswordAuthenticationToken authentication) throws AuthenticationException {
        if(authentication.getCredentials() == null || userDetails.getPassword() == null) {
            throw new BadCredentialsException("Credentials may not be null");
        }
        if(!encoder.matches((String) authentication.getCredentials(), userDetails.getPassword())) {

            throw new BadCredentialsException("Invalid credentials");
        }

    }


//    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
//        String username = authentication.getName();
//        //System.out.println(username);
//        UserDetails personDetails = userDetailsService.loadUserByUsername(username);
//        BCryptPasswordEncoder passwordEncoder=new BCryptPasswordEncoder();
//        String password = authentication.getCredentials().toString();
//
//        if (!passwordEncoder.matches(password,personDetails.getPassword())){
//            System.out.println("loh");
//            throw new BadCredentialsException("Incorrect password");
//
//        }
//
//        return new UsernamePasswordAuthenticationToken(personDetails, password,
//                Collections.emptyList());
//    }

    @Override
    protected UserDetails retrieveUser(String username, UsernamePasswordAuthenticationToken authentication) throws AuthenticationException {
        return userDetailsService.loadUserByUsername(username);
    }



}
