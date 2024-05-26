package com.example.BootApp.util;

import com.example.BootApp.models.Account;
import com.example.BootApp.repo.AccountRepository;
import com.example.BootApp.services.impl.AccountServiceImpl;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

@AllArgsConstructor
@Component
public class AccountValidator implements Validator {

    private final AccountRepository accountRepository;
    @Override
    public boolean supports(Class<?> clazz) {
        return false;
    }

    @Override
    public void validate(Object target, Errors errors) {

        Account account=(Account) target;
        if (accountRepository.findByUsername(account.getUsername()).isPresent()){
            errors.rejectValue("username","","Jau ir aizņemts ");
        }

    }
}
