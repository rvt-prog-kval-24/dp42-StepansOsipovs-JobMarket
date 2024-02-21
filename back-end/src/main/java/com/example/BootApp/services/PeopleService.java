package com.example.BootApp.services;

import com.example.BootApp.DTO.SetOwnerDTO;
import com.example.BootApp.models.Person;
import java.util.List;


public interface PeopleService  {




    public List<Person> findAll();



    public Person findOne(int id);




    public void save(Person person);


    public void update(int id,Person updatesPeron);


    public void del(int id);


    public List<SetOwnerDTO> getPersonToSetOwner();

    public List<SetOwnerDTO> getByName(String name) ;
}
