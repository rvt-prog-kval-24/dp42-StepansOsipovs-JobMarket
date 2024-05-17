package com.example.BootApp.resources;

import com.auth0.jwt.exceptions.JWTVerificationException;
import com.example.BootApp.DTO.*;
import com.example.BootApp.models.Account;
import com.example.BootApp.models.Role;
import com.example.BootApp.repo.AccountRepository;
import com.example.BootApp.repo.RoleRepository;
import com.example.BootApp.secutity.JWTUtil;
import com.example.BootApp.services.impl.AccountServiceImpl;
import com.example.BootApp.util.AccountValidator;
import com.example.BootApp.util.PersonValidator;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@RequestMapping(path = "/api/accounts")
public class AccountResource {
    private final PersonValidator personValidator;
    private final JWTUtil jwtUtil;
    private final AccountServiceImpl accountService;
    private final AuthenticationManager authenticationManager;
    private final AccountValidator accountValidator;
    private final AccountRepository accountRepository;
    private final RoleRepository roleRepository;
    @GetMapping("/getUsersByName")
    @ResponseBody
    public List<SetOwnerDTO> getUserByName(@RequestParam String name){
        return accountService.getByName(name);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<Account>> show(@PathVariable("id") int id) {
        return ResponseEntity.ok(accountService.findOne(id));
    }
    @GetMapping("/getByName/{name}")
    public ResponseEntity<Optional<Account>> byName(@PathVariable("name") String name) {
        return ResponseEntity.ok(accountRepository.findByUsername(name));
    }

    @PostMapping("/editByAdmin")
    public ResponseEntity<?> updateByAdmin(@RequestBody UpdateAccountAdminDTO accountAdminDTO) {
        // Найти роль по имени
        Role role = roleRepository.findByName(accountAdminDTO.getRoles());

        // Если роль не найдена, вернуть ошибку
        if (role == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Role not found: " + accountAdminDTO.getRoles());
        }

        // Найти учетную запись по ID
        Optional<Account> accountOptional = accountRepository.findById(accountAdminDTO.getId());

        // Если учетная запись не найдена, вернуть ошибку
        if (!accountOptional.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Account not found with ID: " + accountAdminDTO.getId());
        }

        // Получить учетную запись и обновить поля
        Account account = accountOptional.get();
        account.setUsername(accountAdminDTO.getUsername());
        account.setExpired(accountAdminDTO.isExpired());
        account.setEnabled(accountAdminDTO.isEnabled());
        account.setLocked(accountAdminDTO.isLocked());
        account.setCredentialsexpired(accountAdminDTO.isCredentialsexpired());

        // Используйте изменяемую коллекцию HashSet для установки ролей
        Set<Role> roles = new HashSet<>(account.getRoles());
        roles.clear();
        roles.add(role);
        account.setRoles(roles);

        // Сохранить обновленную учетную запись
        accountRepository.save(account);

        return ResponseEntity.ok(HttpStatus.OK);
    }




    @PostMapping("/edit")
    @ResponseBody
    public ResponseEntity<?> updatePost(@RequestBody @Valid UpdateAccountDTO account , BindingResult result) {
        System.out.println("aaa");
        if (result.hasErrors()) {

            List<ValidationErrorDTO> errors = result.getFieldErrors().stream()
                    .map(error -> new ValidationErrorDTO(error.getField(), error.getDefaultMessage()))
                    .collect(Collectors.toList());

            return ResponseEntity.badRequest().body(errors);
        }


        accountService.update(account.getId(),account);
        return ResponseEntity.ok(HttpStatus.OK);
    }


    @PostMapping("/reg")
    public ResponseEntity<?> createAccount (@RequestBody @Valid Account account, BindingResult bindingResult) {
        accountValidator.validate(account,bindingResult);
        if (bindingResult.hasErrors()) {

            List<ValidationErrorDTO> errors = bindingResult.getFieldErrors().stream()
                    .map(error -> new ValidationErrorDTO(error.getField(), error.getDefaultMessage()))
                    .collect(Collectors.toList());

            return ResponseEntity.badRequest().body(errors);
        }
        accountService.createAccount(account);
        String token = jwtUtil.generateToken(account);
        Map<String,String>answer=Map.of("jwt-token", token);
        return ResponseEntity.status(HttpStatus.OK).body(answer);
    }

    @PostMapping("/change-password/{userId}/{oldPassword}/{confirmPassword}")
    public ResponseEntity<?> changePassword(@PathVariable("userId") int userId,
                                            @PathVariable("oldPassword") String oldPassword,
                                            @PathVariable("confirmPassword") String newPassword) {
        try {
            accountService.changePassword(userId, oldPassword, newPassword);
            return ResponseEntity.ok().body("Password updated successfully");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<List<Account>>getAccount() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication != null && authentication.isAuthenticated()) {
            String username = authentication.getName();
            // Теперь у вас есть имя пользователя авторизованного пользователя.
            System.out.println(username);
        }


        return ResponseEntity.ok(accountService.getAccounts());


    }

    @PostMapping("/validateJWT")
    public ResponseEntity<?> validateJWT(@RequestHeader(name = "Authorization")  Map<String, String> requestBody) {

        String token = requestBody.get("authorization");
        token = token.substring(7);

        try {
            String email = jwtUtil.validateTokenAndRetriveClaim(token);
            Account account = accountService.findByUsername(email).orElse(null);

            return ResponseEntity.ok(account);
        } catch (JWTVerificationException e) {
            return new ResponseEntity<>("Invalid JWT token", HttpStatus.UNAUTHORIZED);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>>performLogin(@RequestBody AuthenticationDTO authenticationDTO) {
        UsernamePasswordAuthenticationToken authInputToken =
                new UsernamePasswordAuthenticationToken(authenticationDTO.getUsername(),
                        authenticationDTO.getPassword());
        try {
            authenticationManager.authenticate(authInputToken);
        } catch (BadCredentialsException e) {
            Map<String, String> response = Map.of("message", "Incorrect credentials!");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }
        Account account= accountService.findByUsername(authenticationDTO.getUsername()).orElse(null);
        assert account != null;
        String token = jwtUtil.generateToken(account);
        Map<String,String>answer=Map.of("jwt-token", token);
        return ResponseEntity.status(HttpStatus.OK).body(answer);

    }

    @GetMapping("/getAll")
    public ResponseEntity<List<Account>> getAll() {
        return ResponseEntity.ok(accountRepository.findAll());
    }
}

