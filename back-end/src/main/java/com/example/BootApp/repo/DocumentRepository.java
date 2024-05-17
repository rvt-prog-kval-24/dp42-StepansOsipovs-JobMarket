package com.example.BootApp.repo;


import com.example.BootApp.DTO.CompanyPostCountDTO;
import com.example.BootApp.DTO.GetDocumentDTO;
import com.example.BootApp.DTO.GetPopularDTO;
import com.example.BootApp.models.Document;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DocumentRepository extends JpaRepository<Document, Integer> {
    long countBySendTo(int sendTo); // Метод для подсчета документов по полю sendTo
//    List<Document> findBySendTo(int sendTo);

    @Query("SELECT new com.example.BootApp.DTO.GetDocumentDTO(d.byEmail, d.byName, d.byPhone, d.toPost,d.status,d.id) FROM Document d WHERE d.sendTo = :id")
    List<GetDocumentDTO> findBySendTo(@Param("id") int id);

    @Query("SELECT new com.example.BootApp.DTO.GetDocumentDTO(d.byEmail, d.byName, d.byPhone, d.toPost,d.status,d.id) FROM Document d WHERE d.sendFrom = :id")
    List<GetDocumentDTO> findByFrom(@Param("id") int id);



    @Query("SELECT new com.example.BootApp.DTO.GetPopularDTO(p.toPost, COUNT(p)) FROM Document p GROUP BY p.toPost ORDER BY COUNT(p) DESC")
    List<GetPopularDTO> getPopular(Pageable pageable);

}
