import React, {useEffect, useState} from 'react';
import '../styles/Demo.css';
import axios from "axios"; // Import the CSS file properly
import Badge from 'react-bootstrap/Badge';
import classes from "../styles/main.module.css";
import PostCard from "./PostCard";
import Cookies from "js-cookie";
import {Link, useNavigate} from "react-router-dom";
import Box from '@mui/material/Box';

import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const Demo = () => {
    let [posts, setPosts] = useState([]);
    const [filterOptions,setFilterOptions]=useState({
        postCity: [],
        company: [],
        postType: []
    });
    const[error,setError]=useState('');
    const[selectedFilterOptions,setSelectedFilterOptions]=useState({postCity:'',postType:'',company:'',postHeader:''})
    const cookieExists = Cookies.get('cookieName') === undefined;
    const [nameFromCookie,setNameFromCookie]=useState('');
    const [showFilter, setShowFilter] = useState(false);
    const navigate = useNavigate();
    const [showAlert, setShowAlert] = useState(false);
    const [isAuth ,setIsAuth]=useState(false);
    const toggleForm = () => {
        setShowFilter(!showFilter); // Инвертируем значение showForm при каждом нажатии на кнопку
    };
    function selectProducts(){
        axios.get('http://localhost:8088/post/getHeaders' )
            .then(response => {
                setPosts([]);
                setPosts(response.data);

            })

    }

    function addPost(){
        if (localStorage.getItem("jwt"))
        {
            navigate("/private/addPost");
        }
        else handleOpen();
    }



    const handleReset = () => {
        window.location.reload();

    }

    function selectDataForFilter(){
        setNameFromCookie(Cookies.get("userName"));
        axios.get('http://localhost:8088/post/dataForSwitch' )
            .then(response => {
                setFilterOptions(response.data);
            })

    }
    function goToLogin(){
        navigate("/auf/log");
    }

    function getDataWithFilter(){
        setError(null);
        axios.post('http://localhost:8088/post/filter',selectedFilterOptions )
            .then(response => {
                setPosts([]);
                setPosts(response.data);
            })
            .catch((error) => {
                if (error.response.status === 404) {
                    setError(error.response.data);
                }
            });
    }
    const enlargedStyle = {
        fontSize: '2em', // Изменение размера смайлика
    };
    useEffect(() => {
        selectProducts();
        selectDataForFilter();
        // if (localStorage.getItem("jwt")){
        //     setIsAuth(true);
        // }
        checkAuth();

    }, []);
    // useEffect(() => {
    //     const reloadCount = sessionStorage.getItem('reloadCount') || 0;
    //     if (reloadCount < 2) {
    //         sessionStorage.setItem('reloadCount', Number(reloadCount) + 1);
    //         window.location.reload();
    //     } else {
    //         selectProducts();
    //         selectDataForFilter();
    //         checkAuth();
    //     }
    //
    //     // Обнуление счетчика при уходе с роутера
    //     return () => {
    //         sessionStorage.setItem('reloadCount', 0);
    //     };
    // }, []);
    function checkAuth(){
        if (localStorage.getItem("jwt")){
            setIsAuth(true);
        }
    }

    function logout()
    {
        localStorage.clear("jwt");
        Cookies.remove("userID");
        Cookies.remove("userName");
        window.location.reload();

    }


    function addPostAsUser()
    {
        navigate("/private/addPost");
    }

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const style = {
        position: 'absolute' ,
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };
    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Atvainojiet.
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Lai veiktu šo darbību, jums ir jāpiesakās.
                        <div className="button-container text-box">

                            <button onClick={goToLogin} className=" btn-white ">Ieiet</button>
                            <button onClick={handleClose} className=" btn-white ">Atcelt</button>

                        </div>
                    </Typography>
                </Box>
            </Modal>
            <header style={{borderRadius:'40px'}}>
                {/*<div className={"colored"}>*/}
                    <h1 className={"main-header"}>IT Market</h1>
                {/*</div>*/}
                {/*<nav>*/}
                {/*    <ul style={{marginTop:'3%'}}>*/}
                {/*        /!*<button onClick={addPost} className="btn btn-blue btn-animate">Post a job</button>*!/*/}

                {/*    </ul>*/}
                {/*</nav>*/}
                {/*<div className="search-container">*/}

                {/*  <label>*/}
                {/*      <h5>*/}
                {/*          <Badge bg="secondary">FIND BY KEYWORD</Badge>*/}
                {/*      </h5>*/}

                {/*  </label>*/}
                {/*    <input  onChange={e => setSelectedFilterOptions({...selectedFilterOptions, postHeader: e.target.value})} type="text" placeholder="Keyword" />*/}
                {/*</div>*/}
                {/*{showFilter && (*/}
                    <div className="search-container">
                        <label>
                            <h5>
                                <Badge bg="secondary">Atrast pēc atslēgvārda</Badge>
                            </h5>

                        </label>
                        <input style={{width:'15%'}} onChange={e => setSelectedFilterOptions({
                            ...selectedFilterOptions,
                            postHeader: e.target.value
                        })} type="text" placeholder="Atslēgvārds"/>
                        <select
                            defaultValue={"default"}
                            onChange={e => setSelectedFilterOptions({
                                ...selectedFilterOptions,
                                postType: e.target.value
                            })}
                        >

                            <option value=''>Darba tips</option>
                            {filterOptions.postType.map((postType, index) =>
                                <option value={postType} key={postType}> {postType}</option>
                            )}
                        </select>
                        <select
                            onChange={e => setSelectedFilterOptions({
                                ...selectedFilterOptions,
                                company: e.target.value
                            })}
                            defaultValue={"default"}
                        >
                            <option value="">Uzņēmums</option>

                            {filterOptions.company.map((company, index) =>
                                <option value={company} key={company}> {company}</option>
                            )}
                        </select>
                        <select
                            onChange={e => setSelectedFilterOptions({
                                ...selectedFilterOptions,
                                postCity: e.target.value
                            })}
                            defaultValue={"default"}
                        >
                            {/*{ filterOptions.postCity.map((city, index) => <p key={index}>{city}</p>)}*/}
                            <option value="">Pilsēta</option>


                            {filterOptions.postCity.map((city, index) =>
                                <option value={city} key={city}> {city}</option>
                            )}
                        </select>

                        {/*<button style={{borderRadius: '30px'}} onClick={handleReset}*/}
                        {/*        className="btn btn-blue btn-animate">Clear*/}
                        {/*    filter*/}
                        {/*</button>*/}
                    </div>

                {/*)}*/}
                <button style={{borderRadius: '30px'}} onClick={handleReset} className="btn btn-blue btn-animate">Notirīt
                </button>

                {error ?
                    <p><h2>{error.message}</h2>      <span role="img" aria-label="sad" style={enlargedStyle}>😔</span>
                    </p> : <p></p>}

            </header>
            <div className="button-container text-box">

                <button style={{borderRadius: '30px'}} onClick={getDataWithFilter} className="btn btn-white btn-animate">
                    Atrast
                </button>
                {/*<button style={{borderRadius: '30px'}} onClick={addPost} className="btn btn-white btn-animate">*/}
                {/*    Post a job*/}
                {/*</button>*/}


            </div>

            <main>


                <div className={classes.productList}>
                    <h3>
                        <Badge bg="info">Pedējie sludinājumi </Badge>
                    </h3>
                    {posts.length ?
                        posts.map((post) =>
                            <PostCard key={post.id} id={post.id} post_header={post.post_header} salary={post.salary}
                                      post_type={post.post_type} company={post.company}/>
                        )
                        :
                        <p> List is empty</p>
                    }
                </div>
            </main>
            <hr/>
        </div>
    );
};

export default Demo;
