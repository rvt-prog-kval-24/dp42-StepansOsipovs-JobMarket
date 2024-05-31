package com.example.BootApp.repo;


import com.example.BootApp.DTO.CompanyPostCountDTO;
import com.example.BootApp.DTO.DataForSwitchDTO;
import com.example.BootApp.DTO.FilterDataDTO;
import com.example.BootApp.DTO.PostHeaderDTO;
import com.example.BootApp.models.Post;
import com.example.BootApp.models.Person;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Repository
public interface PostsRepository extends JpaRepository<Post,Integer>, JpaSpecificationExecutor<Post> {


    List<Post>findByOwner(Person owner);

    @Query("SELECT p FROM Post p WHERE p.owner.id = :ownerId ")
    List<Post> findAllByOwner_IdAndWithinDateRange(@Param("ownerId") int ownerId);



    List<Post> findAllByOwner_Id(int ownerId);

    @Query("SELECT DISTINCT p.post_city FROM Post p  WHERE  p.posts_start_day <= :today AND p.posts_end_day > :today")
    List<String> selectDistinctCity(@Param("today") Date today);
    @Query("SELECT DISTINCT p.company FROM Post p  WHERE  p.posts_start_day <= :today AND p.posts_end_day > :today")
    List<String> selectDistinctCompany(@Param("today") Date today);

    @Query("SELECT DISTINCT p.post_type FROM Post p  WHERE  p.posts_start_day <= :today AND p.posts_end_day > :today")
    List<String> selectDistinctType(@Param("today") Date today);

    @Query("SELECT new com.example.BootApp.DTO.PostHeaderDTO(p.id, p.post_header,p.post_type,p.salary,p.company) FROM Post p  WHERE  p.posts_start_day <= :today AND p.posts_end_day > :today")
    List<PostHeaderDTO> selectHeaders(@Param("today") Date today);


    @Query("SELECT new com.example.BootApp.DTO.CompanyPostCountDTO(p.company, COUNT(p)) FROM Post p GROUP BY p.company ORDER BY COUNT(p) DESC")
    List<CompanyPostCountDTO> countPostsByCompany(Pageable pageable);

    @Query("SELECT DISTINCT new com.example.BootApp.DTO.DataForSwitchDTO(p.post_city, p.company, p.post_type) FROM Post p")
    List<DataForSwitchDTO> selectDataForSwitch();

}
