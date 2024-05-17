import React, {useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "react-bootstrap/Button";
import PostCard from "../Components/PostCard";
import Badge from "react-bootstrap/Badge";
import Cookies from "js-cookie";
import Form from 'react-bootstrap/Form';

const AdminEditPosts = () => {
    const[selectedFilterOptions,setSelectedFilterOptions]=useState({postCity:'',postType:'',company:'',postHeader:''})
    const[error,setError]=useState('');
    const [postInfo, setPostInfo] = useState([]);
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);
    const [userData,setUserDate]=useState({});
    let [posts, setPosts] = useState([]);
    const [filterOptions,setFilterOptions]=useState({
        postCity: [],
        company: [],
        postType: []
    });

    function selectDataForFilter(){
        axios.get('http://localhost:8088/post/dataForSwitch' )
            .then(response => {
                setFilterOptions(response.data);
            })

    }
    function getUser() {
        axios.get(`http://localhost:8088/api/accounts/2`)
            .then(response => {
                setUserDate(response.data);
            });
    }


    function selectProducts(){
        axios.get('http://localhost:8088/post/getHeaders' )
            .then(response => {
                setPosts([]);
                setPosts(response.data);
            })

    }
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    useEffect(()=> {
        getUser();
        selectProducts()
        selectDataForFilter();
        getDataWithFilter();
    },[]);

    function getDataWithFilter(){
        setError(null);
        axios.post('http://localhost:8088/post/filter',selectedFilterOptions )
            .then(response => {
                setPosts([]);
                setPosts(response.data);
            })
            .catch((error) => {
                if (error.response.status === 404) {
                    setError(error.response.data);
                }
            });
    }

    function goToLogin(){
        navigate("/auf/log");
    }
    const handleReset = () => {
        window.location.reload();

    }
    const [Pid, setId] = useState('');

    const handleIdChange = (event) => {
        setId(event.target.value);
    };
    const searchById = (id) => {
        console.log("Searching for ID:", id);
        if (id===''){
            selectProducts();
        }

        axios.post(`http://localhost:8088/post/filterById/${id}` )
            .then(response => {
                setError('')
                setPosts([]);
                setPosts(response.data);
            })
            .catch((error) => {
                if (error.response.status === 404) {
                    setError(error.response.data);
                }
            });
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
            <Button as={Link} to="/" variant="secondary">
                BACK
            </Button>
            <div>
                <div style={{display: 'flex', gap: '20px', justifyContent: 'center', paddingTop: '100px'}}>
                    <div style={{ boxShadow:'0px 10px 10px 5px rgba(0, 0, 0, 0.5)', borderRadius:'20px',width: '45%',padding:'10px',background:'white'}}>
                        {/*{posts.length ?*/}
                        {/*    posts.map((post) =>*/}
                        {/*        <PostCard key={post.id} id={post.id} post_header={post.post_header} salary={post.salary}*/}
                        {/*                  post_type={post.post_type} company={post.company}/>*/}
                        {/*    )*/}
                        {/*    :*/}
                        {/*    <p> List is empty</p>*/}
                        {/*}*/}
                        {posts.length ?
                            posts.map((post) =>
                                <PostCard owner={true} key={post.id} id={post.id} post_header={post.post_header} salary={post.salary}
                                          post_type={post.post_type} company={post.company}/>
                            )
                            :
                            <p>Jūs pagaidam nav sludinājumu  </p>
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

                            <a style={{fontWeight: 'bold'}}>Sludinājumu skaits: <Badge
                                bg="primary">{posts.length}</Badge> </a>
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
                            <Form.Select onChange={e => setSelectedFilterOptions({
                                ...selectedFilterOptions,
                                postType: e.target.value
                            })} aria-label="Default select example">
                                <option value=''>Work type</option>
                                {filterOptions.postType.map((postType, index) =>
                                    <option value={postType} key={postType}> {postType}</option>
                                )}
                            </Form.Select>
                            <p style={{verticalAlign: 'middle', margin: 0}}></p>
                        </div>
                        <div style={{display: 'flex', alignItems: 'center', gap: '10px', width: '100%'}}>
                            <Form.Select onChange={e => setSelectedFilterOptions({
                                ...selectedFilterOptions,
                                company: e.target.value
                            })} aria-label="Default select example">
                                <option value="">Company</option>
                                {filterOptions.company.map((company, index) =>
                                    <option value={company} key={company}> {company}</option>
                                )}
                            </Form.Select>
                            <p style={{verticalAlign: 'middle', margin: 0}}></p>
                        </div>
                        <div style={{display: 'flex', alignItems: 'center', gap: '10px', width: '100%'}}>
                            <Form.Select onChange={e => setSelectedFilterOptions({
                                ...selectedFilterOptions,
                                postCity: e.target.value
                            })} aria-label="Default select example">
                                <option value="">City</option>
                                {filterOptions.postCity.map((city, index) =>
                                    <option value={city} key={city}> {city}</option>
                                )}
                            </Form.Select>
                            <p style={{verticalAlign: 'middle', margin: 0}}></p>
                        </div>

                        <div style={{display: 'flex', alignItems: 'center', gap: '10px', width: '100%'}}>
                            <Button style={{borderRadius: '30px'}} onClick={getDataWithFilter}
                                    className=" btn btn-white btn-animate">
                                Atrast
                            </Button>
                        </div>
                        <div style={{display: 'flex', alignItems: 'center', gap: '10px', width: '100%'}}>
                            <Button style={{borderRadius: '30px'}} onClick={handleReset}
                                    className=" btn btn-white btn-animate">
                                Notirīt
                            </Button>
                        </div>
                        <div style={{display: 'flex', alignItems: 'center', gap: '10px', width: '100%'}}>
                            {error ?
                                <p style={{color: "red"}}>{error.message}.
                                </p> : <p></p>}
                        </div>
                    </div>

                </div>


                {/*<Link to={`/edit/${id}`}>edit</Link>*/}
            </div>
        </div>
    );
};

export default AdminEditPosts;