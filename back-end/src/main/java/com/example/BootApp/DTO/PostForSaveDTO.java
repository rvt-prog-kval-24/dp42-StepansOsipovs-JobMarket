package com.example.BootApp.DTO;

import com.example.BootApp.models.Account;
import com.example.BootApp.models.Person;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PostForSaveDTO {

    private String post_header;

    private String post_city;

    private String post_type;

    private Date posts_start_day;

    private Date posts_end_day;

    private String post_contactPhone;

    private String post_email;

    private Integer salary;


    private String company;

    // @NotEmpty(message = "Please chose the owner")
    private Account owner;



}

