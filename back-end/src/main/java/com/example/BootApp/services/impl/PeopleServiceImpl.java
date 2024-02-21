package com.example.BootApp.services.impl;

import com.example.BootApp.DTO.SetOwnerDTO;
import com.example.BootApp.models.Person;

import com.example.BootApp.repo.PeopleRepositorry;
import com.example.BootApp.services.PeopleService;
import com.example.BootApp.util.PostNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;


@Service
@Transactional(readOnly = true)
public class PeopleServiceImpl implements  PeopleService {

    private final PeopleRepositorry peopleRepositorry;

    @Autowired
    public PeopleServiceImpl(PeopleRepositorry peopleRepositorry) {
        this.peopleRepositorry = peopleRepositorry;

    }


    public List<Person> findAll(){
        return peopleRepositorry.findAll();
    }

    public Person findOne(int id){
        Optional<Person> foundPerson=peopleRepositorry.findById(id);

        return foundPerson.orElseThrow(PostNotFoundException::new);
    }

    @Transactional
    public void save(Person person){
        peopleRepositorry.save(person);

    }

    @Transactional
    public void update(int id,Person updatesPeron){
        updatesPeron.setId(id);
        peopleRepositorry.save(updatesPeron);
    }


    public Optional<Person> findByName(String name){
       return peopleRepositorry.findByUsername(name);

    }

    @Transactional
    public void del(int id){
        peopleRepositorry.deleteById(id);
    }


    public List<SetOwnerDTO> getPersonToSetOwner() {
        return peopleRepositorry.getIdAndName();
    }

    public List<SetOwnerDTO> getByName(String name) {
        return peopleRepositorry.getPersonForSetOwner(name);
    }


}
