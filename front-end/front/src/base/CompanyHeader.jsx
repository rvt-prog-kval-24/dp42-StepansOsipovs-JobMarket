import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import Cookies from "js-cookie";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";

const CompanyHeader = () => {
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
    function goToLogin(){
        navigate("/auf/log");
    }
    function logout()
    {
        localStorage.clear("jwt");
        Cookies.remove("userID");
        Cookies.remove("userName");
        // window.location.reload();
        navigate(`/auf/log`);

    }
    function account(){
        navigate(`account/${id}`)
    }
    const handleReset = () => {
        window.location.reload();

    }
    const stats = () => {
        navigate("stats")
    }
    const test = () => {
        navigate(`/private/account/${id}/sent`)
    }
    return (
        <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="/company">IT market</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link onClick={stats}>Statistika</Nav.Link>
                    </Nav>
                    <Nav>
                        {isAuth && (
                            <>
                                <Nav.Link  onClick={logout} >Iziet</Nav.Link >
                                <Nav.Link  onClick={account} >Profils</Nav.Link >
                            </>
                        )}
                        {!isAuth && (
                            <Nav.Link onClick={goToLogin} href="">Login</Nav.Link>
                        )}

                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default CompanyHeader;