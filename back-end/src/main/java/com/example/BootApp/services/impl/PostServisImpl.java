package com.example.BootApp.services.impl;


import com.example.BootApp.DTO.*;
import com.example.BootApp.models.Account;
import com.example.BootApp.models.Post;
import com.example.BootApp.models.Person;
import com.example.BootApp.models.Post_atribute;
import com.example.BootApp.repo.AccountRepository;
import com.example.BootApp.repo.AtributeRepo;
import com.example.BootApp.repo.PeopleRepositorry;
import com.example.BootApp.repo.PostsRepository;
import com.example.BootApp.services.PostService;
import com.example.BootApp.specifications.PostSpecifications;
import com.example.BootApp.util.PostMapperImpl;
import com.example.BootApp.util.PostNotDeleted;
import com.example.BootApp.util.PostNotFoundException;
import org.modelmapper.ModelMapper;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
public class PostServisImpl implements PostService {


    private final PostsRepository postsRepository;
    private final AtributeRepo atributeRepo;

    private final PeopleRepositorry peopleRepositorry;

    private final AccountRepository accountRepository;
    public PostServisImpl(PostsRepository postsRepository, AtributeRepo atributeRepo, PeopleRepositorry peopleRepositorry, AccountRepository accountRepository) {


        this.postsRepository = postsRepository;

        this.atributeRepo = atributeRepo;
        this.peopleRepositorry = peopleRepositorry;
        this.accountRepository = accountRepository;
    }

    public List<Post> getPostsWithFilter(FilterDataDTO dataDTO) {
        Specification<Post> spec = PostSpecifications.filterPosts(dataDTO);

       return postsRepository.findAll(spec);
    }


    @Transactional
    @Override
    public GetPostDTO findOne(int id)   {


        Post foundPost= postsRepository.findById(id).orElseThrow(PostNotFoundException::new);
        ModelMapper modelMapper=new ModelMapper();
        GetPostDTO getPostDTO=modelMapper.map(foundPost,GetPostDTO.class);

        return getPostDTO;

    }
    @Transactional
    public void save(AddPostDTO post) {
        PostMapperImpl mapper=new PostMapperImpl();
        Post postForSave=  mapper.map(post.getPosts());
        Account person =accountRepository.findById(post.getPosts().getOwner().getId()).orElse(null);
        postForSave.setOwner(person);
        Post savedPost = postsRepository.save(postForSave);

        for (Post_atribute obj : post.getData()) {
            obj.setPost(savedPost);
            atributeRepo.save(obj);
        }




    }

    @Override
    public DataForSwitchDTO getDataForFilerSwitch() {

      DataForSwitchDTO data=new DataForSwitchDTO();

      data.setCompany(postsRepository.selectDistinctCompany());
      data.setPostType(postsRepository.selectDistinctType());
      data.setPostCity(postsRepository.selectDistinctCity());
      return data;
//      return postsRepository.selectDataForSwitch();


    }


    public List<PostHeaderDTO> headers() {
        return postsRepository.selectHeaders();
    }
    @Transactional
    public void delete(int id) {

            Post post=postsRepository.findById(id).orElseThrow(PostNotDeleted::new);

            postsRepository.delete(post);


    }
    @Transactional
    public void update(int id, Post post) {
        post.setId(id);
        postsRepository.save(post);
    }


}
