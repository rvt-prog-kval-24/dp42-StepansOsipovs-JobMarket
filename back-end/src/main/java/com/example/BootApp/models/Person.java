package com.example.BootApp.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "Person")
public class Person {



    @Getter
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;


    @NotEmpty(message = "must be not empty")
    @Size(min = 2,max = 30,message = "LIMIT !!!")
    @Column(name = "name")
    private String username;

    @Column(name = "yourdescription")
    @Size(min = 8,max = 30,message = "LIMIT !!!")
    private String yourdescription;

//    @JsonIgnore
//    @OneToMany(mappedBy = "owner"  ,fetch = FetchType.LAZY)
//    private List<Post> posts;

    public Person( String username,String yourdescription) {
        this.yourdescription=yourdescription;
        this.username = username;
    }
    public Person(int id, String username,String yourdescription) {
        this.id=id;
        this.yourdescription=yourdescription;
        this.username = username;
    }

    public Person() {

    }


    @Override
    public String toString() {
        return "Name"+getUsername()+"YourDescription"+getYourdescription();
    }
}
