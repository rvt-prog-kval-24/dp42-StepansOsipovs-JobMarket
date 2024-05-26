import React, {useEffect, useState} from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import axios from "axios";
import {Link, useParams} from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Spinner from 'react-bootstrap/Spinner';

const AtsauksmesCard = ({byEmail,byName,byPhone,status,toPost,id}) => {
    const {Uid}=useParams();
    const [postInfo, setPostInfo] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [statusChangeModal,setStatusChangeModal] = useState(false);
    const [newStatus, setNewStatus] = useState(status); // Исходное значение устанавливается текущим статусом
    const [loading, setLoading] = useState(false);
    const [postExists, setPostExists] = useState(true);
    const [openDelModal,setOpenDelModal] = useState(false);
    const [delMessage, setDelMessage] = useState('');
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
    function getPost() {
        axios.get(`http://localhost:8088/post/${toPost}`)
            .then(response => {
                setPostInfo(response.data);
                setPostExists(true);
            })
            .catch(error => {
                if (error.response && error.response.status === 404) {
                    setPostExists(false);
                } else {
                    console.error('Error fetching post:', error);
                }
            });
    }

    // function download(){
    //     axios.get(`http://localhost:8088/document/get/${id}` )
    //         .then(response => {
    //
    //         })
    //         .catch(error => {
    //             console.error('Error fetching data:', error);
    //         });
    // }
    useEffect(()=> {
        getPost();
    },[]);
    function download() {
        axios({
            url: `http://localhost:8088/document/get/${id}`,
            method: 'GET',
            responseType: 'blob',
        })
            .then(response => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const contentDisposition = response.headers['content-disposition'];
                let filename = "default-filename.pdf";  // Задайте имя файла по умолчанию

                if (contentDisposition) {
                    console.log(response.headers)
                    const filenameMatch = contentDisposition.match(/filename="([^"]+)"/);
                    if (filenameMatch && filenameMatch[1]) {
                        filename = filenameMatch[1];  // Используйте извлеченное имя файла
                    }
                }

                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', filename);
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                window.URL.revokeObjectURL(url);
            })
            .catch(error => {
                console.error('Error downloading the file:', error);
            });
    }
    function changeStatus(){
        console.log(id);
        setStatusChangeModal(true)
        handleClose();
    }
    function saveNewStatus() {
        setLoading(true);
        axios.post('http://localhost:8088/document/status/update', {
            id: id, // ID документа или другого ресурса, которому вы меняете статус
            status: newStatus
        })
            .then(response => {
                console.log('Status updated:', response.data);
                setLoading(false);
                setStatusChangeModal(false); // Закрыть модальное окно после успешного обновления
                setNewStatus(newStatus); // Обновить статус в UI
            })
            .catch(error => {
                console.error('Error updating status:', error);
            });
    }
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    // const close = () => setStatusChangeModal(false);
    function close(){
        setStatusChangeModal(false);
        setNewStatus(status);
        window.location.reload();
    }
    function clodeDelModal(){
     setOpenDelModal(false)
    }
    function del(){
        setOpenDelModal(true)

    }
    function deleteWithMessage(){
        setLoading(true);
        axios.post('http://localhost:8088/document/delWithMessage', {
            id: id, // ID документа или другого ресурса, которому вы меняете статус
            status: delMessage
        })
            .then(response => {
                console.log('Status updated:', response.data);
                setLoading(false);
                setOpenDelModal(false);
                window.location.reload();// Закрыть модальное окно после успешного обновления
            })
            .catch(error => {
                console.error('Error updating status:', error);
            });
    }

    return (
        postExists ? (
        <div>
            <Modal
                open={statusChangeModal}
                onClose={close}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                       Jauns status
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <InputGroup size="sm" className="mb-3">
                            <Form.Control
                                value={newStatus}
                                onChange={(e) => setNewStatus(e.target.value)}
                                aria-label="Small"
                                aria-describedby="inputGroup-sizing-sm"
                            />

                        </InputGroup>
                        {loading ?
                            <Spinner animation="border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </Spinner>
                            :
                            <></>
                        }

                        <div className="button-container text-box">
                            <button onClick={saveNewStatus} className=" btn-white ">Saglabāt</button>
                            <button onClick={close} className=" btn-white ">Atcelt</button>
                        </div>
                    </Typography>
                </Box>
            </Modal>


            <Modal
                open={openDelModal}
                onClose={clodeDelModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Ja jūs gribat nodzēst jums vajag noinformēt kandidātu. Jūs varat uzrakstīt viņam ziņu šeit.
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <InputGroup size="sm" className="mb-3">
                            <Form.Control
                                onChange={(e) => setDelMessage(e.target.value)}
                                as="textarea" rows={8} />

                        </InputGroup>
                        {loading ?
                            <Spinner animation="border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </Spinner>
                            :
                            <></>
                        }

                        <div className="button-container text-box">
                            <button onClick={deleteWithMessage} className=" btn-white ">Nosutīt</button>
                            <button onClick={clodeDelModal} className=" btn-white ">Atcelt</button>
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
                        Uzmanību!
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Jūs tiešam gribat nomainīt statusu uz citu?
                        <div className="button-container text-box">

                            <button onClick={changeStatus} className=" btn-white ">Nomainīt</button>
                            <button onClick={handleClose} className=" btn-white ">Atcelt</button>

                        </div>
                    </Typography>
                </Box>
            </Modal>
            <Card style={{ width: '100%' }}>

                <Card.Body className="d-flex flex-column justify-content-center align-items-center">
                    <Card.Title>Email: {byEmail}</Card.Title>
                    <Card.Title>Vārds: {byName}</Card.Title>
                    <Card.Title>Mob.num: {byPhone}</Card.Title>
                    <Card.Title>Uz: <Link style={{color:"blue"}} to={`/private/account/${Uid}/posts/edit/${toPost}`}>{postInfo.post_header}</Link></Card.Title>
                    <Card.Text>

                    </Card.Text>
                    {/*{status ==="Apskatīts" ?<Button onClick={setOpen} variant="success">Apskatīts</Button>:<Button onClick={setOpen} variant="primary">Neapskatīts</Button>}*/}
                    {newStatus === "Apskatīts" ?
                        <Button onClick={() => setOpen(true)} variant="success">Apskatīts</Button> :
                        (newStatus === "Neapskatīts" ?
                                <Button onClick={() => setOpen(true)} variant="primary">{newStatus}</Button> :
                                <Button onClick={() => setOpen(true)} variant="info">{newStatus}</Button>
                        )
                    }
                    <Button style={{marginTop:'7px'}} onClick={download} variant="primary">Download</Button>
                    <Button style={{marginTop:'7px'}} onClick={del} variant="danger">Delete</Button>
                </Card.Body>
            </Card>
        </div>
        ) : null
    );
};

export default AtsauksmesCard;