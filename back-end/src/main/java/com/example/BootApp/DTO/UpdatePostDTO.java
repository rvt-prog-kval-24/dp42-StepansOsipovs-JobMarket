package com.example.BootApp.DTO;//package com.example.BootApp.DTO;
//
//import com.example.BootApp.models.Post_atribute;
//import com.fasterxml.jackson.annotation.JsonIgnore;
//import com.fasterxml.jackson.annotation.JsonManagedReference;
//import jakarta.persistence.*;
//import jakarta.validation.constraints.Email;
//import jakarta.validation.constraints.NotEmpty;
//import jakarta.validation.constraints.NotNull;
//import jakarta.validation.constraints.Size;
//import lombok.Getter;
//import lombok.Setter;
//import org.hibernate.annotations.OnDelete;
//import org.hibernate.annotations.OnDeleteAction;
//import org.springframework.format.annotation.DateTimeFormat;
//
//import java.util.*;
//
//@Getter
//@Setter
//@Entity
//
//public class UpdatePostDTO {
//    @Id
//    @Column(name = "id")
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Integer id;
//    @NotEmpty(message = "Must be not empty")
//    @Size(min = 2,max = 100,message = "LIMIT !!!")
//    @Column(name = "post_header")
//    private String post_header;
//
//    @NotEmpty(message = "Must be not empty")
//    @Column(name = "post_city")
//    private String post_city;
//
//    @NotEmpty(message ="Must be not empty" )
//    @Column(name = "post_type")
//    private String post_type;
//
//    @NotNull(message = "Must be not empty")
//    @Column(name = "posts_start_day")
//    @Temporal(TemporalType.DATE)
//    @DateTimeFormat(pattern = "dd/MM/yyyy")
//    private Date posts_start_day;
//
//    @Column(name = "posts_end_day",nullable = false)
//    @NotNull(message = "Must be not empty")
//    @Temporal(TemporalType.DATE)
//    @DateTimeFormat(pattern = "dd/MM/yyyy")
//    private Date posts_end_day;
//
//    @NotEmpty(message = "Must be not empty")
//    @Column(name = "post_contact_phone")
//    private String post_contactPhone;
//
//    @NotEmpty(message = "Must be not empty")
//    @Email(message = "Please provide correct email ")
//    @Column(name = "post_email")
//    private String post_email;
//    @Column(name = "salary")
//    @NotNull(message = "Must be not empty")
//    private Integer salary;
//
//
//
//    private List<Post_atribute> postAtributes;
//
//
//    private String company;
//
//
//    private int owner;
//
//
//}
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.util.Date;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UpdatePostDTO {
    private String company;
    private Integer id;
    private Integer owner;
    private List<EditAttributeDTO> postAtributes;
    private String post_city;
    private String post_contactPhone;
    private String post_email;
    private String post_header;
    private String post_type;
    private Date posts_start_day;
    private Date posts_end_day;
    private Integer salary;

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class EditAttributeDTO {
        private Integer id;
        private String title;
        private String body;
    }
}


