import React, {useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";
import place from "../icon/marker.png"
import start from "../icon/calendar-clock.png"
import end from "../icon/eye-crossed.png"
import phone from "../icon/phone-call.png"
import email from "../icon/envelope-plus.png"
import company from "../icon/building.png"
import type from "../icon/corporate-alt.png"
import salary from "../icon/payroll-calendar.png"
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import PostCard from "../Components/PostCard";
import Form from 'react-bootstrap/Form';
import Badge from "react-bootstrap/Badge";
import Alert from "react-bootstrap/Alert";

const Account = () => {
    const {id}=useParams();
    const [postInfo, setPostInfo] = useState([]);
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);
    const [openPassword,setOpenPassword]=useState(false);
    const [userData,setUserDate]=useState({});
    let [posts, setPosts] = useState([]);
    const [show, setShow] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error,setError]=useState('');
    const [activeAttachment,setActiveAtt]=useState('');
    const [oldPassword, setOldPassword] = useState('');

    function getUser() {
        axios.get(`http://localhost:8088/api/accounts/${id}`)
            .then(response => {
                setUserDate(response.data);
            });
    }

    function updatePassword() {

        if (oldPassword.length<8 || confirmPassword.length<8 ) {
            setError('Jābut min 8 simboli ');
            return;
        }

        if (oldPassword==='' || confirmPassword==='') {
            setError('Ievadiet visus datus!');
            return;
        }


        axios.post(`http://localhost:8088/api/accounts/change-password/${id}/${oldPassword}/${confirmPassword}`, {

            oldPassword: oldPassword,
            newPassword: confirmPassword
        })
            .then(response => {
                setShow(true);
                handleClosePassword();

            })
            .catch(error => {
                setError(error.response.data || 'Failed to update password');
            });
    }


    function selectProducts(){
        axios.get(`http://localhost:8088/post/getPostsByOwner/${id}` )
            .then(response => {
                setPosts([]);
                setPosts(response.data);
            })

    }
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleClosePassword = () => setOpenPassword(false);

    useEffect(()=> {
        getUser();
        selectProducts()
        getFeedback()
    },[]);


    function update(){
            setOpen(true);
    }
    function save() {
        console.log(userData);
        axios.post(`http://localhost:8088/api/accounts/edit`,userData )
            .then(response => {
              if (response.status===200){
                  setShow(true);
                  navigate("/auf/log");
              }
            })
    }
    function goToLogin(){
        navigate("/auf/log");
    }
    function userPosts(){
        navigate(`/private/account/${id}/posts`);
    }
    function userAtsauksmes(){
        navigate(`/private/account/${id}/atsauksmes`);
    }
    function setPasswordOpen(){
        setOpenPassword(true);
        setError('');
    }

    function getFeedback() {
        axios.get(`http://localhost:8088/document/docCount`, { params: { id: id } })
            .then(response => {
                console.log('Response:', response.data);
                setActiveAtt(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }

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
            <Alert show={show} variant="success">
                <Alert.Heading className="d-flex justify-content-center">Izmaiņas ir saglabāti </Alert.Heading>
            </Alert>

            <Modal
                open={openPassword}
                onClose={handleClosePassword}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Alert show={error} variant="danger" onClose={() => setError('')} dismissible>
                        <Alert.Heading>Error!</Alert.Heading>
                        <p>{error}</p>
                    </Alert>

                    <Typography id="modal-modal-title" variant="h6" component="h2">

                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Atjaunot paroli
                        <br/>
                        <Form.Label >Veca parole</Form.Label>
                        <Form.Control  onChange={e => setOldPassword(e.target.value)} />

                        <Form.Label>Jauna parole</Form.Label>
                        <Form.Control  onChange={e => setConfirmPassword(e.target.value)} />
                        <div className="button-container text-box">

                            <button onClick={updatePassword} className=" btn-white ">Saglabāt</button>
                            <button onClick={handleClosePassword} className=" btn-white ">Atcelt</button>

                        </div>
                    </Typography>
                </Box>
            </Modal>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">

                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                       Lai pieņemt izmaiņas jums vajadzēs vel reiz ieiet sava akauntā
                        <div className="button-container text-box">

                            <button onClick={save} className=" btn-white ">Saglabāt</button>
                            <button onClick={handleClose} className=" btn-white ">Atcelt</button>

                        </div>
                    </Typography>
                </Box>
            </Modal>

            <Button as={Link} to="/" variant="secondary">
                Atpakaļ
            </Button>
            <div>
                <div style={{display: 'flex', gap: '20px', justifyContent: 'center', paddingTop: '100px'}}>
                    <div style={{ boxShadow:'0px 10px 10px 5px rgba(0, 0, 0, 0.5)', borderRadius:'20px',width: '45%',padding:'10px',background:'white'}}>
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Lietotājavārds</Form.Label>
                                <Form.Control  onChange={e =>
                                                setUserDate({...userData, username: e.target.value})}
                                               value={userData.username} placeholder="Lietotājavārds" />

                            </Form.Group>



                            <Form.Group controlId="formFile" className="mb-3">
                                <Form.Label>Jauna parole</Form.Label>
                                <Button size="sm" onClick={setPasswordOpen} variant="primary" >
                                    Atjaunot paroli
                                </Button>
                            </Form.Group>
                            <Button onClick={update} variant="primary" >
                                Saglabāt
                            </Button>
                        </Form>

                    </div>

                    <div style={{
                        display: 'flex',
                        borderRadius: '20px',
                        flexDirection: 'column',
                        alignItems: 'start',
                        gap: '10px',
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
                            <a style={{fontWeight: 'bold'}}>Aktīvas atsauksmes :  <Badge
                                bg="primary">{activeAttachment}</Badge></a>
                            <p style={{verticalAlign: 'middle', margin: 0}}></p>
                        </div>
                        <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                            <Button onClick={userPosts} variant="link">Apskatīt  sludinājumus </Button>
                            <p style={{verticalAlign: 'middle', margin: 0}}></p>
                        </div>
                        <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                            <Button onClick={userAtsauksmes} variant="link">Apskatīt atsauksmes </Button>
                            <p style={{verticalAlign: 'middle', margin: 0}}></p>
                        </div>
                    </div>

                </div>


                {/*<Link to={`/edit/${id}`}>edit</Link>*/}
            </div>
        </div>
    );
};

export default Account;