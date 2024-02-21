package com.example.BootApp.services;

import com.example.BootApp.DTO.AddPostDTO;
import com.example.BootApp.DTO.DataForSwitchDTO;
import com.example.BootApp.DTO.GetPostDTO;
import com.example.BootApp.DTO.PostHeaderDTO;
import com.example.BootApp.models.Post;
import com.fasterxml.jackson.core.JsonProcessingException;

import java.util.List;

public interface PostService {
    public GetPostDTO findOne(int id) throws JsonProcessingException;

    public void save(AddPostDTO post) ;

    public DataForSwitchDTO getDataForFilerSwitch();




    public List<PostHeaderDTO> headers();

    public void delete(int id);

    public void update(int id, Post post);
}
