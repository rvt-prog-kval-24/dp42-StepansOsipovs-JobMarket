package com.example.BootApp.services.impl;


import com.example.BootApp.DTO.*;
import com.example.BootApp.models.*;
import com.example.BootApp.repo.AccountRepository;
import com.example.BootApp.repo.AtributeRepo;
import com.example.BootApp.repo.PeopleRepositorry;
import com.example.BootApp.repo.PostsRepository;
import com.example.BootApp.services.PostService;
import com.example.BootApp.specifications.PostSpecifications;
import com.example.BootApp.util.MyFileNotFoundException;
import com.example.BootApp.util.PostMapperImpl;
import com.example.BootApp.util.PostNotDeleted;
import com.example.BootApp.util.PostNotFoundException;
import jakarta.persistence.EntityNotFoundException;
import org.modelmapper.ModelMapper;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.example.BootApp.DTO.UpdatePostDTO.EditAttributeDTO;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Date;
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
    public void save(AddPostDTO post, MultipartFile foto) throws IOException {
        PostMapperImpl mapper=new PostMapperImpl();
        Post postForSave=  mapper.map(post.getPosts());
        Account person =accountRepository.findById(post.getPosts().getOwner().getId()).orElse(null);
        postForSave.setOwner(person);
        postForSave.setData(foto.getBytes());
        Post savedPost = postsRepository.save(postForSave);

        for (Post_atribute obj : post.getData()) {
            obj.setPost(savedPost);
            atributeRepo.save(obj);
        }
    }


    @Override
    public DataForSwitchDTO getDataForFilerSwitch() {
        Date today = new Date();
      DataForSwitchDTO data=new DataForSwitchDTO();

      data.setCompany(postsRepository.selectDistinctCompany(today));
      data.setPostType(postsRepository.selectDistinctType(today));
      data.setPostCity(postsRepository.selectDistinctCity(today));
      return data;
//      return postsRepository.selectDataForSwitch();


    }


    public List<Post> getByOwner(int id){
        Date today = new Date();
        return postsRepository.findAllByOwner_IdAndWithinDateRange(id,today);
    }
    public List<PostHeaderDTO> headers() {
        Date today = new Date();
        return postsRepository.selectHeaders(today);
    }
    @Transactional
    public void delete(int id) {

            Post post=postsRepository.findById(id).orElseThrow(PostNotDeleted::new);

            postsRepository.delete(post);


    }
//    @Transactional
//    public void update(int id, UpdatePostDTO postDTO) {
//        System.out.println("Attempting to update post with ID: " + id);
//        System.out.println("Received city from DTO: " + postDTO.getPost_city());
//        UpdatePostDTO.EditAttributeDTO attribute = new UpdatePostDTO.EditAttributeDTO();
//
//        Post postToUpdate = postsRepository.findById(id).orElse(null);
//
//        if (postToUpdate != null) {
//            System.out.println("Post found, updating details.");
//            // Обновление полей объекта postToUpdate с использованием данных из postDTO
//            postToUpdate.setPost_header(postDTO.getPost_header());
//            postToUpdate.setPost_city(postDTO.getPost_city());
//            postToUpdate.setPost_type(postDTO.getPost_type());
//            postToUpdate.setPosts_start_day(postDTO.getPosts_start_day());
//            postToUpdate.setPosts_end_day(postDTO.getPosts_end_day());
//            postToUpdate.setPost_contactPhone(postDTO.getPost_contactPhone());
//            postToUpdate.setPost_email(postDTO.getPost_email());
//            postToUpdate.setSalary(postDTO.getSalary());
//            postToUpdate.setCompany(postDTO.getCompany());
//            // Дополнительно можно обновить связанные атрибуты или другие поля, если это необходимо
//
//            // Сохранение обновлённого объекта в базу данных
//            postsRepository.save(postToUpdate);
//
//            System.out.println(postDTO.getPostAtributes().toString());
//        } else {
//            System.out.println("Post not found with id: " + id);
//        }
//    }
@Transactional
public void update(int id, UpdatePostDTO postDTO) {
    System.out.println("Attempting to update post with ID: " + id);
    System.out.println("Received city from DTO: " + postDTO.getPost_city());

    Post postToUpdate = postsRepository.findById(id).orElse(null);

    if (postToUpdate != null) {
        System.out.println("Post found, updating details.");
        // Обновление основных полей
        postToUpdate.setPost_header(postDTO.getPost_header());
        postToUpdate.setPost_city(postDTO.getPost_city());
        postToUpdate.setPost_type(postDTO.getPost_type());
        postToUpdate.setPosts_start_day(postDTO.getPosts_start_day());
        postToUpdate.setPosts_end_day(postDTO.getPosts_end_day());
        postToUpdate.setPost_contactPhone(postDTO.getPost_contactPhone());
        postToUpdate.setPost_email(postDTO.getPost_email());
        postToUpdate.setSalary(postDTO.getSalary());
        postToUpdate.setCompany(postDTO.getCompany());

        // Обновление связанных атрибутов
        if (postDTO.getPostAtributes() != null) {
            postToUpdate.getPostAtributes().clear();  // Очистка существующих атрибутов
            for (UpdatePostDTO.EditAttributeDTO attrDTO : postDTO.getPostAtributes()) {
                Post_atribute attribute = new Post_atribute();
                attribute.setId(attrDTO.getId());
                attribute.setTitle(attrDTO.getTitle());
                attribute.setBody(attrDTO.getBody());
                attribute.setPost(postToUpdate);  // Установка обратной связи с родительским постом
                // Добавление атрибута к посту
                atributeRepo.save(attribute);
            }

        }

        // Сохранение обновлённого объекта в базу данных
        postsRepository.save(postToUpdate);
    } else {
        System.out.println("Post not found with id: " + id);
    }
}


}
