package com.example.BootApp.util;

import lombok.Getter;

@Getter
public class PostErrorResponse  {
    private String message;

    private Long timestap;

    public PostErrorResponse(String message, Long timestap) {
        this.message = message;
        this.timestap = timestap;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public void setTimestap(Long timestap) {
        this.timestap = timestap;
    }
}
