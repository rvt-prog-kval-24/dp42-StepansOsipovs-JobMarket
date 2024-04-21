package com.example.BootApp.repo;


import com.example.BootApp.DTO.DataForSwitchDTO;
import com.example.BootApp.DTO.FilterDataDTO;
import com.example.BootApp.DTO.PostHeaderDTO;
import com.example.BootApp.models.Post;
import com.example.BootApp.models.Person;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PostsRepository extends JpaRepository<Post,Integer>, JpaSpecificationExecutor<Post> {


    List<Post>findByOwner(Person owner);

    List<Post> findAllByOwner_Id(int ownerId);
    @Query("SELECT DISTINCT p.post_city FROM Post p")
    List<String> selectDistinctCity();
    @Query("SELECT DISTINCT p.company FROM Post p")
    List<String> selectDistinctCompany();

    @Query("SELECT DISTINCT p.post_type FROM Post p")
    List<String> selectDistinctType();

    @Query("SELECT new com.example.BootApp.DTO.PostHeaderDTO(p.id, p.post_header,p.post_type,p.salary,p.company) FROM Post p")
    List<PostHeaderDTO> selectHeaders();

    @Query("SELECT DISTINCT new com.example.BootApp.DTO.DataForSwitchDTO(p.post_city, p.company, p.post_type) FROM Post p")
    List<DataForSwitchDTO> selectDataForSwitch();

}
