// import React, {useEffect} from 'react';
// import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';
// import Cookies from "js-cookie";
// const Apply = () => {
//
//     return (
//         <div>
//             <div style={{display: 'flex', gap: '20px', justifyContent: 'center', paddingTop: '100px'}}>
//                 <div style={{
//                     boxShadow: '0px 10px 10px 5px rgba(0, 0, 0, 0.5)',
//                     borderRadius: '20px',
//                     width: '45%',
//                     padding: '10px',
//                     background: 'white'
//                 }}>
//                     <Form>
//                         <Form.Group className="mb-3" controlId="formBasicEmail">
//                             <Form.Label>E-pasts</Form.Label>
//                             <Form.Control placeholder="Email" />
//                         </Form.Group>
//
//                         <Form.Group className="mb-3" controlId="formBasicPassword">
//                             <Form.Label>Vārds Uzvārds</Form.Label>
//                             <Form.Control placeholder="Vārds Uzvārds" />
//                         </Form.Group>
//
//
//                         <Form.Group className="mb-3" controlId="formBasicPassword">
//                             <Form.Label>Mob. numurs</Form.Label>
//                             <Form.Control type="phone" placeholder="Mob. numurs" />
//                         </Form.Group>
//
//                         <Form.Group className="mb-3" controlId="formBasicPassword">
//                             <Form.Label>CV</Form.Label>
//                             <Form.Control type="file" placeholder="Mob. numurs" />
//                             <Form.Text className="text-muted">
//                                 Tikai PDF.
//                             </Form.Text>
//                         </Form.Group>
//                         <Button variant="primary" type="submit">
//                             Submit
//                         </Button>
//                     </Form>
//                 </div>
//
//
//
//
//             </div>
//
//         </div>
//     );
// };
//
// export default Apply;

import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Axios from 'axios';
import {useNavigate, useParams} from "react-router-dom";
import Cookies from "js-cookie";

const Apply = () => {
    const [error,setError]=useState('');
    const [phoneError,setPhoneError]=useState('');
    const {postId}=useParams();
    const {owner}=useParams();
    const [email, setEmail] = useState('');
    const [fullName, setFullName] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [file, setFile] = useState(null);

    const handleEmailChange = (e) => setEmail(e.target.value);
    const handleFullNameChange = (e) => setFullName(e.target.value);
    const handleMobileNumberChange = (e) => setMobileNumber(e.target.value);
    const handleFileChange = (e) => setFile(e.target.files[0]);
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('')
        const formData = new FormData();
        if (!email.trim() || !fullName.trim() || !mobileNumber.trim() || !file || !owner.trim()) {
           setError('Lūdzu, aizpildiet visus laukus un pievienojiet failu.');
            return; // Остановка функции, если какие-то поля пусты
        }
        if (!/^\d+$/.test(mobileNumber)) {
            setPhoneError('Tālruņa numurā drīkst būt tikai cipari');
            return;
        }
        formData.append('email', email);
        formData.append('userName', fullName);
        formData.append('phone', mobileNumber);
        formData.append('file', file);
        formData.append('to', owner);
        formData.append('post', postId);
        formData.append('from', Cookies.get('userID'));

        try {
            const response = await Axios.post('http://localhost:8088/document/saveCV', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('Документ успешно сохранен:', response.data);
            alert('Veiksmīgi nosutīts');
            navigate('/')
        } catch (error) {
            console.error('Ошибка при сохранении документа:', error);
            alert('Kļūda');
        }
    };

    return (
        <div style={{display: 'flex', gap: '20px', justifyContent: 'center', paddingTop: '100px'}}>
            <div style={{
                boxShadow: '0px 10px 10px 5px rgba(0, 0, 0, 0.5)',
                borderRadius: '20px',
                width: '45%',
                padding: '10px',
                background: 'white'
            }}>
                <p style={{color:"red"}}>
                    {error}
                </p>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>E-pasts *</Form.Label>
                        <Form.Control type="email" placeholder="Email" value={email} onChange={handleEmailChange} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicFullName">
                        <Form.Label>Vārds Uzvārds *</Form.Label>
                        <Form.Control placeholder="Vārds Uzvārds" value={fullName} onChange={handleFullNameChange} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicMobileNumber">
                        <Form.Label>Mob. numurs *</Form.Label>
                        <Form.Control type="tel" placeholder="Mob. numurs" value={mobileNumber} onChange={handleMobileNumberChange} />
                    </Form.Group>
                    <p style={{color:"red"}}>
                        {phoneError}
                    </p>
                        <Form.Group className="mb-3" controlId="formBasicFile">
                        <Form.Label>CV *</Form.Label>
                        <Form.Control type="file" onChange={handleFileChange} />
                        <Form.Text className="text-muted">
                            Tikai PDF.
                        </Form.Text>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
        </div>
    );
};

export default Apply;

