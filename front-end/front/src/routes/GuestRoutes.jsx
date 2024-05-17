import React, {useEffect} from 'react';
import {BrowserRouter, Route, Routes, useNavigate} from "react-router-dom";
import Posts from "../pages/Posts";
import AddPost from "../Components/AddPost";
import Test from "../Components/Test";
import Show from "../Components/Show";
import Edit from "../Components/Edit";
import Demo from "../Components/Demo";
import Login from "../authorization/Login";
import Registration from "../authorization/Registration";
import TestMain from "../Components/TestMain";
import Header from "../base/Header";
import axios from "axios";
import Cookies from "js-cookie";
import Statistic from "../Components/Statistic";



const GuestRoutes = () => {
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
                Cookies.set('role', response.data.roles[0].name, { expires: expiresAt, path: '/' });
                console.log(Cookies.get('userName'));
            })
            .catch((error) => {

            });
    }

    useEffect(() => {
        findJwt();
    }, []);
    return (
        <div>
                <Header/>
                <Routes>
                    <Route path="/" element={<Demo/>} />
                    <Route path="/show/:id" element={<Show/>}/>
                    <Route path={"/test"} element={<Test/>}/>
                    <Route path="/demo" element={<Demo/>}/>
                    <Route path="/" element={<Posts/>}/>
                    <Route path="/mainTest" element={<TestMain/>}/>
                    <Route path="/stats" element={<Statistic/>}/>
                </Routes>
        </div>
    );
};

export default GuestRoutes;