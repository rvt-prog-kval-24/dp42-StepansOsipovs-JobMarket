// import React from 'react';
// import Button from 'react-bootstrap/Button';
// import Card from 'react-bootstrap/Card';
//
// const AccountCard = ({ id, username, enabled, credentialsexpired, expired, locked, roles }) => {
//     return (
//         <div>
//             <Card>
//                 <Card.Body>
//                     <Card.Title>Name: {username}</Card.Title>
//                     <Card.Title>ID: {id}</Card.Title>
//                     <Card.Title>Enabled: {enabled ? 'true' : 'false'}</Card.Title>
//                     <Card.Title>Credentialsexpired: {credentialsexpired ? 'true' : 'false'}</Card.Title>
//                     <Card.Title>Expired: {expired ? 'true' : 'false'}</Card.Title>
//                     <Card.Title>Locked: {locked ? 'true' : 'false'}</Card.Title>
//                     <Card.Title>
//                         Role: {roles && roles.length > 0 ? (
//                         roles.map((role, index) => (
//                             <React.Fragment key={index}>{role.name} </React.Fragment>
//                         ))
//                     ) : (
//                         'No roles assigned'
//                     )}
//                     </Card.Title>
//
//                     <Button variant="danger">Delete</Button>
//                     <Button variant="primary">Edit</Button>
//                 </Card.Body>
//             </Card>
//         </div>
//     );
// };
//
// export default AccountCard;
import React, { useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';

const AccountCard = ({ id, username, enabled, credentialsexpired, expired, locked, roles }) => {
    const initialRoles = roles.length > 0 ? roles.map((role) => role.name).join(', ') : 'ROLE_USER';

    // Инициализация состояний для отслеживания значений
    const [formData, setFormData] = useState({
        id,
        username,
        enabled: enabled ? 'true' : 'false',
        credentialsexpired: credentialsexpired ? 'true' : 'false',
        expired: expired ? 'true' : 'false',
        locked: locked ? 'true' : 'false',
        roles: initialRoles,
    });

    // Обработчик изменений в полях
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Обработчик отправки данных с использованием axios
    const handleSubmit = async () => {
       console.log(formData)
        try {
            const response = await axios.post('http://localhost:8088/api/accounts/editByAdmin', formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            console.log('Data submitted successfully:', response.data);
        } catch (error) {
            console.error('Error submitting data:', error);
        }
    };

    return (
        <div>
            <Card>
                <Card.Body>
                    <Form.Group className="mb-3">
                        <Form.Label>ID</Form.Label>
                        <Form.Control
                            type="number"
                            name="id"
                            value={formData.id}
                            onChange={handleInputChange}
                            readOnly
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleInputChange}
                            className={"w-100"}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Enabled</Form.Label>
                        <Form.Select name="enabled" value={formData.enabled} onChange={handleInputChange}>
                            <option value="true">true</option>
                            <option value="false">false</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Credentials Expired</Form.Label>
                        <Form.Select name="credentialsexpired" value={formData.credentialsexpired} onChange={handleInputChange}>
                            <option value="true">true</option>
                            <option value="false">false</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Expired</Form.Label>
                        <Form.Select name="expired" value={formData.expired} onChange={handleInputChange}>
                            <option value="true">true</option>
                            <option value="false">false</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Locked</Form.Label>
                        <Form.Select name="locked" value={formData.locked} onChange={handleInputChange}>
                            <option value="true">true</option>
                            <option value="false">false</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Roles</Form.Label>
                        <Form.Select name="roles" value={formData.roles} onChange={handleInputChange}>
                            <option value="ROLE_USER">ROLE_USER</option>
                            <option value="ROLE_ADMIN">ROLE_ADMIN</option>
                        </Form.Select>
                    </Form.Group>
                    <Button variant="danger" onClick={handleSubmit}>Delete</Button>
                    <Button variant="primary" onClick={handleSubmit}>Submit</Button>
                </Card.Body>
            </Card>
        </div>
    );
};

export default AccountCard;
