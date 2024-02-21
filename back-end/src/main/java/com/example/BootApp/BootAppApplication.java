package com.example.BootApp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.authentication.AuthenticationManager;

@SpringBootApplication
public class BootAppApplication {




	public static void main(String[] args) {
		SpringApplication.run(BootAppApplication.class, args);


	}

}
