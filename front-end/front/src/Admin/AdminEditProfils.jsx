import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "react-bootstrap/Button";
import PostCard from "../Components/PostCard";
import Badge from "react-bootstrap/Badge";
import Form from "react-bootstrap/Form";
import AccountCard from "./AccountCard";

const AdminEditProfils = () => {
    const[error,setError]=useState('');

    const navigate = useNavigate();
    const [userData,setUserDate]=useState([]);
    let [posts, setPosts] = useState([]);



    function getUser() {
        axios.get(`http://localhost:8088/api/accounts/getAll`)
            .then(response => {
                setUserDate(response.data);
            });
    }




    useEffect(()=> {
        getUser();

    },[]);




    const handleReset = () => {
        window.location.reload();
    }
    const [Pid, setId] = useState('');
    const [name, setName] = useState('');

    const handleIdChange = (event) => {
        setId(event.target.value);
    };
    const handleNameChange = (event) => {
        setName(event.target.value);
    };
    const searchById = (id) => {
        console.log("Searching for ID:", id);
        if (id===''){
            getUser();
        }


        axios.get(`http://localhost:8088/api/accounts/${id}` )
            .then(response => {
                setError('')
                if (response.data === null) {
                    setUserDate([]);
                } else {
                    setUserDate([response.data]);
                }
                console.log(userData);
            })
            .catch((error) => {
                if (error.response.status === 404) {
                    setError(error.response.data);
                }
            });
    };

    const searchByName = (name) => {
        console.log("Searching for ID:", name);
        if (name===''){
            getUser();
        }


        axios.get(`http://localhost:8088/api/accounts/getByName/${name}` )
            .then(response => {
                setError('')
                if (response.data === null) {
                    setUserDate([]);
                } else {
                    setUserDate([response.data]);
                }
                console.log(userData);
            })
            .catch((error) => {
                if (error.response.status === 404) {
                    setError(error.response.data);
                }
            });
    };


    return (
        <div>

            <Button as={Link} to="/" variant="secondary">
                BACK
            </Button>
            <div>
                <div style={{display: 'flex', gap: '20px', justifyContent: 'center', paddingTop: '100px'}}>
                    <div style={{ boxShadow:'0px 10px 10px 5px rgba(0, 0, 0, 0.5)', borderRadius:'20px',width: '45%',padding:'10px',background:'white'}}>
                        {userData && userData.length > 0 ?
                            userData.map((userDat) =>
                                    <AccountCard
                                        key={userDat.id}
                                        id={userDat.id}
                                        username={userDat.username}
                                        enabled={userDat.enabled}
                                        credentialsexpired={userDat.credentialsexpired}
                                        expired={userDat.expired}
                                        locked={userDat.locked}
                                        roles={userDat.roles}
                                    />
                            )
                         :
                            <p>Nav</p>
                        }
                    </div>

                    <div style={{
                        display: 'flex',
                        borderRadius: '20px',
                        flexDirection: 'column',
                        alignItems: 'start',
                        maxHeight: '500px',
                        gap: '10px',
                        padding: '10px',
                        background: 'white',
                        boxShadow: '0px 10px 10px 5px rgba(0, 0, 0, 0.5)'
                    }}>
                        <div style={{display: 'flex', alignItems: 'center', gap: '10px', paddingTop: '5px'}}>

                            <a style={{fontWeight: 'bold'}}>Profilu skaits: <Badge
                                bg="primary">{userData.length}</Badge> </a>
                            {/*<button className="w-60">sdsd</button>*/}
                            <p style={{verticalAlign: 'middle', margin: 0}}></p>

                        </div>
                        <div style={{display: 'flex', alignItems: 'center', gap: '10px', paddingTop: '1px'}}>
                            <Form>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Find by ID</Form.Label>
                                    <Form.Control
                                        type="number"
                                        value={Pid}
                                        onChange={handleIdChange}
                                        placeholder="Enter ID"
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Button className=" btn btn-white btn-animate" style={{borderRadius: '30px'}} onClick={() => searchById(Pid)}>Search</Button>
                                </Form.Group>
                            </Form>


                        </div>

                        <div style={{display: 'flex', alignItems: 'center', gap: '10px', width: '100%'}}>
                            <Form>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Find by Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        className={"w-100"}
                                        value={name}
                                        onChange={handleNameChange}
                                        placeholder="Enter Name"
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Button className=" btn btn-white btn-animate" style={{borderRadius: '30px'}} onClick={() => searchByName(name)}>Search</Button>
                                </Form.Group>
                            </Form>
                        </div>


                       <br/>
                        <div style={{display: 'flex', alignItems: 'center', gap: '10px', width: '100%'}}>
                            <Button style={{borderRadius: '30px'}} onClick={handleReset}
                                    className=" btn btn-white btn-animate">
                                Notirīt
                            </Button>
                        </div>
                        <div style={{display: 'flex', alignItems: 'center', gap: '10px', width: '100%'}}>

                            {/*error*/}
                        </div>
                    </div>

                </div>


                {/*<Link to={`/edit/${id}`}>edit</Link>*/}
            </div>
        </div>
    );
};

export default AdminEditProfils;