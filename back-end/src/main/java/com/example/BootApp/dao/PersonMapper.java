package com.example.BootApp.dao;




import com.example.BootApp.models.Person;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class PersonMapper implements RowMapper<Person> {


    @Override
    public Person mapRow(ResultSet rs, int rowNum) throws SQLException {
       Person person=new Person();
        person.setId(rs.getInt("id"));
        person.setUsername(rs.getString("name"));
        return person;
    }
}
