package com.example.BootApp.DTO;

public class PostHeaderDTO {

    private int id;
    private String post_header;

    private String post_type;



    private int salary;

    private String company;

    public PostHeaderDTO(int id, String post_header, String post_type,  int salary,String company) {
        this.id = id;
        this.post_header = post_header;
        this.post_type = post_type;

        this.salary = salary;
        this.company=company;
    }

    public String getCompany() {
        return company;
    }

    public void setCompany(String company) {
        this.company = company;
    }

    public String getPost_header() {
        return post_header;
    }

    public void setPost_header(String post_header) {
        this.post_header = post_header;
    }

    public String getPost_type() {
        return post_type;
    }

    public void setPost_type(String post_type) {
        this.post_type = post_type;
    }



    public int getSalary() {
        return salary;
    }

    public void setSalary(int salary) {
        this.salary = salary;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }


}
