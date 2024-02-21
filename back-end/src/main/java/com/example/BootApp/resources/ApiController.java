package com.example.BootApp.resources;

import com.example.BootApp.models.Person;
import com.example.BootApp.services.impl.PeopleServiceImpl;
import com.example.BootApp.util.PostErrorResponse;
import com.example.BootApp.util.PostNotCreatedException;
import com.example.BootApp.util.PostNotFoundException;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;
import java.util.List;

@RestController
@RequestMapping("test")
public class ApiController {
    private final PeopleServiceImpl peopleServiceImpl;

    @Autowired
    public ApiController(PeopleServiceImpl peopleServiceImpl) {
        this.peopleServiceImpl = peopleServiceImpl;
    }

    @GetMapping()
    public List<Person> getPeople() {
        return peopleServiceImpl.findAll(); // Jackson конвертирует эти объекты в JSON
    }

    @GetMapping("/{id}")
    public Person show(@PathVariable("id") int id) throws SQLException {

        return peopleServiceImpl.findOne(id);
    }

    @PostMapping
    public ResponseEntity<HttpStatus> create(@RequestBody @Valid Person person,
                                             BindingResult bindingResult){
        if (bindingResult.hasErrors()){
            StringBuilder errorMsg=new StringBuilder();
            List<FieldError> errors=bindingResult.getFieldErrors();
            for (FieldError error:errors){
                errorMsg.append(error.getField()).append("-").append(error.getDefaultMessage()).append(";");

            }
            throw  new PostNotCreatedException(errorMsg.toString());
        }
        peopleServiceImpl.save(person);
        return ResponseEntity.ok(HttpStatus.OK);

    }

    @ExceptionHandler
    private ResponseEntity<PostErrorResponse> handlException(PostNotFoundException e){
        PostErrorResponse response=new PostErrorResponse("Person with this id wasn't found",System.currentTimeMillis());
        return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);

    }
    @ExceptionHandler
    private ResponseEntity<PostErrorResponse> handlException(PostNotCreatedException e){
        PostErrorResponse response=new PostErrorResponse(e.getMessage(),System.currentTimeMillis());
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);

    }
}
