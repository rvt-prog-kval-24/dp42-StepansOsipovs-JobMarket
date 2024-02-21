import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Posts from "../pages/Posts";
import AddPost from "../Components/AddPost";
import Test from "../Components/Test";
import Show from "../Components/Show";
import Edit from "../Components/Edit";
import Demo from "../Components/Demo";
import Login from "../authorization/Login";
import Registration from "../authorization/Registration";

const GuestRoutes = () => {
    return (
        <div>


                <Routes>
                    <Route path="/show/:id" element={<Show/>}/>
                    <Route path={"/test"} element={<Test/>}/>
                    <Route path="/demo" element={<Demo/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/" element={<Posts/>}/>
                    <Route path="/register" element={<Registration/>}/>
                </Routes>



        </div>
    );
};

export default GuestRoutes;