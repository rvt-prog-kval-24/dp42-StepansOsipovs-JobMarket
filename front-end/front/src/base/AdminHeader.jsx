import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import Cookies from "js-cookie";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";



const AdminHeader = () => {
    const [isAuth ,setIsAuth]=useState(false);
    const navigate = useNavigate();
    const id=Cookies.get('userID')
    function checkAuth(){
        if (localStorage.getItem("jwt")){
            setIsAuth(true);
        }
    }
    useEffect(() => {
        checkAuth();
    }, []);

    function logout()
    {
        localStorage.clear("jwt");
        Cookies.remove("userID");
        Cookies.remove("userName");
        window.location.reload();
        navigate("/")

    }
    function goEditPosts() {
        navigate("/admin/editPosts");
    }
    function goEditProfil() {
        navigate("/admin/editProfils")
    }
    function home(){
        navigate("/admin/main")
    }

    return (
        <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand style={{cursor:"pointer"}} onClick={home}>IT market</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link onClick={goEditPosts} >Rediģēt sludinājumus</Nav.Link>
                        <Nav.Link onClick={goEditProfil}>Rediģēt profilus</Nav.Link>
                    </Nav>
                    <Nav>
                        {isAuth && (
                            <>
                                <Nav.Link  onClick={logout} >Logout</Nav.Link >
                            </>
                        )}


                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default AdminHeader;