package com.example.BootApp.resources;

import com.auth0.jwt.exceptions.JWTVerificationException;
import com.example.BootApp.DTO.AuthenticationDTO;
import com.example.BootApp.DTO.SetOwnerDTO;
import com.example.BootApp.DTO.ValidationErrorDTO;
import com.example.BootApp.models.Account;
import com.example.BootApp.secutity.AccountAuthenticationProvider;
import com.example.BootApp.secutity.JWTFilter;
import com.example.BootApp.secutity.JWTUtil;
import com.example.BootApp.services.AccountService;
import com.example.BootApp.services.impl.AccountServiceImpl;
import com.example.BootApp.services.impl.UserDetailsServiceImpl;
import com.example.BootApp.util.AccountValidator;
import com.example.BootApp.util.PersonValidator;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.security.auth.login.AccountNotFoundException;
import java.net.URI;
import java.util.List;
import java.util.Map;
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



    @GetMapping("/getUsersByName")
    @ResponseBody
    public List<SetOwnerDTO> getUserByName(@RequestParam String name){
        return accountService.getByName(name);
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

}

