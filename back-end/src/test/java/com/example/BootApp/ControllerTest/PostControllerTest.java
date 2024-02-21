//package com.example.BootApp.ControllerTest;
//import com.example.BootApp.BootAppApplication;
//import com.example.BootApp.resources.PostController;
//import com.example.BootApp.models.Person;
//import com.example.BootApp.models.Post;
//import com.example.BootApp.repo.PeopleRepositorry;
//import com.example.BootApp.repo.PostsRepository;
//import com.example.BootApp.services.impl.PostServisImpl;
//
//import com.example.BootApp.util.PostNotDeleted;
//import com.example.BootApp.util.PostNotFoundException;
//import com.fasterxml.jackson.databind.ObjectMapper;
//import org.junit.jupiter.api.Test;
//import org.mockito.InjectMocks;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
//import org.springframework.boot.test.mock.mockito.MockBean;
//import org.springframework.http.MediaType;
//import org.springframework.test.context.ContextConfiguration;
//import org.springframework.test.web.servlet.MockMvc;
//import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
//import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
//
//
//import java.sql.Date;
//
//import static org.mockito.ArgumentMatchers.any;
//import static org.mockito.Mockito.*;
//
//
//@WebMvcTest(PostController.class)
//@ContextConfiguration(classes = BootAppApplication.class) // Здесь укажите ваш конфигурационный класс
//public class PostControllerTest {
//    @Autowired
//    private MockMvc mockMvc;
//    @MockBean
//    private PostServisImpl postService; // Создаем макет PostServis
//    @Autowired
//    private ObjectMapper objectMapper;
//    @MockBean
//    private PostsRepository postsRepository;
//    @InjectMocks
//    private PostController postController;
//
//    @MockBean
//    private PeopleRepositorry peopleRepositorry;
//
//
//    @Test
//    public void itShouldCreatePost() throws Exception {
//
//        String requestBody = "{" +
//                "\"owner\":{\"id\":11}," +
//                "\"post_header\":\"112\"," +
//                "\"post_body\":\"ewfwefwfew\"," +
//                "\"post_city\":\"rwefwefweftrt\"," +
//                "\"post_type\":\"Remote\"," +
//                "\"posts_start_day\":\"2023-10-04\"," +
//                "\"posts_end_day\":\"2023-10-06\"," +
//                "\"post_requirements\":\"wefwefewff\"," +
//                "\"post_offer\":\"wefwqfewfwfe\"," +
//                "\"post_contactPhone\":\"12\"," +
//                "\"post_email\":\"s.osipov271204@gmail.com\"" +
//                "}";
//
//        mockMvc.perform(MockMvcRequestBuilders
//                        .post("/post/save")
//                        .content(requestBody)
//                        .contentType(MediaType.APPLICATION_JSON))
//                .andExpect(MockMvcResultMatchers.status().isOk());
//
//    }
//
//
//    @Test
//    public void testFindOnePost() throws Exception {
//
//        Post expectedPost = new Post();
//        expectedPost.setId(1);
//        expectedPost.setPost_header("Test Header");
//        expectedPost.setPost_body("Test Body");
//
//
//        when(postService.findOne(1)).thenReturn(expectedPost);
//
//
//        mockMvc.perform(MockMvcRequestBuilders
//                        .get("/post/1")
//                        .contentType(MediaType.APPLICATION_JSON))
//                .andExpect(MockMvcResultMatchers.status().isOk())
//                .andExpect(MockMvcResultMatchers.jsonPath("$.id").value(1))
//                .andExpect(MockMvcResultMatchers.jsonPath("$.post_header").value("Test Header"))
//                .andExpect(MockMvcResultMatchers.jsonPath("$.post_body").value("Test Body"));
//    }
//
//
//    @Test
//    public void testDeletePostById_Successful() throws Exception {
//        int postIdToDelete = 1;
//
//
//        mockMvc.perform(MockMvcRequestBuilders
//                        .post("/post/del/" + postIdToDelete)
//                        .contentType(MediaType.APPLICATION_JSON))
//                .andExpect(MockMvcResultMatchers.status().isOk());
//    }
//
//    @Test
//    public void testDeletePostById_Unsuccessful() throws Exception {
//        int nonExistentPostId = 36;
//
//        doThrow(PostNotDeleted.class).when(postService).delete(nonExistentPostId);
//
//
//        mockMvc.perform(MockMvcRequestBuilders
//                        .post("/post/del/" + nonExistentPostId)
//                        .contentType(MediaType.APPLICATION_JSON))
//                        .andExpect(MockMvcResultMatchers.status().isNotFound()); // Ожидаем неудачный статус
//
//}
//
//    @Test
//    public void testFindOnePostException() throws Exception {
//
//        when(postService.findOne(1)).thenThrow(new PostNotFoundException());
//
//
//        mockMvc.perform(MockMvcRequestBuilders
//                        .get("/post/1")
//                        .contentType(MediaType.APPLICATION_JSON))
//                .andExpect(MockMvcResultMatchers.status().isNotFound());
//    }
//
//
//
//    @Test
//    public void testUpdateUserWithValidInput() throws Exception {
//
//        Post validPost = new Post();
//        Person person = new Person(11, "test", 44);
//        validPost.setId(1);
//        validPost.setOwner(person);
//        validPost.setPost_header("1122");
//        validPost.setPost_body("ewfwefwfew");
//        validPost.setPost_city("rwefwefweftrt");
//        validPost.setPost_type("Remote");
//        validPost.setPosts_start_day(Date.valueOf("2023-10-04"));
//        validPost.setPosts_end_day(Date.valueOf("2023-10-06"));
//        validPost.setPost_requirements("wefwefewff");
//        validPost.setPost_offer("wefwqfewfwfe");
//        validPost.setPost_contactPhone("12");
//        validPost.setPost_email("s.osipov271204@gmail.com");
//
//
//        String requestBody = objectMapper.writeValueAsString(validPost);
//
//
//        mockMvc.perform(MockMvcRequestBuilders
//                        .post("/post/edit")
//                        .content(requestBody)
//                        .contentType(MediaType.APPLICATION_JSON))
//                .andExpect(MockMvcResultMatchers.status().isOk());
//    }
//
//    @Test
//    public void testUpdateUserWithInvalidInput() throws Exception {
//        Post inValidPost = new Post();
//        Person person1 = new Person(11, "test", 44);
//        inValidPost.setId(1);
//        inValidPost.setOwner(person1);
//        inValidPost.setPost_header("1122");
//        inValidPost.setPost_body("ewfwefwfew");
//        inValidPost.setPost_city("rwefwefweftrt");
//        inValidPost.setPost_type("Remote");
//        inValidPost.setPosts_start_day(Date.valueOf("2023-10-04"));
//        inValidPost.setPosts_end_day(Date.valueOf("2023-10-06"));
//        inValidPost.setPost_requirements("wefwefewff");
//        inValidPost.setPost_offer("wefwqfewfwfe");
//        inValidPost.setPost_contactPhone("12");
//        inValidPost.setPost_email("testError");
//
//
//        String requestBody = objectMapper.writeValueAsString(inValidPost);
//
//
//        mockMvc.perform(MockMvcRequestBuilders
//                        .post("/post/edit")
//                        .content(requestBody)
//                        .contentType(MediaType.APPLICATION_JSON))
//                .andExpect(MockMvcResultMatchers.status().isBadRequest()) ;
//
//    }
////    @Test
////    public void shouldCreatePostSuccessfully() throws Exception {
////        // Создаем объект Post для отправки
////        Post postToCreate = new Post();
////        Person person1 = new Person(11, "test", 44);
//////        peopleRepositorry.save(person1);
////        postToCreate.setId(1);
////        postToCreate.setOwner(person1);
////        postToCreate.setPost_header("1122");
////        postToCreate.setPost_body("ewfwefwfew");
////        postToCreate.setPost_city("rwefwefweftrt");
////        postToCreate.setPost_type("Remote");
////        postToCreate.setPosts_start_day(Date.valueOf("2023-10-04"));
////        postToCreate.setPosts_end_day(Date.valueOf("2023-10-06"));
////        postToCreate.setPost_requirements("wefwefewff");
////        postToCreate.setPost_offer("wefwqfewfwfe");
////        postToCreate.setPost_contactPhone("12");
////        postToCreate.setPost_email("s.osipov271204@gmail.com");
////
////        // Преобразуем объект Post в JSON
////        String requestBody = objectMapper.writeValueAsString(postToCreate);
////
////        // Мокируем поведение PostServis
////        when(postService.save(postToCreate, person1)).thenReturn(postToCreate);
////
////        // Выполняем POST-запрос
////        mockMvc.perform(MockMvcRequestBuilders
////                        .post("/post/save")
////                        .content(requestBody)
////                        .contentType(MediaType.APPLICATION_JSON))
////                .andExpect(MockMvcResultMatchers.status().isOk());
////             //   .andExpect(MockMvcResultMatchers.jsonPath("$.owner").value(11)) // Проверяем значение поля "id" внутри объекта "owner"
//////                .andExpect(MockMvcResultMatchers.jsonPath("$.post_header").value("1122")) // Проверяем возвращаемый JSON
//////                .andExpect(MockMvcResultMatchers.jsonPath("$.post_body").value("ewfwefwfew"))
//////                .andExpect(MockMvcResultMatchers.jsonPath("$.post_city").value("rwefwefweftrt"))
//////                .andExpect(MockMvcResultMatchers.jsonPath("$.post_type").value("Remote"))
//////                .andExpect(MockMvcResultMatchers.jsonPath("$.posts_start_day").value("2023-10-04"))
//////                .andExpect(MockMvcResultMatchers.jsonPath("$.posts_end_day").value("2023-10-06"))
//////                .andExpect(MockMvcResultMatchers.jsonPath("$.post_requirements").value("wefwefewff"))
//////                .andExpect(MockMvcResultMatchers.jsonPath("$.post_offer").value("wefwqfewfwfe"))
//////                .andExpect(MockMvcResultMatchers.jsonPath("$.post_contactPhone").value("12"))
//////                .andExpect(MockMvcResultMatchers.jsonPath("$.post_email").value("s.osipov271204@gmail.com"));
////    }
//
//
//}
