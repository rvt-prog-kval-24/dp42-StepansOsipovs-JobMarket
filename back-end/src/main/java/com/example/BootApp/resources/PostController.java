package com.example.BootApp.resources;

import com.example.BootApp.DTO.*;
import com.example.BootApp.models.Account;
import com.example.BootApp.models.Post;
import com.example.BootApp.models.WorkType;
import com.example.BootApp.repo.PeopleRepositorry;
import com.example.BootApp.repo.PostsRepository;
import com.example.BootApp.secutity.AccountAuthenticationProvider;
import com.example.BootApp.secutity.AccountDetails;
import com.example.BootApp.services.impl.PostServisImpl;
import com.example.BootApp.util.*;
import com.fasterxml.jackson.core.JsonProcessingException;
import io.micrometer.common.KeyValue;
import jakarta.validation.Valid;
import net.coobird.thumbnailator.Thumbnails;
import org.modelmapper.internal.bytebuddy.implementation.bytecode.Throw;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.*;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.*;
import java.util.List;
import java.util.stream.Collectors;

@Controller
@RequestMapping("post")
@CrossOrigin(origins = "http://localhost:3000", methods = {RequestMethod.GET, RequestMethod.POST}, allowedHeaders = "*")
public class PostController {
    private final PostServisImpl postServisImpl;
    private final PostsRepository postsRepository;
    private final PeopleRepositorry peopleRepositorry;


    private final PostValidator postValidator;
//    public static String UPLOAD_DIRECTORY = System.getProperty("BootApp/images") + "/uploads";
public static String UPLOAD_DIRECTORY = System.getProperty("test/projekti/BootApp/images") + "/uploads";

    @Autowired
    public PostController(PostServisImpl postServisImpl, PostsRepository postsRepository, PeopleRepositorry peopleRepositorry,  PostValidator postValidator) {
        this.postServisImpl = postServisImpl;

        this.postsRepository = postsRepository;
        this.peopleRepositorry = peopleRepositorry;

        this.postValidator = postValidator;
    }

