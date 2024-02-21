package com.example.BootApp.repo;

import com.example.BootApp.DTO.SetOwnerDTO;
import com.example.BootApp.models.Account;
import com.example.BootApp.models.Person;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AccountRepository extends JpaRepository<Account,Integer> {
  Optional< Account> findByUsername(String username);


  @Query("SELECT new com.example.BootApp.DTO.SetOwnerDTO(p.id, p.username) FROM Account p where p.username LIKE :name%")
  List<SetOwnerDTO> getPersonForSetOwner(@Param("name") String name);
}
