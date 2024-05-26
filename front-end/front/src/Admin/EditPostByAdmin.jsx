import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {useForm} from "react-hook-form";
import axios from "axios";
import {Editor} from "@tinymce/tinymce-react";
import Button from "react-bootstrap/Button";

const EditPostByAdmin = () => {
    const {postId}=useParams()
    const {id}=useParams()
    const [posts,setPost]=useState({postID:'',post_header:'',post_city:'',
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
    const [editorValue, setEditorValue] = useState('');



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



    let [data, setData] = useState([]);
    const [newTitle, setNewTitle] = useState('Q');
    const [newBody, setNewBody] = useState(' ');
    const handleAddItem = () => {

        // newBody=newBody.match(/.{1,20}/g) || [];

        const newItem = { title: newTitle, body: newBody };


        setData([...data, newItem]);


    }

    const {
        handleSubmit,
    }=useForm({
        mode:"onBlur",

    });
    useEffect(()=> {


        axios.get(`http://localhost:8088/post/${id}`)
            .then(response => {
                const p =response.data

                if (!p.postAtributes || p.postAtributes.length === 0) {
                    p.postAtributes = [{ id: '', title: '', body: '' }];
                }


                setPost(p);
                setNewBody(response.data.postAtributes[0].body)
                setPost({...p,id:postId})
                setEditorValue(response.data.postAtributes ? response.data.postAtributes.body : '');
            })
            .catch(error => console.error('Ошибка загрузки данных поста:', error));



        getWorkType();
        // setPost({owner:{id:Cookies.get('userID')},post_header:'',post_city:'',
        //     post_type:'Remote',posts_start_day:'',posts_end_day:'',post_contactPhone:'',post_email:'',salary:'',company:''});
    },[]);

    function deleteProducts() {
        axios.post(`http://localhost:8088/post/del/${id}`)
            .then(response => {
                if (response.status === 200) {
                    navigate("/admin/editPosts")
                }
            });
    }
    function getWorkType(){
        axios.get('http://localhost:8088/post/getWorkType')
            .then(response => {
                setworkTypes(response.data);

            });
    }

    // const [newItem, setNewItem] = useState({title:'',body:''});
    function edit(){
        // handleAddItem();
        console.log(newBody)
        console.log(posts)
        posts.id = id;
        posts.postAtributes[0].body=newBody;
        // const newItem = { title: newTitle, body: newBody };
        // setNewItem({title: newTitle,body: newBody});
        // setData([...data,{title:newTitle,body: newBody}]);
        data=[{title:newTitle,body: newBody}];
        const test={posts}
        posts.owner=posts.owner.id;
        console.log(posts);
        axios.post(`http://localhost:8088/post/edit`, posts)
            .then((response) => {

                navigate('/admin/editPosts');
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
                if (error.response.status === 406) {
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

    const [file, setFile] = useState(null);

    const handleFileChange = (event) => {
        // Получаем файл из input и сохраняем его в состоянии
        setFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (file) {
            try {
                const formData = new FormData();
                formData.append('file', file);

                // Отправляем запрос на сервер
                await axios.post('http://localhost:8088/post/upload', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });

                // После успешной загрузки можно добавить обработку ответа или выполнить действия после загрузки
                console.log('Файл успешно загружен!');
            } catch (error) {
                console.error('Ошибка загрузки файла:', error);
            }
        } else {
            console.error('Файл не выбран.');
        }
    };



    return (
        <div>
            {/*<header>*/}

            {/*    /!*<div className={"colored"}>*!/*/}
            {/*    /!*    <h1 className={"main-header"}>Create Job Post</h1>*!/*/}
            {/*    /!*</div>*!/*/}

            {/*</header>*/}
            <div style={{display: 'flex',justifyContent:'center',background:'#dfe5e1'}}>

                <div  className={"section-content"}>
                    <Button variant="danger" onClick={deleteProducts}>DELETE</Button>
                    <div className="form-container" style={{marginTop: '5%', background: 'white'}}
                    >


                        <label className="required" form='city'>Atrašanas vieta</label>
                        <input id='city' type="text" value={posts.post_city}
                               onChange={e => setPost({...posts, post_city: e.target.value})}/>
                        {errors.length ?
                            errors.map((error, index) => {
                                if (error.field === 'post_city') {
                                    return <div key={index} className="error">{error.error}</div>;
                                }


                            }) :
                            <div></div>}
                        <hr/>
                        <label className="required" form='phone'>Kontakt numurs</label>
                        <input id='phone' type='text' value={posts.post_contactPhone}
                               onChange={e => setPost({...posts, post_contactPhone: e.target.value})}/>
                        {errors.length ?
                            errors.map((error, index) => {
                                if (error.field === 'post_contactPhone') {
                                    return <div key={index} className="error">{error.error}</div>;
                                }


                            }) :
                            <div></div>}
                        <hr/>
                        <label className="required" form='email'>E-pasts</label>
                        <input id='email' type='text' value={posts.post_email}
                               onChange={e => setPost({...posts, post_email: e.target.value})}/>
                        {errors.length ?
                            errors.map((error, index) => {
                                if (error.field === 'post_email') {
                                    return <div key={index} className="error">{error.error}</div>;
                                }


                            }) :
                            <div></div>}
                        <hr/>
                        <label className="required" form='header'>Virsraksts</label>
                        <input id='header' type='text' value={posts.post_header}
                               onChange={e => setPost({...posts, post_header: e.target.value})}/>
                        {errors.length ?
                            errors.map((error, index) => {
                                if (error.field === 'post_header') {
                                    return <div key={index} className="error">{error.error}</div>;
                                }


                            }) :
                            <div></div>}
                        <hr/>


                        <label className="required" form='post_type'>Darba tips</label>
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


                            }) :
                            <div></div>}
                        <hr/>
                        <label className="required" form='posts_start_day'>Sludinājuma publicēšanas diena</label>
                        <input id='posts_start_day' value={posts.posts_start_day} type='date' min={todaysDate}
                               onChange={handleStartDateChange}/>
                        {errors.length ?
                            errors.map((error, index) => {
                                if (error.field === 'posts_start_day') {
                                    return <div key={index} className="error">{error.error}</div>;
                                }


                            }) :
                            <div></div>}
                        <hr/>
                        <label className="required" form='posts_end_day'>Sludinājuma noņemšanas diena</label>
                        <input id='posts_end_day' type='date' min={minEndDate} max={maxDate} value={posts.posts_end_day}
                               onChange={e => setPost({...posts, posts_end_day: e.target.value})}/>
                        {errors.length ?
                            errors.map((error, index) => {
                                if (error.field === 'posts_end_day') {
                                    return <div key={index} className="error">{error.error}</div>;
                                }


                            }) :
                            <div></div>}
                        <hr/>
                        <label className="required" form='salary'>Alga</label>
                        <input id='salary' type="text" value={posts.salary}
                               onChange={e => setPost({...posts, salary: e.target.value})}/>
                        {errors.length ?
                            errors.map((error, index) => {
                                if (error.field === 'salary') {
                                    return <div key={index} className="error">{error.error}</div>;
                                }


                            }) :
                            <div></div>}
                        {selaryError !== '' ?
                            <p style={{color: 'red'}}>{selaryError}</p>
                            :
                            <div></div>}
                        <hr/>

                        <label className="required" form='company'>Uzņēmums</label>
                        <input id='company' type="text" value={posts.company}
                               onChange={e => setPost({...posts, company: e.target.value})}/>
                        {errors.length ?
                            errors.map((error, index) => {
                                if (error.field === 'company') {
                                    return <div key={index} className="error">{error.error}</div>;
                                }


                            }) :
                            <div></div>}
                        <hr/>

                        {valid === true ?
                            <h3 style={{color: 'green'}}>Kļūdu nav</h3>
                            :
                            <div></div>}
                        <label form='editor'>Saturs</label>
                        <Editor
                            id='editor'
                            value={newBody}
                            onEditorChange={(newValue, editor) => setNewBody(newValue)}
                            init={{
                                height: 500,
                                menubar: false,
                                branding: false,
                                plugins: 'lists',
                                toolbar: [
                                    {name: 'history', items: ['undo', 'redo', 'bold', 'italic', 'underline']},
                                    {
                                        name: 'alignment',
                                        items: ['alignleft', 'aligncenter', 'alignright', 'alignjustify', 'outdent', 'indent']
                                    },
                                    {name: 'lists', items: ['bullist', 'numlist']},
                                ],

                            }}
                        />

                        {valid === true ?
                            <div style={{display: 'flex', justifyContent: 'center'}}>
                                <button onClick={edit}>Saglabāt</button>
                            </div> :
                            <div></div>}
                        <div style={{display: 'flex', justifyContent: 'center'}}>
                            <button onClick={validate}>Pārbaudīt</button>
                        </div>
                    </div>

                </div>


            </div>

        </div>
    );
};

export default EditPostByAdmin;