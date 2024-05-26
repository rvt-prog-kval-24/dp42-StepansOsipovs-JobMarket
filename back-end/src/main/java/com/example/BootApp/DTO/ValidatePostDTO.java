package com.example.BootApp.DTO;

import com.example.BootApp.models.Account;
import com.example.BootApp.models.Person;
import com.example.BootApp.models.Post_atribute;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
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
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ValidatePostDTO {

    @NotEmpty(message = "Nevar būt tukšs")
    @Size(min = 2,max = 100,message = "Jabut 2-100 simbolu ")
    private String post_header;

    @NotEmpty(message = "Nevar būt tukšs")
//    @Size(min = 2,max = 100,message = "LIMIT !!!")
    private String post_city;

    @NotEmpty(message ="Nevar būt tukšs" )
    private String post_type;

    @NotNull(message = "Nevar būt tukšs")
    @Temporal(TemporalType.DATE)
    @DateTimeFormat(pattern = "dd/MM/yyyy")
    private Date posts_start_day;

    @NotNull(message = "Nevar būt tukšs")
    @Temporal(TemporalType.DATE)
    @DateTimeFormat(pattern = "dd/MM/yyyy")
    private Date posts_end_day;

    @NotEmpty(message = "Nevar būt tukšs")
    private String post_contactPhone;

    @NotEmpty(message = "Nevar būt tukšs")
    @Email(message = "Please provide correct email ")
    private String post_email;

    @NotNull(message = "Nevar būt tukšs")
    private Integer salary;


    @NotEmpty(message = "Nevar būt tukšs")
    private String company;

   // @NotEmpty(message = "Please chose the owner")
    private Account owner;



}
