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
import apply from "./Apply";

const Show = () => {
    const {id}=useParams();
    const [postInfo, setPostInfo] = useState([]);
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);

    function deleteProducts() {
        axios.post(`http://localhost:8088/post/del/${id}`)
            .then(response => {
                if(response.status===200){
                    navigate("/")
                }
    });
}

function getPost(){
    axios.get('http://localhost:8088/post/'+id)
        .then(response => {
                setPostInfo(response.data);
            });
    }

    function applyPost(){
        if (localStorage.getItem("jwt"))
        {
            navigate(`/private/apply/${postInfo.owner.id}/${id}`);
        }
        else handleOpen();
    }
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    useEffect(()=> {
        getPost();


    },[]);
    function goToLogin(){
        navigate("/auf/log");
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
        <Button as={Link} to="/" variant="secondary">
            BACK
        </Button>
        <div>
            <div style={{display: 'flex', gap: '20px', justifyContent: 'center', paddingTop: '100px'}}>
                <div style={{ boxShadow:'0px 10px 10px 5px rgba(0, 0, 0, 0.5)', borderRadius:'20px',width: '45%',padding:'10px',background:'white'}}>
                    {postInfo.postAtributes && postInfo.postAtributes.length > 0 && (
                        <div dangerouslySetInnerHTML={{__html: postInfo.postAtributes[0].body}}/>
                    )}
                    <Button onClick={applyPost}>Atsaukties</Button>
                </div>

                <div style={{
                    display: 'flex',
                    borderRadius:'20px',
                    flexDirection: 'column',
                    alignItems: 'start',
                    gap: '10px',
                    padding: '10px',
                    background:'white',
                    boxShadow:'0px 10px 10px 5px rgba(0, 0, 0, 0.5)'
                }}>
                    <div style={{display: 'flex', alignItems: 'center', gap: '10px', paddingTop: '5px'}}>
                        <img style={{height: '20px', width: '20px', verticalAlign: 'middle'}} src={place}
                             alt="place icon"/>
                        <a style={{fontWeight: 'bold'}}>Atrašanas vieta:</a>
                        <p style={{verticalAlign: 'middle', margin: 0}}>{postInfo.post_city}</p>
                    </div>
                    <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                        <img style={{height: '20px', width: '20px', verticalAlign: 'middle'}} src={start}
                             alt="place icon"/>
                        <a style={{fontWeight: 'bold'}}>Publicēšanas diena:</a>
                        <p style={{verticalAlign: 'middle', margin: 0}}>{postInfo.posts_start_day}</p>
                    </div>
                    <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                        <img style={{height: '20px', width: '20px', verticalAlign: 'middle'}} src={end}
                             alt="place icon"/>
                        <a style={{fontWeight: 'bold'}}>Publicēts līdz:</a>
                        <p style={{verticalAlign: 'middle', margin: 0}}>{postInfo.posts_end_day}</p>
                    </div>
                    <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                        <img style={{height: '20px', width: '20px', verticalAlign: 'middle'}} src={phone}
                             alt="place icon"/>
                        <a style={{fontWeight: 'bold'}}>Kontakt numurs:</a>
                        <p style={{verticalAlign: 'middle', margin: 0}}>{postInfo.post_contactPhone}</p>
                    </div>
                    <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                        <img style={{height: '20px', width: '20px', verticalAlign: 'middle'}} src={email}
                             alt="place icon"/>
                        <a style={{fontWeight: 'bold'}}>Kontakt e-pasts:</a>
                        <p style={{verticalAlign: 'middle', margin: 0}}>{postInfo.post_email}</p>
                    </div>
                    <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                        <img style={{height: '20px', width: '20px', verticalAlign: 'middle'}} src={company}
                             alt="place icon"/>
                        <a style={{fontWeight: 'bold'}}>Uzņēmums:</a>
                        <p style={{verticalAlign: 'middle', margin: 0}}>{postInfo.company}</p>
                    </div>
                    <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                        <img style={{height: '20px', width: '20px', verticalAlign: 'middle'}} src={type}
                             alt="place icon"/>
                        <a style={{fontWeight: 'bold'}}>Darba tips:</a>
                        <p style={{verticalAlign: 'middle', margin: 0}}>{postInfo.post_type}</p>
                    </div>
                    <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                        <img style={{height: '20px', width: '20px', verticalAlign: 'middle'}} src={salary}
                             alt="place icon"/>
                        <a style={{fontWeight: 'bold'}}>Alga:</a>
                        <p style={{verticalAlign: 'middle', margin: 0}}>{postInfo.salary} $/mēn</p>
                    </div>
                </div>

            </div>


            {/*<Link to={`/edit/${id}`}>edit</Link>*/}
        </div>
    </div>
    );
};

export default Show;