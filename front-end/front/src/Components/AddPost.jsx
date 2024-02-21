import React, {useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {useForm} from "react-hook-form";
import classes from "../styles/main.module.css";

const AddPost = () => {
    // const {id}=useParams();
    const [posts,setPost]=useState({owner:{id:null},post_header:'',post_body:'',post_city:'',
        post_type:'',posts_start_day:'',posts_end_day:'',
        post_requirements:'',post_offer:'',post_contactPhone:'',post_email:'',salary:'',company:'',extra_info:''});
    const navigate = useNavigate();
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


    const {
        handleSubmit,
    }=useForm({
        mode:"onBlur",

    });
    useEffect(()=> {

        getWorkType();

    },[]);

    function findUser(user){

        axios.get('http://localhost:8088/people/getUsersByName?name='+user)
            .then(response => {
                setPeople(response.data);

            });
    }
    function getWorkType(){
        axios.get('http://localhost:8088/post/getWorkType')
            .then(response => {
                setworkTypes(response.data);

            });
    }
    function save() {
        setselaryError('');

        console.log(posts);
        axios.post(`http://localhost:8088/post/save`, posts)
            .then((response) => {


                    console.log('Success', response.data);
                    navigate("/");

            })
            .catch((error) => {
                if (error.response.status === 406) {
                    // Другая ошибка, например, конфликт
                    setselaryError(error.response.data);
                    // Здесь обработка других типов ошибок
                }

                if (error.response && error.response.status === 400) {

                    const validationErrors = error.response.data;
                    setErrors(validationErrors);
                    console.log('Validation error:', validationErrors);
                } else {
                    console.error('Error:', error);
                }
            });

    }


    return (
        <div>

                <button ><Link to='/'>Back</Link></button>

            <form onSubmit={handleSubmit(save)}>
                <label form='body'>Post body</label>
                <input id='body' type="text"     onChange={e => setPost({...posts, post_body: e.target.value})}/>
                {errors.length ?
                    errors.map((error, index) => {
                        if (error.field === 'post_body') {
                            return <div key={index} className="error">{error.error}</div>;
                        }


                    }):
                    <div></div>}
                <hr/>
                <label form='owner'>Owner</label>
                <input id='owner' type="text"   onChange={e => findUser( e.target.value)}/>
                <select
                    
                    id="Owner"
                    onChange={e => setPost({...posts, owner:{id: e.target.value}})}
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
                <label form='offer'>What are you offering?</label>
                <input id='offer' type='text'  onChange={e => setPost({...posts, post_offer: e.target.value})}/>
                {errors.length ?
                    errors.map((error, index) => {
                        if (error.field === 'post_offer') {
                            return <div key={index} className="error">{error.error}</div>;
                        }


                    }):
                    <div></div>}
                <hr/>
                <label form='post_requirements'>What do you expect?</label>
                <input id='post_requirements' type='text'  onChange={e => setPost({...posts, post_requirements: e.target.value})}/>
                {errors.length ?
                    errors.map((error, index) => {
                        if (error.field === 'post_requirements') {
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
                <label form='extra_info'>Extra info (max 60 symbols)</label>
                <input id='extra_info' type="text"   onChange={e => setPost({...posts, extra_info: e.target.value})}/>
                {errors.length ?
                    errors.map((error, index) => {
                        if (error.field === 'extra_info') {
                            return <div key={index} className="error">{error.error}</div>;
                        }


                    }):
                    <div></div>}
                <hr/>
                <button   type="submit" >Save</button>
            </form>
            <br/>

        </div>
    );
};

export default AddPost;