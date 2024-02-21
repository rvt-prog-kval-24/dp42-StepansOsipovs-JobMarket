package com.example.BootApp.DTO;

public class ValidationErrorDTO {
    private String field;
    private String error;

    public ValidationErrorDTO(String field, String error) {
        this.field = field;
        this.error = error;
    }

    // Геттеры и сеттеры

    public String getField() {
        return field;
    }

    public void setField(String field) {
        this.field = field;
    }

    public String getError() {
        return error;
    }

    public void setError(String error) {
        this.error = error;
    }
}
