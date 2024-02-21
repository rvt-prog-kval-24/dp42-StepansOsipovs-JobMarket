import React, {useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import {useForm} from "react-hook-form";

const Registration = () => {
    const [username,setUsername]=useState();
    const [password,setPassword]=useState();
    const [error,setError]=useState();
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});




    function send() {

        axios.post('http://localhost:8088/api/accounts/reg',{
            username: username,
            password: password
        })
            .then((response) => {


                console.log('Success', response.data);
                localStorage.removeItem("jwt");
                localStorage.setItem("jwt",response.data['jwt-token'])

                navigate("/");

            })
            .catch((error) => {


                if (error.response && error.response.status === 400) {

                    const validationErrors = error.response.data;
                    setErrors(validationErrors);
                    console.log('Validation error:', validationErrors);
                } else {
                    console.error('Error:', error);
                }
            });

    }

    const {
        handleSubmit,
    }=useForm({
        mode:"onBlur",

    });





    return (
        <div>
            <header>
                <div className={"colored"}>
                    <h1 className={"main-header"}>IT Market<br/>Registration</h1>
                </div>
            </header>
            <div className="centered">
                <form  onSubmit={handleSubmit(send)}>
                    <h3 className={"errorMsg"}>{error}</h3>
                    <label>
                        Username:
                        <input type="text" name="username"  onChange={e => setUsername(  e.target.value)} />
                        {errors.length ?
                            errors.map((error) => {
                                if (error.field === 'username') {
                                    return <div  className="error">{error.error}</div>;
                                }


                            }):
                            <div></div>}
                    </label>
                    <label>
                        Password:
                        <input type="password" name="password" onChange={e => setPassword(  e.target.value)} />
                        {errors.length ?
                            errors.map((error) => {
                                if (error.field === 'password') {
                                    return <div  className="error">{error.error}</div>;
                                }


                            }):
                            <div></div>}
                    </label>

                    <button type={"submit"} className="btn btn-white btn-animate">Register</button>

                </form>

            </div>

        </div>
    );
};

export default Registration;