package com.example.BootApp.DTO;

import com.example.BootApp.models.Person;
import com.example.BootApp.models.Post;
import com.example.BootApp.models.Post_atribute;
import com.fasterxml.jackson.annotation.JsonProperty;
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
import org.springframework.security.core.parameters.P;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AddPostDTO {


    private PostForSaveDTO posts; // Информация о посте
    private List<Post_atribute> data;
//    private Map<String, Object> posts;
//    private List<Map<String, String>> data;

//    @JsonProperty("Array")
//    public List<Post_atribute> data;
//
//    public Post posts;



}