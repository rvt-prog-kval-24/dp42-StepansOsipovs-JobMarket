import React, {useEffect} from 'react';
import {Route, Routes, useNavigate} from "react-router-dom";
import Demo from "../Components/Demo";
import axios from "axios";
import Edit from "../Components/Edit";
import AddPost from "../Components/AddPost";
import Cookies from 'js-cookie';
import Registration from "../authorization/Registration";
import Test from "../Components/Test";
import AddPostByUser from "../actionWithPost/AddPostByUser";
import TestMain from "../Components/TestMain";
import Header from "../base/Header";
import Apply from "../Components/Apply";

const UserRoutes = () => {
    const now = new Date();
    const expiresAt = new Date(now.getTime() + 100 * 60 * 1000);
    const navigate = useNavigate();
    const config = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            'Content-Type': 'application/json',
        },
    };
    function findJwt(){
       // localStorage.clear();
       // localStorage.setItem("jwt","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c");
        axios.post('http://localhost:8088/api/accounts/validateJWT',{},config)
            .then((response) => {
               // Cookies.remove('userName');
                Cookies.set('userID',response.data.id, { expires: expiresAt, path: '/' });
                Cookies.set('userName', response.data.username, { expires: expiresAt, path: '/' });
                console.log(Cookies.get('userName'));
                // console.log('Success', response.data);
              //  localStorage.setItem("jwt",response.data)

            })
            .catch((error) => {
                if (error.response.status === 401||error.response.status===403) {
                    navigate("/auf/log")
                }


            });
    }

    useEffect(() => {
        findJwt();
    }, []);


    return (
        <div>
            <Header/>
            <Routes>
                <Route path="/addPost" element={<AddPostByUser/>}/>
                <Route path="/apply" element={<Apply/>}/>
                {/*<Route path="/demo" element={<Demo/>}/>*/}
                <Route path="/edit/:id" element={<Edit/>}/>

            </Routes>
        </div>
    );
};

export default UserRoutes;