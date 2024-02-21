package com.example.BootApp.util;



import com.example.BootApp.dao.PersonDAO;
import com.example.BootApp.models.Person;
import com.example.BootApp.repo.PeopleRepositorry;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;
@Component
public class PersonValidator implements Validator {


    private final PeopleRepositorry peopleRepositorry;

    public PersonValidator( PeopleRepositorry peopleRepositorry) {

        this.peopleRepositorry = peopleRepositorry;
    }


    @Override
    public boolean supports(Class<?> clazz) {
        return Person.class.equals(clazz);
    }

    @Override
    public void validate(Object target, Errors errors) {
        Person person =(Person) target;

        if (peopleRepositorry.findByUsername(person.getUsername()).isPresent()){
            errors.rejectValue("name","","Name is already taken");
        }

    }
}
