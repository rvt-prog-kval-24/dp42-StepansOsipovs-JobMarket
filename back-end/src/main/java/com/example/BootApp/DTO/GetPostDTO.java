package com.example.BootApp.DTO;

import com.example.BootApp.models.Account;
import com.example.BootApp.models.Person;
import com.example.BootApp.models.Post_atribute;
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
@AllArgsConstructor
@NoArgsConstructor
public class GetPostDTO {


    private String post_header;


    private String post_city;


    private String post_type;



    private Date posts_start_day;


    private Date posts_end_day;


    private String post_contactPhone;


    private String post_email;

    private Integer salary;



    private List<Post_atribute> postAtributes;


    private String company;


    private Account owner;


    @Override
    public String toString() {
        return "GetPostDTO{" +
                "post_header='" + post_header + '\'' +
                ", post_city='" + post_city + '\'' +
                ", post_type='" + post_type + '\'' +
                ", posts_start_day=" + posts_start_day +
                ", posts_end_day=" + posts_end_day +
                ", post_contactPhone='" + post_contactPhone + '\'' +
                ", post_email='" + post_email + '\'' +
                ", salary=" + salary +
                ", postAtributes=" + postAtributes +
                ", company='" + company + '\'' +
                ", owner=" + owner +
                '}';
    }
}
