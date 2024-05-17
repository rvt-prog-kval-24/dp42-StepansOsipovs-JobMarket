import React, {useState} from 'react';
import {useForm} from "react-hook-form";
import axios from "axios";
import '../styles/login.css';
import {Link, useNavigate} from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";


const Login = () => {

    const [username,setUsername]=useState();
    const [password,setPassword]=useState();
    const [error,setError]=useState();
    const navigate = useNavigate();
    const [decodedToken, setDecodedToken] = useState(null);

    function send() {
        console.log(username);
        setError("")
        axios.post('http://localhost:8088/api/accounts/login',{
            username: username,
            password: password
        })
            .then((response) => {


                // console.log('Success', response.data);
                localStorage.removeItem("jwt");
                localStorage.setItem("jwt",response.data['jwt-token'])
                const decodedToken = jwtDecode(localStorage.getItem("jwt"));
                console.log(decodedToken.role);
                if (decodedToken.role.includes("ROLE_ADMIN")){
                   navigate("/admin/cross");
                }else {
                    navigate("/");
                }
            })
            .catch((error) => {
                if (error.response.status === 401) {
                    setError(error.response.data.message);
                }


            });

    }

    const {
        handleSubmit,
    }=useForm({
        mode:"onBlur",

    });
    const config = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            'Content-Type': 'application/json',
        },
    };
        return (
         <div>
                <header>
                    <div className={"colored"}>
                        <h1 className={"main-header"}>IT Market<br/>Login</h1>
                    </div>
                </header>
             <div className="centered">
                <form  onSubmit={handleSubmit(send)}>
                    <h3 className={"errorMsg"}>{error}</h3>
                <label>
                    Lietotājavārds:
                    <input type="text" name="username"  onChange={e => setUsername(  e.target.value)} />
                </label>
                <label>
                    Parole:
                    <input type="password" name="password" onChange={e => setPassword(  e.target.value)} />
                </label>

                    <button type={"submit"} className="btn btn-white btn-animate">Login</button>

                    {/*<a href={}>Register now .</a>*/}
                    <Link to="/auf/reg">Reģistrēties kā lietotājs .</Link>

                    <Link to="/">Turpināt kā viesis .</Link>
                    <Link to="/auf/reg/company">Reģistrēties kā uzņēmums .</Link>
                </form>

        </div>

         </div>
        );

};

export default Login;