package com.example.BootApp.DTO;

import com.example.BootApp.models.Role;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UpdateAccountAdminDTO {
    private boolean credentialsexpired;

    private boolean enabled;

    private  boolean expired;

    private int id;

    private boolean locked;

    private String username;

    private String roles;
}
