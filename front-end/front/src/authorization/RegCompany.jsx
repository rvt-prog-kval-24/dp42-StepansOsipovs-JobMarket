import React, {useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import {useForm} from "react-hook-form";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";

const RegCompany = () => {
    const [username,setUsername]=useState();
    const [password,setPassword]=useState();
    const [error,setError]=useState();
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});




    function send() {

        axios.post('http://localhost:8088/api/accounts/regCompany',{
            username: username,
            password: password
        })
            .then((response) => {


                console.log('Success', response.data);
                localStorage.removeItem("jwt");
                localStorage.setItem("jwt",response.data['jwt-token'])

                navigate("/company");

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
                    <h1 className={"main-header"}>IT Market<br/>Registration<br/>uzņēmumiem</h1>
                </div>
            </header>
            <div className="centered">
                <div style={{
                    display: 'flex',
                    borderRadius: '20px',
                    flexDirection: 'column',
                    alignItems: 'start',
                    gap: '10px',
                    padding: '20px',
                    marginTop:'20px',
                    background: 'white',
                    boxShadow: '0px 10px 10px 5px rgba(0, 0, 0, 0.5)'
                }}>
                    <form onSubmit={handleSubmit(send)} style={{marginLeft:"10px",marginBottom:"20px",marginRight:"10px"}}>
                        <h3 className={"errorMsg"}>{error}</h3>
                        <label>
                            Uzņēmuma nosaukums:
                            <input type="text" name="username" onChange={e => setUsername(e.target.value)}/>
                            {errors.length ?
                                errors.map((error) => {
                                    if (error.field === 'username') {
                                        return <div className="error">{error.error}</div>;
                                    }


                                }) :
                                <div></div>}
                            <small style={{color:"gray"}}>Būs jaievada laukā "Lietotājavārds" autorizācijas formā</small>
                        </label>
                        <label>
                            Parole:
                            <input type="password" name="password" onChange={e => setPassword(e.target.value)}/>
                            {errors.length ?
                                errors.map((error) => {
                                    if (error.field === 'password') {
                                        return <div className="error">{error.error}</div>;
                                    }


                                }) :
                                <div></div>}
                        </label>

                        <button type={"submit"} className="btn btn-white btn-animate">Register</button>
                        <Link to="/auf/log">Jums jau ir profils?</Link>
                    </form>
                </div>
                {/*<form onSubmit={handleSubmit(send)}>*/}
                {/*    <h3 className={"errorMsg"}>{error}</h3>*/}
                {/*    <label>*/}
                {/*        Uzņēmuma nosaukums:*/}
                {/*        <input type="text" name="username" onChange={e => setUsername(e.target.value)}/>*/}
                {/*        {errors.length ?*/}
                {/*            errors.map((error) => {*/}
                {/*                if (error.field === 'username') {*/}
                {/*                    return <div className="error">{error.error}</div>;*/}
                {/*                }*/}


                {/*            }) :*/}
                {/*            <div></div>}*/}
                {/*    </label>*/}
                {/*    <label>*/}
                {/*        Parole:*/}
                {/*        <input type="password" name="password" onChange={e => setPassword(e.target.value)}/>*/}
                {/*        {errors.length ?*/}
                {/*            errors.map((error) => {*/}
                {/*                if (error.field === 'password') {*/}
                {/*                    return <div className="error">{error.error}</div>;*/}
                {/*                }*/}


                {/*            }) :*/}
                {/*            <div></div>}*/}
                {/*    </label>*/}

                {/*    <button type={"submit"} className="btn btn-white btn-animate">Register</button>*/}
                {/*    <Link to="/auf/log">Jums jau ir profils?</Link>*/}
                {/*</form>*/}

            </div>

        </div>
    );
};

export default RegCompany;