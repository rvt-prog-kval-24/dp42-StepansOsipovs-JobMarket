import React, {useEffect} from 'react';
import {Route, Routes, useNavigate} from "react-router-dom";
import Login from "../authorization/Login";
import Registration from "../authorization/Registration";
import RegCompany from "../authorization/RegCompany";
import CompanyMain from "../company/CompanyMain";
import Header from "../base/Header";
import CompanyHeader from "../base/CompanyHeader";
import axios from "axios";
import Cookies from "js-cookie";
import Edit from "../Components/Edit";
import EditUserPost from "../profile/EditUserPost";
import Statistic from "../Components/Statistic";
import CompanyProfil from "../company/CompanyProfil";
import Atsauksmes from "../profile/Atsauksmes";
import CompanyAtsauksmes from "../company/CompanyAtsauksmes";
import AddPostByUser from "../actionWithPost/AddPostByUser";

const CompanyRoutes = () => {
    const now = new Date();
    const expiresAt = new Date(now.getTime() + 60 * 60 * 1000);  // Добавляет 1 час к текущему времени
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
            })
            .catch((error) => {
                if (error.response.status === 401||error.response.status===403||error.response.status===400) {
                    navigate("/auf/log")
                }
            });
    }
    // const findJwt = async () => {
    //     try {
    //         const response = await axios.post('http://localhost:8088/api/accounts/validateJWT', {}, config);
    //         Cookies.set('userID', response.data.id, { expires: expiresAt, path: '/' });
    //         Cookies.set('userName', response.data.username, { expires: expiresAt, path: '/' });
    //         console.log(Cookies.get('userName'));
    //         console.log(Cookies.get('userID'));
    //     } catch (error) {
    //         if (error.response.status === 401 || error.response.status === 403 || error.response.status === 400) {
    //             navigate("/auf/log");
    //         }
    //     }
    // };
    useEffect(() => {
        findJwt();
    }, []);
    return (
        <div>
            <CompanyHeader/>
            <Routes>
                <Route path="/addPost" element={<AddPostByUser/>}/>
                <Route path="account/:id" element={<CompanyProfil/>}/>
                <Route path="/stats" element={<Statistic/>}/>
                <Route path="/" element={<CompanyMain/>}/>
                <Route path="/edit/:id" element={<Edit/>}/>
                <Route path=":id/edit/:postId" element={<EditUserPost/>}/>
                <Route path="account/:id/:Uid/waitingAnswer" element={<CompanyAtsauksmes/>}/>
            </Routes>
        </div>
    );
};

export default CompanyRoutes;