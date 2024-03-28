import React, {useEffect} from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import Demo from "../Components/Demo";
import axios from "axios";
import Crossroads from "../Admin/Crossroads";
import AdminMain from "../Admin/AdminMain";
import Header from "../base/Header";

const AdminRoutes = () => {


    function findJwt(){
      //  localStorage.clear();
      //  localStorage.setItem("jwt","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c");
      //   axios.post('http://localhost:8088/api/accounts/validateJWT',localStorage.getItem("jwt"))
      //       .then((response) => {
      //
      //
      //           console.log('Success', response.data);
      //           localStorage.setItem("jwt",response.data)
      //
      //       })
      //       .catch((error) => {
      //           if (error.response.status === 401) {
      //
      //               navigate("/public/login")
      //           }
      //
      //
      //       });
    }

    useEffect(() => {
      //  findJwt();
    }, []);
    return (
        <div>
            <Header/>
            <Routes>
                <Route path="/demo" element={<Demo/>}/>
                <Route path="/cross" element={<Crossroads/>}/>
                <Route path="/main" element={<AdminMain/>}/>
            </Routes>
        </div>
    );
};

export default AdminRoutes;