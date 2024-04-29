package com.example.BootApp.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class GetDocumentDTO {
    private String byEmail;
    private String byName;
    private String byPhone;
    private int toPost;
    private String status;
}
