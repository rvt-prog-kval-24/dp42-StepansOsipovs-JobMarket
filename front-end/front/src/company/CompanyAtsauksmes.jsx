import React, {useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "react-bootstrap/Button";
import AtsauksmesCard from "../profile/AtsauksmesCard";
import Badge from "react-bootstrap/Badge";

const CompanyAtsauksmes = () => {
    const {Uid}=useParams();
    const [postInfo, setPostInfo] = useState([]);
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);
    const [userData,setUserDate]=useState({});
    let [atsauksmes, setAtsauksmes] = useState([]);

    let [posts,setPosts]=useState([])

    function getUser() {
        axios.get(`http://localhost:8088/api/accounts/${Uid}`)
            .then(response => {
                setUserDate(response.data);
            });
    }


    function selectProducts(){
        axios.get(`http://localhost:8088/post/getPostsByOwner/${Uid}` )
            .then(response => {
                setPosts([]);
                setPosts(response.data);
            })

    }
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    useEffect(()=> {
        getUser();
        selectProducts();
        getAtsauksmes();
    },[]);

    function getAtsauksmes() {
        axios.get(`http://localhost:8088/document/getById`, { params: { id: Uid } })
            .then(response => {
                console.log('Response:', response.data);
                setAtsauksmes(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }

    function update(){
        console.log(userData);
    }
    function goToLogin(){
        navigate("/auf/log");
    }
    function userPosts(){
        navigate(`/company`);
    }
    const handleGoBack = () => {
        navigate(-1); // Возвращает на предыдущую страницу
    };
    const style = {
        position: 'absolute' ,
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };
    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Sorry.
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        To perform this action you must log in.
                        <div className="button-container text-box">

                            <button onClick={goToLogin} className=" btn-white ">Log in</button>
                            <button onClick={handleClose} className=" btn-white ">Cancel</button>

                        </div>
                    </Typography>
                </Box>
            </Modal>
            <Button as={Link} variant="secondary" onClick={handleGoBack}>
                Atpakaļ
            </Button>
            <div>
                <div style={{display: 'flex', gap: '20px', justifyContent: 'center', paddingTop: '100px'}}>
                    <div style={{
                        boxShadow: '0px 10px 10px 5px rgba(0, 0, 0, 0.5)',
                        borderRadius: '20px',
                        width: '45%',
                        padding: '10px',
                        background: 'white'
                    }}>
                        <h3 style={{textAlign: "center"}}>Atsauksmes uz jūsu sludinājumiem </h3>

                        {atsauksmes.length ?
                            atsauksmes.map((value) =>
                                <AtsauksmesCard byEmail={value.byEmail} byName={value.byName} byPhone={value.byPhone}
                                                status={value.status}
                                                toPost={value.toPost} id={value.id}/>
                            )
                            :
                            <p>Uz jūsu sludinājumiem pagaidam nav atsauksmes </p>
                        }
                    </div>

                    <div style={{
                        display: 'flex',
                        borderRadius: '20px',
                        flexDirection: 'column',
                        alignItems: 'start',
                        gap: '10px',
                        maxHeight:'200px',
                        padding: '10px',
                        background: 'white',
                        boxShadow: '0px 10px 10px 5px rgba(0, 0, 0, 0.5)'
                    }}>
                        <div style={{display: 'flex', alignItems: 'center', gap: '10px', paddingTop: '5px'}}>

                            <a style={{fontWeight: 'bold'}}>Sludinājumu skaits: <Badge
                                bg="primary">{posts.length}</Badge> </a>
                            {/*<button className="w-60">sdsd</button>*/}
                            <p style={{verticalAlign: 'middle', margin: 0}}></p>
                        </div>
                        <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>

                            <a style={{fontWeight: 'bold'}}>Profila status: {userData.enabled ?
                                <Badge bg="success">Aktīvs</Badge> : <Badge bg="danger">Neaktīvs</Badge>}</a>
                            <p style={{verticalAlign: 'middle', margin: 0}}></p>
                        </div>

                        <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                            <Button onClick={userPosts} variant="link">Apskatīt sludinājumus </Button>
                            <p style={{verticalAlign: 'middle', margin: 0}}></p>
                        </div>
                        <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                            <Button variant="link">Apskatīt atsauksmes </Button>
                            <p style={{verticalAlign: 'middle', margin: 0}}></p>
                        </div>
                    </div>

                </div>


                {/*<Link to={`/edit/${id}`}>edit</Link>*/}
            </div>
        </div>
    );
};

export default CompanyAtsauksmes;