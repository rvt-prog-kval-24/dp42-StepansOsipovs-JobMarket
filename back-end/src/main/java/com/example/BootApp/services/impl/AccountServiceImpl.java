package com.example.BootApp.services.impl;

import com.example.BootApp.DTO.SetOwnerDTO;
import com.example.BootApp.DTO.UpdateAccountDTO;
import com.example.BootApp.models.Account;
import com.example.BootApp.models.Person;
import com.example.BootApp.models.Role;
import com.example.BootApp.repo.AccountRepository;
import com.example.BootApp.repo.RoleRepository;
import com.example.BootApp.services.AccountService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class AccountServiceImpl implements AccountService {
    private final PasswordEncoder encoder;
    private final RoleRepository roleRepository;
    private final AccountRepository accountRepository;

    private final PeopleServiceImpl peopleService;

    public AccountServiceImpl(PasswordEncoder encoder, RoleRepository roleRepository, AccountRepository accountRepository, PeopleServiceImpl peopleService) {
        this.encoder = encoder;
        this.roleRepository = roleRepository;
        this.accountRepository = accountRepository;
        this.peopleService = peopleService;
    }

    @Override
    public Account createAccountCompany(Account account) {
        account.setPassword(encoder.encode(account.getPassword()));
//        Person person=new Person();
//        person.setUsername(account.getUsername());
//        peopleService.save(person);
        Role role = roleRepository.findByName("ROLE_COMPANY");
        Set<Role> roles = new HashSet<>();
        roles.add(role);
        account.setRoles(roles);
        return accountRepository.save(account);
    }
    @Override
    public Account createAccount(Account account) {
        account.setPassword(encoder.encode(account.getPassword()));
//        Person person=new Person();
//        person.setUsername(account.getUsername());
//        peopleService.save(person);
        Role role = roleRepository.findByName("ROLE_USER");
        Set<Role> roles = new HashSet<>();
        roles.add(role);
        account.setRoles(roles);
        return accountRepository.save(account);
    }

    public Optional<Account>findOne(int id){
        return accountRepository.findById(id);
    }

    public void update(int id, UpdateAccountDTO account){
      Account updatedAccount=accountRepository.findById(account.getId()).orElse(null);
        assert updatedAccount != null;
        updatedAccount.setUsername(account.getUsername());
        accountRepository.save(updatedAccount);
//      Optional<Account> password= accountRepository.findById(id);
//      account.setPassword(password.get().getPassword());
//        accountRepository.save(account);
    }


    @Transactional
    public void changePassword(Integer userId, String oldPassword, String newPassword) {
        Account account = accountRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));

        // Проверяем, совпадает ли старый пароль
        if (!encoder.matches(oldPassword, account.getPassword())) {
            throw new RuntimeException("Veca parole nesakrīt ");
        }

        // Шифруем новый пароль
        String encodedNewPassword = encoder.encode(newPassword);

        // Устанавливаем новый пароль
        account.setPassword(encodedNewPassword);
        accountRepository.save(account);
    }


    @Override
    public Optional<Account> findByUsername(String username) {
        return accountRepository.findByUsername(username);
    }

    @Override
    public List<Account> getAccounts() {
        return accountRepository.findAll();
    }

    @Override
    public List<SetOwnerDTO> getByName(String name) {
        return accountRepository.getPersonForSetOwner(name);
    }
}
