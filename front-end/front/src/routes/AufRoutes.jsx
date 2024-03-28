import React from 'react';
import {Route, Routes} from "react-router-dom";
import AddPostByUser from "../actionWithPost/AddPostByUser";
import Edit from "../Components/Edit";
import Login from "../authorization/Login";
import Registration from "../authorization/Registration";

const AufRoutes = () => {
    return (
        <div>
            <Routes>

                <Route path="/log" element={<Login/>}/>
                <Route path="/reg" element={<Registration/>}/>

            </Routes>
        </div>
    );
};

export default AufRoutes;