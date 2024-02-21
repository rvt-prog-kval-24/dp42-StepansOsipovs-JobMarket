package com.example.BootApp.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import com.example.BootApp.models.WorkType;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class DataForSwitchDTO {


    private List<String> postCity;

    private List<String> company;

    private List<String> postType;

}
