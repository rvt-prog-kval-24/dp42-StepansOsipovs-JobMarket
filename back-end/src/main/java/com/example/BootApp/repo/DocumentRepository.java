package com.example.BootApp.repo;


import com.example.BootApp.DTO.GetDocumentDTO;
import com.example.BootApp.models.Document;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DocumentRepository extends JpaRepository<Document, Integer> {
    long countBySendTo(int sendTo); // Метод для подсчета документов по полю sendTo
//    List<Document> findBySendTo(int sendTo);

    @Query("SELECT new com.example.BootApp.DTO.GetDocumentDTO(d.byEmail, d.byName, d.byPhone, d.toPost,d.status) FROM Document d WHERE d.sendTo = :id")
    List<GetDocumentDTO> findBySendTo(@Param("id") int id);
}
