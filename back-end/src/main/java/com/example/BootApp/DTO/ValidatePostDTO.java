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

    @NotEmpty(message = "Must be not empty")
    @Size(min = 2,max = 100,message = "LIMIT !!!")
    private String post_header;

    @NotEmpty(message = "Must be not empty")
//    @Size(min = 2,max = 100,message = "LIMIT !!!")
    private String post_city;

    @NotEmpty(message ="Must be not empty" )
    private String post_type;

    @NotNull(message = "Must be not empty")
    @Temporal(TemporalType.DATE)
    @DateTimeFormat(pattern = "dd/MM/yyyy")
    private Date posts_start_day;

    @NotNull(message = "Must be not empty")
    @Temporal(TemporalType.DATE)
    @DateTimeFormat(pattern = "dd/MM/yyyy")
    private Date posts_end_day;

    @NotEmpty(message = "Must be not empty")
    private String post_contactPhone;

    @NotEmpty(message = "Must be not empty")
    @Email(message = "Please provide correct email ")
    private String post_email;

    @NotNull(message = "Must be not empty")
    private Integer salary;


    @NotEmpty(message = "Must be not empty")
    private String company;

   // @NotEmpty(message = "Please chose the owner")
    private Account owner;



}
