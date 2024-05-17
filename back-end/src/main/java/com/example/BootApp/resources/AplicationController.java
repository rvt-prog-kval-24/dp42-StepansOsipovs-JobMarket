package com.example.BootApp.resources;

import com.example.BootApp.DTO.*;
import com.example.BootApp.mail.EmailService;
import com.example.BootApp.models.Document;
import com.example.BootApp.models.Post;
import com.example.BootApp.repo.DocumentRepository;
import com.example.BootApp.repo.PostsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.core.io.Resource;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Controller
@RequestMapping("document")
@CrossOrigin(origins = "http://localhost:3000", methods = {RequestMethod.GET, RequestMethod.POST}, allowedHeaders = "*",exposedHeaders = "Content-Disposition")
public class AplicationController {

    private final EmailService emailService;

    private final PostsRepository postsRepository;
    private final DocumentRepository documentRepository;

    @Autowired
    public AplicationController(EmailService emailService, PostsRepository postsRepository, DocumentRepository documentRepository){
        this.emailService = emailService;
        this.postsRepository = postsRepository;
        this.documentRepository=documentRepository;
    }

    @PostMapping("/saveCV")
    public ResponseEntity<String> uploadDocument(@RequestParam("file") MultipartFile file,
                                                 @RequestParam("email") String email,
                                                 @RequestParam("userName") String userName,
                                                 @RequestParam("phone") String phone,
                                                 @RequestParam("to") int sendTo,
                                                 @RequestParam("post") int postId,
                                                 @RequestParam("from") int sendFrom) {
        System.out.println("Starting file upload");
        try {
            Document document = new Document();

            document.setName(file.getOriginalFilename());
            document.setContent(file.getBytes());
            document.setByEmail(email);      // Установка email
            document.setByName(userName); // Установка имени пользователя
            document.setByPhone(phone);
            document.setSendFrom(sendFrom);
            document.setToPost(postId);
            document.setSendTo(sendTo);
            document.setStatus("Neapskatīts");
            documentRepository.save(document);

            return ResponseEntity.ok().body("Документ успешно сохранен");
        } catch (IOException e) {
            return ResponseEntity.badRequest().body("Ошибка при сохранении документа");
        }
    }

    @PostMapping("/status/update")
    public ResponseEntity<String> updateDocumentStatus(@RequestBody StatusUpdateDTO statusUpdate) {

        Optional<Document> documentOptional = documentRepository.findById(statusUpdate.getId());
        Optional<Post> post=postsRepository.findById(documentOptional.get().getToPost());
        Document document = documentOptional.get();
        document.setStatus(statusUpdate.getStatus());
        documentRepository.save(document);
        emailService.sendSimpleMessage(documentOptional.get().getByEmail(), "Apply status update", "Jusu atsauksme status uz "+post.get().getPost_header()+"ir nomainīts uz "+statusUpdate.getStatus());
        return ResponseEntity.ok("Status updated successfully");
    }

//    @GetMapping("/get/{id}")
//    public ResponseEntity<ByteArrayResource> downloadDocument(@PathVariable("id") Integer id) {
//
//        System.out.println("as");
//        Optional<Document> documentOptional = documentRepository.findById(id);
//
//
//        if (documentOptional.isPresent()) {
//
//            Document document = documentOptional.get();
//
//            ByteArrayResource resource = new ByteArrayResource(document.getContent());
//
//            return ResponseEntity.ok()
//                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment;filename=" + document.getName())
//
//                    .contentType(MediaType.APPLICATION_PDF)
//
//                    .contentLength(document.getContent().length)
//
//                    .body(resource);
//
//        } else {
//            return ResponseEntity.notFound().build();
//        }
//
//
//    }
@GetMapping("/get/{id}")
public ResponseEntity<Resource> downloadDocument(@PathVariable("id") Integer id) {
//
//    System.out.println("as");
//    Optional<Document> documentOptional = documentRepository.findById(id);
//
//
//    if (documentOptional.isPresent()) {
//
//
//        Document document = documentOptional.get();
//
//
//        ByteArrayResource resource = new ByteArrayResource(document.getContent());
//
//
//        return ResponseEntity.ok()
//                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment;filename=\"" + document.getName()+ "\"")
//                .contentType(MediaType.APPLICATION_PDF)
//                .contentLength(document.getContent().length)
//                .body(resource);
//    } else {
//        return ResponseEntity.notFound().build();
//
//    }
//    Optional<Document> documentOptional = documentRepository.findById(id);
//    if (documentOptional.isPresent()) {
//        Document document = documentOptional.get();
//        ByteArrayResource resource = new ByteArrayResource(document.getContent());
//
//
//        return ResponseEntity.ok()
//                .contentType(MediaType.APPLICATION_PDF)
//                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + document.getName() + "\"")
//                .body(new ByteArrayResource(document.getContent()));
//
//
////        return ResponseEntity.ok()
////                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + document.getName() + "\"")
////                .contentType(MediaType.APPLICATION_PDF)  // Проверьте, соответствует ли тип файла
////                .contentLength(document.getContent().length)
////                .body(resource);
//    } else {
//        return ResponseEntity.notFound().build();
//    }
    Optional<Document> documentOptional = documentRepository.findById(id);
    if (documentOptional.isPresent()) {
        Document document = documentOptional.get();

        ByteArrayResource resource = new ByteArrayResource(document.getContent());

        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_PDF)
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + document.getName() + "\"")
                .contentLength(document.getContent().length)
                .body(resource);
    } else {
        return ResponseEntity.notFound().build();
    }
}

    @GetMapping("/get/2/{id}")
    public ResponseEntity<?> test(@PathVariable("id") int id) {

        System.out.println(id);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @GetMapping("/docCount")
    public ResponseEntity<Long> count(@RequestParam Integer id) {
        long count = documentRepository.countBySendTo(id);
        return ResponseEntity.ok(count);
    }
    @GetMapping("/popular")
    public ResponseEntity<List<ReturnPopularPostsDTO>> popular() {
        Pageable topFive = PageRequest.of(0, 5);
        List<GetPopularDTO> popular = documentRepository.getPopular(topFive);
        List<Post> postHeaders = new ArrayList<>();
        List<ReturnPopularPostsDTO> result = new ArrayList<>();

        for (GetPopularDTO item : popular) {
            int postId = item.getToPost();
            Optional<Post> postHeader = postsRepository.findById(postId);
//            postHeader.ifPresent(postHeaders::add);
            postHeader.ifPresent(post -> {
                result.add(new ReturnPopularPostsDTO(post.getPost_header(), Math.toIntExact(item.getApply_count())));
            });
//           result.add(new ReturnPopularPostsDTO(postHeader.get().getPost_header(), Math.toIntExact(item.getApply_count())));
        }
//
//        for (Post post : postHeaders){
//            for (GetPopularDTO item : popular) {
//                result.add(new ReturnPopularPostsDTO(post.getPost_header(), Math.toIntExact(item.getApply_count())));
//            }
//        }

        return ResponseEntity.ok(result);
    }

    @GetMapping("/getById")
    public ResponseEntity<List<GetDocumentDTO>> getDocumentsBySendTo(@RequestParam Integer id) {
        List<GetDocumentDTO> documents = documentRepository.findBySendTo(id);
        return ResponseEntity.ok(documents);
    }
    @GetMapping("/getFrom")
    public ResponseEntity<List<GetDocumentDTO>> getDocumentsByFrom(@RequestParam Integer id) {
        List<GetDocumentDTO> documents = documentRepository.findByFrom(id);
        return ResponseEntity.ok(documents);
    }
}
