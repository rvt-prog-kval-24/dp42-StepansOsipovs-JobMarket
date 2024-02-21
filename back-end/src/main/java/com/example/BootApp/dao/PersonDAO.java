package com.example.BootApp.dao;


import com.example.BootApp.models.Person;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.sql.SQLException;
import java.util.List;

@Component
public class PersonDAO {


    private final SessionFactory sessionFactory;

    @Autowired
    public PersonDAO(SessionFactory sessionFactory) {
        this.sessionFactory = sessionFactory;
    }

    @Transactional(readOnly = true)
    public List<Person> index() throws SQLException {
        Session session=sessionFactory.getCurrentSession();
       List<Person> people= session.createQuery("select  p from Person p").getResultList();

        return people;
    }


//    public Optional<Person> show(String name){
//        return null;    }
    @Transactional
    public Person show(final int id) throws SQLException {
        Session session=sessionFactory.getCurrentSession();
        Person person=session.get(Person.class,id);
        return person;
           }

    @Transactional
    public void save(Person person) throws SQLException {
        Session session=sessionFactory.getCurrentSession();
        session.persist(person);

           }
    @Transactional
    public void update(int id ,Person updatePerson) throws SQLException {
        Session session=sessionFactory.getCurrentSession();
        Person person=session.get(Person.class,id);
        person.setUsername(updatePerson.getUsername());


    }
    @Transactional
    public void del(int id) throws SQLException {
        Session session=sessionFactory.getCurrentSession();
        Person person=session.get(Person.class,id);
        session.remove(person);
    }

    /////////////
    /// Test Batch
    /////////////

//    public void testMultipleUpdate(){
//        List<Person> people = create1000People();
//
//        long befor=System.currentTimeMillis();
//
//        for (Person person:people){
//            jdbcTemplate.update("INSERT INTO Person VALUES (?,?)",person.getId(),person.getName());
//
//        }
//
//        long after = System.currentTimeMillis();
//
//        System.out.println("Time" + (after-befor));
//    }
//
//
//    public void testBatchUpdate(){
//        List<Person>people=create1000People();
//        long befor=System.currentTimeMillis();
//
//        jdbcTemplate.batchUpdate("INSERT INTO Person VALUES (?,?)",
//                new BatchPreparedStatementSetter() {
//                    @Override
//                    public void setValues(PreparedStatement ps, int i) throws SQLException {
//                        ps.setInt(1,people.get(i).getId());
//                        ps.setString(2,people.get(i).getName());
//                    }
//
//                    @Override
//                    public int getBatchSize() {
//                        return people.size();
//                    }
//                });
//
//        long after = System.currentTimeMillis();
//
//        System.out.println("Time" + (after-befor));
//    }

//    private List<Person> create1000People() {
//        List<Person> people = new ArrayList<>();
//
//        for (int i=0;i<1000;i++){
//            people.add(new Person(i,"Name"+i));
//        }
//        return people;
//
//    }


}
