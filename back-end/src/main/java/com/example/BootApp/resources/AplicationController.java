package com.example.BootApp.resources;

import com.example.BootApp.models.Document;
import com.example.BootApp.repo.DocumentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.core.io.Resource;

import java.io.IOException;
import java.util.Optional;

@Controller
@RequestMapping("document")
@CrossOrigin(origins = "http://localhost:3000", methods = {RequestMethod.GET, RequestMethod.POST}, allowedHeaders = "*")
public class AplicationController {

    private final DocumentRepository documentRepository;

    @Autowired
    public AplicationController(DocumentRepository documentRepository){
      this.documentRepository=documentRepository;
    }

    @PostMapping("/saveCV")
    public ResponseEntity<String> uploadDocument(@RequestParam("file") MultipartFile file) {

        System.out.println('s');
        try {
            Document document = new Document();

            document.setName(file.getOriginalFilename());

            document.setContent(file.getBytes());

            documentRepository.save(document);

            return ResponseEntity.ok().body("Документ успешно сохранен");

        } catch (IOException e) {

            return ResponseEntity.badRequest().body("Ошибка при сохранении документа");

        }
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

    System.out.println("as");
    Optional<Document> documentOptional = documentRepository.findById(id);


    if (documentOptional.isPresent()) {


        Document document = documentOptional.get();


        ByteArrayResource resource = new ByteArrayResource(document.getContent());


        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment;filename=" + document.getName())
                .contentType(MediaType.APPLICATION_PDF)
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

}
