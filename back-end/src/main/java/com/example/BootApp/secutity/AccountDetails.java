package com.example.BootApp.secutity;

import com.example.BootApp.models.Account;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;

@RequiredArgsConstructor
public class AccountDetails implements UserDetails {
    private final Account account;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null ;
    }

    @Override
    public String getPassword() {
        return account.getPassword();
    }

    @Override
    public String getUsername() {
        return account.getUsername();
    }

    @Override
    public boolean isAccountNonExpired() {
        return account.isExpired();
    }

    @Override
    public boolean isAccountNonLocked() {
        return account.isLocked();
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return account.isCredentialsexpired();
    }

    @Override
    public boolean isEnabled() {
        return account.isEnabled();
    }

    public Account getAccount(){
        return this.account;
    }

}
