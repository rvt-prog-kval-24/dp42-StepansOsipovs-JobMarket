import React, {useEffect, useState} from 'react';
import axios from "axios";
import PostCard from "./PostCard";
import selections from "../styles/Selections.module.css"
//import classes from "./Posts.module.css";
import classes from "../styles/main.module.css"
import {Link, useNavigate} from "react-router-dom";
import {useContext} from "react";
import {Loading} from "../context";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import 'bootstrap/dist/css/bootstrap.min.css';
import {useForm} from "react-hook-form";

import image from "../images/11-komoz-3att.png"

//get products
const Test = function () {
    const [testId,setTestId]=useState()
    const [posts,setPost]=useState({owner:{id:null},post_header:'',post_city:'',
        post_type:'Remote',posts_start_day:'',posts_end_day:'',post_contactPhone:'',post_email:'',salary:'',company:''});
    const navigate = useNavigate();
    const [valid,setValid]=useState(null);
    const [people,setPeople]=useState({});
    const [workTypes,setworkTypes]=useState([])
    const [errors, setErrors] = useState({});
    const [minEndDate, setMinEndDate] = useState('');
    const [selaryError,setselaryError]=useState('');
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const todaysDate = year + '-' + month + '-' + day;



    const nextMonth = new Date(today);
    nextMonth.setMonth(today.getMonth() + 1);
    const year_nextMonth = nextMonth.getFullYear();
    const month_nextMonth = String(nextMonth.getMonth() + 1).padStart(2, '0');
    const day_nextMonth = String(nextMonth.getDate()).padStart(2, '0');
    const maxDate = year_nextMonth + '-' + month_nextMonth + '-' + day_nextMonth;

    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const handleStartDateChange = (e) => {
        const selectedDate = new Date(e.target.value);
        const selectedDate2 = new Date(e.target.value);
        selectedDate.setDate(selectedDate.getDate() + 1); // Добавляем один день к начальной дате
        const formattedDate = formatDate(selectedDate);

        setPost({
            ...posts,
            posts_start_day: formatDate(selectedDate2),
        });

        // Устанавливаем минимальное значение для posts_end_day на один день больше posts_start_day
        setMinEndDate(formattedDate);
    };



    const [data, setData] = useState([]);
    const [newTitle, setNewTitle] = useState('');
    const [newBody, setNewBody] = useState('');

    const username = 'TestName';
    const password = 'TestPassword';
    const config = {
        headers: {
            Authorization: `Basic ${btoa(`${username}:${password}`)}`,
        },
    };
    const handleAddItem = () => {
        const newItem = { title: newTitle, body: newBody };
        setData([...data, newItem]);
        setNewTitle('');
        setNewBody('');
    }

    const {
        handleSubmit,
    }=useForm({
        mode:"onBlur",

    });
    useEffect(()=> {

        getWorkType();

    },[]);

    function findUser(user){

        axios.get('http://localhost:8088/api/accounts/getUsersByName?name='+user)
            .then(response => {
                setPeople(response.data);

            });
    }
    function getWorkType(){
        axios.get('http://localhost:8088/post/getWorkType',config)
            .then(response => {
                setworkTypes(response.data);

            });
    }

    function add(){
        axios.post(`http://localhost:8088/post/save`, posts)
            .then((response) => {


                console.log('Success', response.data);
                navigate("/");

            })
    }

    function save(){
        const test={posts,data}
        console.log(test);
        axios.post(`http://localhost:8088/post/save`, test,config)
            .then((response) => {


                console.log('Success', response.data);
                // navigate("/");

           })
    }
    function validate() {
        setselaryError('');
        setErrors({});

        console.log(posts);
        axios.post(`http://localhost:8088/post/validate`,posts)
            .then((response) => {


                console.log('Success', response.data);
                setValid(true);

            })
            .catch((error) => {
                if (error.response.status === 409) {
                    // Другая ошибка, например, конфликт
                    setselaryError(error.response.data);
                    // Здесь обработка других типов ошибок
                    setValid(false);
                }

                if (error.response && error.response.status === 400) {

                    const validationErrors = error.response.data;
                    setErrors(validationErrors);
                    console.log('Validation error:', validationErrors);
                    setValid(false);

                } else {
                    console.error('Error:', error);
                    setValid(false);

                }
            });

    }



    return (

        <div>
            <header>
                <div className={"colored"}>
                    <h1 className={"main-header"}>IT Market</h1>
                </div>

            <div className={selections.wrapper}>
                <div className={selections.mainContent}>



                        {valid!==true ?
                            <button disabled={true} onClick={save} >Save</button>
                            :
                            <button onClick={save} >Save</button>
                        }




                    <hr/>
                    <div className={classes.product} >
                        <div className={classes.circle}>
                            <img src={image}/>
                        </div>

                        <div className={classes.content}>
                            <h4>{posts.post_header},{posts.post_type}</h4>
                            <hr/>
                            <h4>Salary: {posts.salary}$</h4>
                            <h5>This post is shared by {posts.company}</h5>

                        </div>

                    </div>
                    <label><h3>Page example</h3></label>
                    <div className={classes.pageExample}>

                        <h3>{posts.post_header}</h3>
                        <h4>Work type {posts.post_type},{posts.post_city}</h4>
                        <h4>Izvietots līdz {posts.posts_end_day}</h4>
                        <h4>Post is published by {posts.company}</h4>
                        <hr/>
                        <ul>
                            {data.map((item, index) => {
                            return (
                                <li key={index}>
                                    <h3>{item.title}</h3>
                                    <h4>{item.body}</h4>

                                </li>

                            );
                            })}
                        </ul>
                        <hr/>
                        <h3>Contact information </h3>
                        <h4>Email {posts.post_email}</h4>
                        <h4>Phone {posts.post_contactPhone}</h4>
                    </div>
                </div>

                <div className={selections.leftSection}>
                    <div>
                        <h3>Mandatory information</h3>

                        <form onSubmit={handleSubmit(validate)}>

                            <label form='owner'>Owner</label>
                            <input id='owner' type="text"   onChange={e => findUser( e.target.value)}/>
                            <select

                                id="Owner"
                                onClick={e => setPost({
                                    ...posts,
                                    owner: {
                                        ...posts.owner,
                                        id: e.target.value
                                    }
                                })}
                            >


                                {people.length ?
                                    people.map((item) => (
                                        <option value={item.id} key={item.id}>{item.id}) {item.name}</option>
                                    ))
                                    :
                                    <option>Empty list</option>
                                }
                            </select>
                            {errors.length ?
                                errors.map((error) => {
                                    if (error.field === 'owner') {
                                        return <div  className="error">{error.error}</div>;
                                    }


                                }):
                                <div></div>}

                            <hr/>
                            <label form='city'>City</label>
                            <input id='city' type="text"   onChange={e => setPost({...posts, post_city: e.target.value})}/>
                            {errors.length ?
                                errors.map((error, index) => {
                                    if (error.field === 'post_city') {
                                        return <div key={index} className="error">{error.error}</div>;
                                    }


                                }):
                                <div></div>}
                            <hr/>
                            <label form='phone'>Phone</label>
                            <input id='phone' type='text'   onChange={e => setPost({...posts, post_contactPhone: e.target.value})}/>
                            {errors.length ?
                                errors.map((error, index) => {
                                    if (error.field === 'post_contactPhone') {
                                        return <div key={index} className="error">{error.error}</div>;
                                    }


                                }):
                                <div></div>}
                            <hr/>
                            <label form='email'>Email</label>
                            <input id='email' type='text'  onChange={e => setPost({...posts, post_email: e.target.value})} />
                            {errors.length ?
                                errors.map((error, index) => {
                                    if (error.field === 'post_email') {
                                        return <div key={index} className="error">{error.error}</div>;
                                    }


                                }):
                                <div></div>}
                            <hr/>
                            <label form='header'>Header</label>
                            <input id='header' type='text'  onChange={e => setPost({...posts, post_header: e.target.value})}/>
                            {errors.length ?
                                errors.map((error, index) => {
                                    if (error.field === 'post_header') {
                                        return <div key={index} className="error">{error.error}</div>;
                                    }


                                }):
                                <div></div>}
                            <hr/>


                            <label form='post_type'>What type of work </label>
                            <select
                                defaultValue="Remote" // Установите значение по умолчанию здесь

                                id="WorkType"
                                value={posts.post_type}
                                onChange={e => setPost({...posts, post_type: e.target.value})}
                            >
                                {/*<option value="" disabled>Type filter</option>*/}

                                {workTypes.length ?
                                    workTypes.map((item, index) => (
                                        <option key={index}>{item}</option>
                                    ))
                                    :
                                    <option>Empty type</option>
                                }

                            </select>
                            {errors.length ?
                                errors.map((error, index) => {
                                    if (error.field === 'post_type') {
                                        return <div key={index} className="error">{error.error}</div>;
                                    }


                                }):
                                <div></div>}
                            <hr/>
                            <label form='posts_start_day'>Post release day</label>
                            <input id='posts_start_day' type='date'  min={todaysDate}  onChange={ handleStartDateChange}/>
                            {errors.length ?
                                errors.map((error, index) => {
                                    if (error.field === 'posts_start_day') {
                                        return <div key={index} className="error">{error.error}</div>;
                                    }


                                }):
                                <div></div>}
                            <hr/>
                            <label form='posts_end_day'>Post die day</label>
                            <input id='posts_end_day' type='date'  min={minEndDate} max={maxDate}  onChange={e => setPost({...posts, posts_end_day: e.target.value})}/>
                            {errors.length ?
                                errors.map((error, index) => {
                                    if (error.field === 'posts_end_day') {
                                        return <div key={index} className="error">{error.error}</div>;
                                    }


                                }):
                                <div></div>}
                            <hr/>
                            <label form='salary'>Salary</label>
                            <input id='salary' type="text"   onChange={e => setPost({...posts, salary: e.target.value})}/>
                            {errors.length ?
                                errors.map((error, index) => {
                                    if (error.field === 'salary') {
                                        return <div key={index} className="error">{error.error}</div>;
                                    }


                                }):
                                <div></div>}
                            {selaryError!=='' ?
                                <p>{selaryError}</p>
                                :
                                <div></div>}
                            <hr/>

                            <label form='company'>Company</label>
                            <input id='company' type="text"   onChange={e => setPost({...posts, company: e.target.value})}/>
                            {errors.length ?
                                errors.map((error, index) => {
                                    if (error.field === 'company') {
                                        return <div key={index} className="error">{error.error}</div>;
                                    }


                                }):
                                <div></div>}
                            <hr/>
                            {valid===true?
                                <h3>Validation success</h3>
                            :
                            <div></div>}
                            <button   type="submit" >Apply</button>
                        </form>
                        <br/>

                    </div>
                </div>
                <div className={selections.rightSection}>

                    <label >Topic</label>
                    <input  type="text"
                            placeholder="Key"
                            value={newTitle}
                            onChange={(e) => setNewTitle(e.target.value)}/>
                    <hr/>
                    <label>Body</label>
                    <textarea rows="20" cols="45" name="text" type="text"
                              placeholder="Value"
                              value={newBody}
                              onChange={(e) => setNewBody(e.target.value)}/>
                    <button onClick={handleAddItem}>Добавить</button>

                </div>
            </div>
            </header>
        </div>
    );
}



export default Test;
