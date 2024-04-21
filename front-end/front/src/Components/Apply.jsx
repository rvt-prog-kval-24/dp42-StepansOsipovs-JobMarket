import React, {useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Cookies from "js-cookie";
const Apply = () => {

    return (
        <div>
            <div style={{display: 'flex', gap: '20px', justifyContent: 'center', paddingTop: '100px'}}>
                <div style={{
                    boxShadow: '0px 10px 10px 5px rgba(0, 0, 0, 0.5)',
                    borderRadius: '20px',
                    width: '45%',
                    padding: '10px',
                    background: 'white'
                }}>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>E-pasts</Form.Label>
                            <Form.Control placeholder="Email" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Vārds Uzvārds</Form.Label>
                            <Form.Control placeholder="Vārds Uzvārds" />
                        </Form.Group>


                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Mob. numurs</Form.Label>
                            <Form.Control type="phone" placeholder="Mob. numurs" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>CV</Form.Label>
                            <Form.Control type="file" placeholder="Mob. numurs" />
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

        </div>
    );
};

export default Apply;