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
import TestMain from "../Components/TestMain";
import Header from "../base/Header";

const GuestRoutes = () => {
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

                </Routes>



        </div>
    );
};

export default GuestRoutes;