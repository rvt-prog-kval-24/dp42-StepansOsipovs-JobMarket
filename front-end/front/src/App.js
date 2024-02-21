import React, {useEffect, useState} from 'react';
//import  "./styles/main.module.css"

import {BrowserRouter, Navigate, Route, Routes, useNavigate} from "react-router-dom";
import Posts from "./pages/Posts";
import AddProduct from "./pages/AddProduct";
import {Loading} from "./context";

import Show from "./Components/Show";
import Edit from "./Components/Edit";
import AddPost from "./Components/AddPost";
import Test from "./Components/Test";
import Demo from "./Components/Demo";
import Login from "./authorization/Login";
import axios from "axios";
import GuestRoutes from "./routes/GuestRoutes";
import UserRoutes from "./routes/UserRoutes";
import AdminRoutes from "./routes/AdminRoutes";

function App() {


const [loading,setLoading]=useState(false);
//const navigate = useNavigate();

// function findJwt(){
//     localStorage.clear();
//     localStorage.setItem("jwt","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c");
//     axios.post('http://localhost:8088/api/accounts/validateJWT',localStorage.getItem("jwt"))
//         .then((response) => {
//
//
//             console.log('Success', response.data);
//             localStorage.setItem("jwt",response.data)
//
//         })
//         .catch((error) => {
//             if (error.response.status === 401) {
//
//             <Navigate to="/login"/>
//             }
//
//
//         });
// }
//
//     useEffect(() => {
//         findJwt();
//     }, []);


  return (
      <div className='App'>

          {/*<Loading.Provider value={{*/}
          {/*    loading,*/}
          {/*    setLoading*/}
          {/*}}>*/}
        <BrowserRouter >

         <Routes >

             <Route path="/" element={<Demo/>} />
             <Route path="/public/*" element={<GuestRoutes />} />

             <Route path="/admin/*" element={<AdminRoutes/>} />

             <Route path="/private/*" element={<UserRoutes />} />
         </Routes>


        </BrowserRouter>
          {/*</Loading.Provider>*/}
      </div>
  );
}

export default App;
