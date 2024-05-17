package com.example.BootApp.services;

import com.example.BootApp.DTO.*;
import com.example.BootApp.models.Post;
import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface PostService {
    public GetPostDTO findOne(int id) throws JsonProcessingException;

    public void save(AddPostDTO post, MultipartFile foto) throws IOException;

    public DataForSwitchDTO getDataForFilerSwitch();




    public List<PostHeaderDTO> headers();

    public void delete(int id);

    public void update(int id, UpdatePostDTO post);
}