    @PostMapping ("/filter")
    @ResponseBody
    public List<Post> getUsersWithFilter(@RequestBody FilterDataDTO dataDTO)  {

        List<Post> result= postServisImpl.getPostsWithFilter(dataDTO);
        if (result.isEmpty()){
            throw new EmptyResultAfterFilter();
        }
        return result;





    }
    @PostMapping("/edit")
    @ResponseBody
    public ResponseEntity<?> updatePost(@RequestBody @Valid Post post ,BindingResult result) {
        if (result.hasErrors()) {

            List<ValidationErrorDTO> errors = result.getFieldErrors().stream()
                    .map(error -> new ValidationErrorDTO(error.getField(), error.getDefaultMessage()))
                    .collect(Collectors.toList());

            return ResponseEntity.badRequest().body(errors);
        }


        postServisImpl.update(post.getId(),post);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @GetMapping("getWorkType")
    @ResponseBody
    public WorkType[] workType(){
        return WorkType.values();
    }

    @GetMapping("/dataForSwitch")
    @ResponseBody
    public ResponseEntity<DataForSwitchDTO> dataForSwitch(){
        return ResponseEntity.ok(postServisImpl.getDataForFilerSwitch());
    }


    @GetMapping("/getHeaders")
    @ResponseBody
    public ResponseEntity<List<PostHeaderDTO>> getHeaders(){
        return ResponseEntity.ok(postServisImpl.headers());
    }

    @PostMapping("/runTests")
    @ResponseBody
    public String runTests() {
        try {
//            ProcessBuilder processBuilder = new ProcessBuilder("bat", "../test/runTest.bat");
            ProcessBuilder processBuilder = new ProcessBuilder("cmd.exe", "/c", "C:\\test\\projekti\\BootApp\\src\\main\\java\\com\\example\\BootApp\\test\\runTest.bat");

            processBuilder.redirectErrorStream(true);
            Process process = processBuilder.start();

            BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
            StringBuilder result = new StringBuilder();
            String line;
            while ((line = reader.readLine()) != null) {
                result.append(line).append("\n");
            }

            int exitCode = process.waitFor();
            if (exitCode != 0) {
                System.err.println("Ошибка при выполнении тестов. Exit Code: " + exitCode);
                return "Ошибка при выполнении тестов.";
            }

            System.out.println("Тесты выполнены успешно:\n" + result);
            return result.toString();
        } catch (IOException | InterruptedException e) {
            e.printStackTrace();
            return "Ошибка при выполнении тестов.";
        }
    }



    @GetMapping("/all")
    @ResponseBody
    public ResponseEntity<List<Post>> all(){
        return ResponseEntity.ok(postsRepository.findAll());
    }



    @GetMapping("{id}")
    @ResponseBody
    public GetPostDTO show(@PathVariable("id") int id)   {

//        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//
//        if (authentication != null && authentication.isAuthenticated()) {
//            String username = authentication.getName();
//            System.out.println(username);
//            System.out.println( authentication.getPrincipal());
//
//        }

    return postServisImpl.findOne(id) ;
    }


    @PostMapping("/upload")
    @ResponseBody
    public ResponseEntity<?> uploadImage(@RequestParam("file") MultipartFile file) {
        try {
            if (file != null && !file.isEmpty()) {
                // Получение имени файла
                String fileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
                System.out.println(fileName);
                // Сохранение сжатого изображения на сервере
                Path path = Paths.get(UPLOAD_DIRECTORY );
                byte[] fileBytes = file.getBytes();
                ByteArrayInputStream inputStream = new ByteArrayInputStream(fileBytes);

                // Чтение изображения
                BufferedImage originalImage = ImageIO.read(inputStream);

                // Изменение размеров изображения (например, до 200x200)
                int newWidth = 200;
                int newHeight = 200;
                BufferedImage resizedImage = new BufferedImage(newWidth, newHeight, originalImage.getType());
                Graphics2D g = resizedImage.createGraphics();
                g.drawImage(originalImage, 0, 0, newWidth, newHeight, null);
                g.dispose();
                System.out.println("qqqqqqqqqqqqqqqqqq");
                // Сохранение измененного изображения
                ImageIO.write(resizedImage, "jpg", path.toFile());
                System.out.println("asasasasas");
                return ResponseEntity.ok().build();
            } else {
                return ResponseEntity.badRequest().build();
            }
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }


//    @PostMapping("/upload")
//    @ResponseBody
//    public ResponseEntity<?> uploadImage( @RequestBody String file) throws IOException {
////        StringBuilder fileNames = new StringBuilder();
////        Path fileNameAndPath = Paths.get(UPLOAD_DIRECTORY, file.getOriginalFilename());
////        fileNames.append(file.getOriginalFilename());
////        Files.write(fileNameAndPath, file.getBytes());
//        byte[] bytes = Base64.getDecoder().decode(file.getBytes());
//        String fileName = UUID.randomUUID().toString();
//        Path path = Paths.get(UPLOAD_DIRECTORY + fileName);
//        Files.write(path, bytes);
//
////        byte[] bytes = file.getBytes();
////        Path path = Paths.get(UPLOAD_DIRECTORY + file.getOriginalFilename());
////        Files.write(path, bytes);
//
//        return ResponseEntity.ok(HttpStatus.OK);
//    }







    @PostMapping("/del/{id}")
   // @ResponseBody
    public ResponseEntity<HttpStatus> delete(@PathVariable("id") int id)  {
        postServisImpl.delete(id);
        return ResponseEntity.ok(HttpStatus.OK);


    }
    @ResponseBody
    @PostMapping("/validate")
    public ResponseEntity<?> validate(@RequestBody @Valid ValidatePostDTO post,
                                  BindingResult bindingResult){
        postValidator.validate(post,bindingResult);
        if (bindingResult.hasErrors()) {

            List<ValidationErrorDTO> errors = bindingResult.getFieldErrors().stream()
                    .map(error -> new ValidationErrorDTO(error.getField(), error.getDefaultMessage()))
                    .collect(Collectors.toList());

            return ResponseEntity.badRequest().body(errors);
        }


        return ResponseEntity.ok(HttpStatus.OK);

    }

    @ResponseBody
    @PostMapping("/save")
    public ResponseEntity<?> save(@RequestBody @Valid AddPostDTO post,
                                             BindingResult bindingResult) throws JsonProcessingException {


        postServisImpl.save(post);
        return ResponseEntity.ok(HttpStatus.OK);


        //        postValidator.validate(post,bindingResult);
//        if (bindingResult.hasErrors()) {
//
//            List<ValidationErrorDTO> errors = bindingResult.getFieldErrors().stream()
//                    .map(error -> new ValidationErrorDTO(error.getField(), error.getDefaultMessage()))
//                    .collect(Collectors.toList());
//
//            return ResponseEntity.badRequest().body(errors);
//        }
//
//
//
//        postServisImpl.save(post,post.getOwner());
//        return ResponseEntity.ok(HttpStatus.OK);

    }



    @ResponseBody
    @PostMapping("/testSave")
    public AddPostDTO testsave(@RequestBody  AddPostDTO addPostDTO,
                                  BindingResult bindingResult){

      //  System.out.println(addPostDTO.getPost_city());


        return addPostDTO;

    }

    @ExceptionHandler
    private ResponseEntity<PostErrorResponse> handlException(PostNotFoundException e){
        PostErrorResponse response=new PostErrorResponse("Post with this id wasn't found",System.currentTimeMillis());
        return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);

    }

    @ExceptionHandler
    private ResponseEntity<PostErrorResponse> handlException(EmptyResultAfterFilter e){
        PostErrorResponse response=new PostErrorResponse("Posts with this settings not found ",System.currentTimeMillis());
        return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);

    }

    @ExceptionHandler
    private ResponseEntity<PostErrorResponse> handlException(PostNotDeleted e){
        PostErrorResponse response=new PostErrorResponse("Post not deleted",System.currentTimeMillis());
        return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);

    }
    @ExceptionHandler
    private ResponseEntity<PostErrorResponse> handlException(PostNotCreatedException e){
        PostErrorResponse response=new PostErrorResponse(e.getMessage(),System.currentTimeMillis());
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);

    }
}
