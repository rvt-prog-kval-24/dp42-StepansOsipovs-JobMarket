package com.example.BootApp.services;

import com.example.BootApp.DTO.SetOwnerDTO;
import com.example.BootApp.models.Account;

import java.util.List;
import java.util.Optional;


public interface AccountService {

    Account createAccountCompany(Account account);

    Account createAccount(Account account);
    Optional<Account> findByUsername(String username);
    List<Account> getAccounts();

    List<SetOwnerDTO> getByName(String name);
}
