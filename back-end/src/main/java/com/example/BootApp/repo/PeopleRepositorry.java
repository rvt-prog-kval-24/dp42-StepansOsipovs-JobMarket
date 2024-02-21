package com.example.BootApp.repo;


import com.example.BootApp.DTO.PostHeaderDTO;
import com.example.BootApp.DTO.SetOwnerDTO;
import com.example.BootApp.models.Person;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PeopleRepositorry extends JpaRepository<Person,Integer> {


    Optional<Person> findByUsername(String u);



    @Query("SELECT new com.example.BootApp.DTO.SetOwnerDTO(p.id, p.username) FROM Person p where p.username LIKE :name%")
    List<SetOwnerDTO> getPersonForSetOwner(@Param("name") String name);

    @Query("SELECT new com.example.BootApp.DTO.SetOwnerDTO(p.id, p.username) FROM Person p")
    List<SetOwnerDTO> getIdAndName();
}
