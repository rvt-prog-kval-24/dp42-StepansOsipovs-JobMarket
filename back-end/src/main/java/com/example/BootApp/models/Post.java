package com.example.BootApp.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.*;

@Getter
@Setter
@Entity
@Table(name = "post_mandatory")
public class Post {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @NotEmpty(message = "Must be not empty")
    @Size(min = 2,max = 100,message = "LIMIT !!!")
    @Column(name = "post_header")
    private String post_header;

    @NotEmpty(message = "Must be not empty")
    @Column(name = "post_city")
    private String post_city;

    @NotEmpty(message ="Must be not empty" )
    @Column(name = "post_type")
    private String post_type;

    @NotNull(message = "Must be not empty")
    @Column(name = "posts_start_day")
    @Temporal(TemporalType.DATE)
    @DateTimeFormat(pattern = "dd/MM/yyyy")
    private Date posts_start_day;

    @Column(name = "posts_end_day",nullable = false)
    @NotNull(message = "Must be not empty")
    @Temporal(TemporalType.DATE)
    @DateTimeFormat(pattern = "dd/MM/yyyy")
    private Date posts_end_day;

    @NotEmpty(message = "Must be not empty")
    @Column(name = "post_contact_phone")
    private String post_contactPhone;

    @NotEmpty(message = "Must be not empty")
    @Email(message = "Please provide correct email ")
    @Column(name = "post_email")
    private String post_email;
    @Column(name = "salary")
    @NotNull(message = "Must be not empty")
    private Integer salary;


    @JsonIgnore
    @OneToMany(mappedBy = "post"  ,fetch = FetchType.LAZY,cascade = CascadeType.ALL)
    private List<Post_atribute> postAtributes;

    @NotEmpty(message = "Must be not empty")
    @Column(name = "company")
    private String company;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "person_id",referencedColumnName = "id",nullable = false)
    private Account owner;

    public Post(String post_header, String post_city,
                String post_type, Date posts_start_day, Date posts_end_day,
               String post_email,String post_contactPhone,Integer salary,String company,Account owner) {
        this.post_header = post_header;
        this.post_city = post_city;
        this.post_type = post_type;
        this.posts_start_day = posts_start_day;
        this.posts_end_day = posts_end_day;
        this.post_email=post_email;
        this.post_contactPhone=post_contactPhone;
        this.salary=salary;
        this.company=company;
        this.owner=owner;

    }

    public Post() {


    }

    @Override
    public String toString() {
        return "Post{" +
                "id=" + id +
                ", post_header='" + post_header + '\'' +
                ", post_city='" + post_city + '\'' +
                ", post_type='" + post_type + '\'' +
                ", posts_start_day=" + posts_start_day +
                ", posts_end_day=" + posts_end_day +
                ", post_contactPhone='" + post_contactPhone + '\'' +
                ", post_email='" + post_email + '\'' +
                ", salary=" + salary +
                ", postAtributes=" + postAtributes +
                ", company='" + company + '\'' +
                ", owner=" + owner.getId() +
                '}';
    }
}
