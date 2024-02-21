package com.example.BootApp.resources;

import com.example.BootApp.DTO.SetOwnerDTO;
import com.example.BootApp.DTO.ValidationErrorDTO;
import com.example.BootApp.dao.PersonDAO;
import com.example.BootApp.models.Person;
import com.example.BootApp.services.PeopleService;
import com.example.BootApp.services.impl.PeopleServiceImpl;
import com.example.BootApp.util.PersonValidator;
import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;
import java.util.List;
import java.util.stream.Collectors;

@Controller
@RequestMapping("people")
@CrossOrigin(origins = "http://localhost:3000", methods = {RequestMethod.GET, RequestMethod.POST}, allowedHeaders = "*")
public class PeopleController {




    private final PeopleServiceImpl peopleServiceImpl;
    private final PersonValidator personValidator ;
    @Autowired
    public PeopleController(PersonDAO personDAO, PeopleServiceImpl peopleServiceImpl, PersonValidator personValidator){
        this.peopleServiceImpl = peopleServiceImpl;

        this.personValidator = personValidator;
    }
    @GetMapping("")
    public String index( Model model) throws SQLException {

        model.addAttribute("people", peopleServiceImpl.findAll());

        return "people/index";
    }






    @GetMapping("/getUsersByName")
    @ResponseBody
    public List<SetOwnerDTO> getUserByName(@RequestParam String name){
      return peopleServiceImpl.getByName(name);
    }



    @GetMapping("/{id}")
    public ResponseEntity<Person> show(@PathVariable("id") int id, Model model) throws SQLException {

        //model.addAttribute("person", peopleServiceImpl.findOne(id));

        return ResponseEntity.ok(peopleServiceImpl.findOne(id));
    }


    @GetMapping("/new")
    public String newPerson(Model model){
        model.addAttribute("person",new Person());

        return "people/new";
    }

    @ResponseBody
    @PostMapping
    public ResponseEntity<?> create(@RequestBody @Valid Person person,
                                 BindingResult bindingResult) throws SQLException {

        personValidator.validate(person,bindingResult);
        if (bindingResult.hasErrors()) {

            List<ValidationErrorDTO> errors = bindingResult.getFieldErrors().stream()
                    .map(error -> new ValidationErrorDTO(error.getField(), error.getDefaultMessage()))
                    .collect(Collectors.toList());

            return ResponseEntity.badRequest().body(errors);
        }
        peopleServiceImpl.save(person);
        return ResponseEntity.ok(HttpStatus.OK);
    }


    @GetMapping("/{id}/edit")
    public String edit(Model model,@PathVariable("id") int id) throws SQLException {
        model.addAttribute("person", peopleServiceImpl.findOne(id));
        return "people/edit";
    }

    @PostMapping("/{id}")
    public String update(@ModelAttribute("person") @Valid Person person ,
                         BindingResult bindingResult,
                         @PathVariable("id") int id) throws SQLException {

        personValidator.validate(person,bindingResult);
        if (bindingResult.hasErrors()){
            return "people/edit";
        }
        peopleServiceImpl.update(id,person);
        return "redirect:/people";
    }

    @PostMapping("/del/{id}")
    public String del(@PathVariable("id") int id) throws SQLException {
        peopleServiceImpl.del(id);
        return "redirect:/people";
    }
}
