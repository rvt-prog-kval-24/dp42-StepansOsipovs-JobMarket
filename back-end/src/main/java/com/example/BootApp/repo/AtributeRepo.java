package com.example.BootApp.repo;

import com.example.BootApp.models.Person;
import com.example.BootApp.models.Post;
import com.example.BootApp.models.Post_atribute;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AtributeRepo extends JpaRepository<Post_atribute,Integer> {
    Optional<Post_atribute> findBypost(Post post);

}
