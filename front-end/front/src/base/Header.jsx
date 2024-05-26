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
    const id=Cookies.get('userID');
    const [userId, setUserId] = useState(null);

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
    const stats = () => {
      navigate("/public/stats")
    }
    const test = () => {
        navigate(`/private/account/${id}/sent`)
    }
    return (
        <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="/">IT market</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link onClick={stats}>Statistika</Nav.Link>
                    </Nav>
                    <Nav>
                        {isAuth && (
                            <>
                                <Nav.Link  onClick={logout} >Iziet</Nav.Link >
                                <Nav.Link  onClick={account} >Jūsu profilsn</Nav.Link >
                                <Nav.Link  onClick={test} >Nosutītas atsauksmes</Nav.Link >
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