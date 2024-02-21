import React from 'react';
import {Link, useNavigate} from "react-router-dom";

const Crossroads = () => {
    const navigate = useNavigate();


    function userLap() {
        navigate("/");
    }

    function adminLap() {
        navigate("/admin/main")
    }

    return (
        <div>
            <header>
                <div className={"colored"}>
                    <h1 className={"main-header"}>IT Market admin</h1>
                </div>
            </header>

            <div className="centered" style={{textAlign: 'center', paddingTop: '10%', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <h3 style={{marginBottom: '1%'}}>Which section do you want to go to?  <span style={{fontSize: '2em'}}>🤔</span></h3>
                <div style={{display: 'flex', flexDirection: 'row'}}>
                    <button onClick={userLap} className="btn btn-white btn-animate" style={{marginRight: '3%'}}>User</button>
                    <button onClick={adminLap} className="btn btn-white btn-animate">Admin</button>
                </div>
            </div>
        </div>
    );
};

export default Crossroads;