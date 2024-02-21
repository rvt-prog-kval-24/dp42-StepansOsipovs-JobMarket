package com.example.BootApp.util;

import com.example.BootApp.DTO.PostForSaveDTO;
import com.example.BootApp.models.Person;
import com.example.BootApp.models.Post;
import com.example.BootApp.repo.PeopleRepositorry;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

public class PostMapperImpl implements PostMapper<PostForSaveDTO, Post> {


    @Override
    public Post map(PostForSaveDTO source) {

        Post destination=new Post();
        destination.setCompany(source.getCompany());
        destination.setPost_city(source.getPost_city());
        destination.setPost_header(source.getPost_header());
        destination.setPost_email(source.getPost_email());
        destination.setSalary(source.getSalary());
        destination.setPost_contactPhone(source.getPost_contactPhone());
        destination.setPosts_end_day(source.getPosts_end_day());
        destination.setPosts_start_day(source.getPosts_start_day());
        destination.setPost_type(source.getPost_type());


        return destination;
    }
}
