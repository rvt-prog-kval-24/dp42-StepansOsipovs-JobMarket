package com.example.BootApp.util;

import com.example.BootApp.DTO.ValidatePostDTO;
import com.example.BootApp.models.Person;
import com.example.BootApp.models.Post;
import com.example.BootApp.repo.PostsRepository;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;
@Component
public class PostValidator implements Validator {
    private final PostsRepository postsRepository;

    public PostValidator(PostsRepository postsRepository) {
        this.postsRepository = postsRepository;
    }


    @Override
    public boolean supports(Class<?> clazz) {
        return true;
    }

    @Override
    public void validate(Object target, Errors errors) {
        ValidatePostDTO post=(ValidatePostDTO) target;
            if (post.getOwner().getId()==0){
                errors.rejectValue("owner","","Chose the owner please :)");
            }
    }
}
