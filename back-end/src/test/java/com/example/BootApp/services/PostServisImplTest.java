//package com.example.BootApp.services;
//
//import com.example.BootApp.models.Post;
//import com.example.BootApp.repo.PostsRepository;
//import com.example.BootApp.services.impl.PostServisImpl;
//import com.example.BootApp.util.PostNotFoundException;
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.Test;
//import org.mockito.InjectMocks;
//import org.mockito.Mock;
//import org.mockito.MockitoAnnotations;
//
//import java.util.Optional;
//
//import static org.junit.jupiter.api.Assertions.assertEquals;
//import static org.junit.jupiter.api.Assertions.assertThrows;
//import static org.mockito.Mockito.verify;
//import static org.mockito.Mockito.when;
//
////@ExtendWith(MockitoExtension.class)
//class PostServisImplTest {
//
//    @Mock
//    private  PostsRepository postsRepository;
//    @InjectMocks
//    private PostServisImpl underTest;
//
//
//
//    @BeforeEach
//    public void setUp() {
//        MockitoAnnotations.openMocks(this);
//    }
//
//    @Test
//    public void testFindOneWithExistingId() {
//        int postId = 1;
//        Post expectedPost = new Post();
//        expectedPost.setId(postId);
//
//        when(postsRepository.findById(postId)).thenReturn(Optional.of(expectedPost));
//
//        Post actualPost = underTest.findOne(postId);
//
//        assertEquals(expectedPost, actualPost);
//    }
//    @Test
//    public void testFindOneWithNonExistingId() {
//        int nonExistingPostId = 99;
//
//        when(postsRepository.findById(nonExistingPostId)).thenReturn(Optional.empty());
//
//        assertThrows(PostNotFoundException.class, () -> {
//            underTest.findOne(nonExistingPostId);
//        });
//    }
//
//    @Test
//    void findByOwnre() {
//
//    }
//
//    @Test
//    void findOne() {
//    }
//
//    @Test
//    void save() {
//    }
//
////    @Test
////    void findAll() {
////        underTest.findAll();
////
////        verify(postsRepository).findAll();
////    }
//
//
//
//    @Test
//    void headers() {
//    }
//
//    @Test
//    void delete() {
//    }
//
//    @Test
//    void update() {
//    }
//}