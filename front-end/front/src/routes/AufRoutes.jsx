import React from 'react';
import {Route, Routes} from "react-router-dom";
import AddPostByUser from "../actionWithPost/AddPostByUser";
import Edit from "../Components/Edit";
import Login from "../authorization/Login";
import Registration from "../authorization/Registration";
import RegCompany from "../authorization/RegCompany";

const AufRoutes = () => {
    return (
        <div>
            <Routes>

                <Route path="/log" element={<Login/>}/>
                <Route path="/reg" element={<Registration/>}/>
                <Route path="/reg/company" element={<RegCompany/>}/>

            </Routes>
        </div>
    );
};

export default AufRoutes;