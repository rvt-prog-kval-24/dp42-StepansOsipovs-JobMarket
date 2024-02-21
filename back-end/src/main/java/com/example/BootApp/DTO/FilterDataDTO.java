package com.example.BootApp.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class FilterDataDTO {

    private String postCity;

    private String postHeader;

    private String postType;

    private String company;
}
