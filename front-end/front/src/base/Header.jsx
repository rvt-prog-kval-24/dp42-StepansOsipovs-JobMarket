import React, {useEffect, useState} from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {useNavigate} from "react-router-dom";
import Cookies from "js-cookie";
const Header = () => {
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
        window.location.reload();

    }
    function account(){
        navigate(`/private/account/${id}`)
    }
    const handleReset = () => {
        window.location.reload();

    }
    return (
        <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="#home">IT market</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="#features">Features</Nav.Link>
                        <Nav.Link href="#pricing">Pricing</Nav.Link>
                        <NavDropdown title="Dropdown" id="collapsible-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">
                                Another action
                            </NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">
                                Separated link
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Nav>

                        {isAuth && (
                            <>
                                <Nav.Link  onClick={logout} >Logout</Nav.Link >
                                <Nav.Link  onClick={account} >Your profile</Nav.Link >
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

export default Header;