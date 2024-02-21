package com.example.BootApp.resources;

import com.example.BootApp.models.Cities;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@RequestMapping("cities")
public class CitiesController {

    @GetMapping
    public String getCities(Model model){
        model.addAttribute("cities", Cities.values());

        return "cities/cities";
    }

    @PostMapping
    public String processSelection(Model model,@RequestParam("selectCity") String selectedValue) {

        System.out.println("Choose a city : " + selectedValue);
        model.addAttribute("cities", Cities.values());
        return "cities/cities";
    }
}
