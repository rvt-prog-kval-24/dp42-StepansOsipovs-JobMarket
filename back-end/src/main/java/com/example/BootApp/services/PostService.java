package com.example.BootApp.services;

import com.example.BootApp.DTO.*;
import com.example.BootApp.models.Post;
import com.fasterxml.jackson.core.JsonProcessingException;

import java.util.List;

public interface PostService {
    public GetPostDTO findOne(int id) throws JsonProcessingException;

    public void save(AddPostDTO post) ;

    public DataForSwitchDTO getDataForFilerSwitch();




    public List<PostHeaderDTO> headers();

    public void delete(int id);

    public void update(int id, UpdatePostDTO post);
}
