package com.example.BootApp.repo;

import com.example.BootApp.models.Person;
import com.example.BootApp.models.Post;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.stereotype.Component;

import static org.junit.jupiter.api.Assertions.*;

import java.util.Date;
import java.util.List;


import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

@DataJpaTest
class PostsRepositoryTest {



    @Autowired
    private PostsRepository postsRepository;

    @Autowired
    private PeopleRepositorry peopleRepositorry;

    @Test
    void itShouldFindByOwner() {
        Date startDate = new Date();
        Date endDate = new Date();

        Post post = new Post("Заголовок",  "Город", "Тип", startDate, endDate,
                "example@email.com", "64545",1221222,"skandi");

        Person person=new Person("Bob","22");
        post.setOwner(person);
        peopleRepositorry.save(person);
        postsRepository.save(post);

        List<Post>  posts = postsRepository.findByOwner(person);
        assertThat(posts).isNotNull();
      //TODO сначала сохранить полноценный пост а потом его искать !!!!!!!!!!!



    }
    @Test
    void itShouldNotFindByOwner() {
        Person person=peopleRepositorry.findById(69).orElse(null);

        List<Post>  posts = postsRepository.findByOwner(person);

        assertThat(posts).isEqualTo(null);

    }

}