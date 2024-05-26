import React, {useEffect, useState} from 'react';
import classes from "../styles/main.module.css"
import Card from 'react-bootstrap/Card';
import {Link} from "react-router-dom";
import {ListGroup} from "react-bootstrap";
import image from "../images/icon-image-not-found-free-vector.jpg"
import Cookies from "js-cookie";


const PostCard = ({id,post_header, salary,post_type,company,owner,admin}) => {
    let userId;
    if ( Cookies.get('userID')){
         userId = Cookies.get('userID');
    }
    if (id != null) {


        return (

            <div className={classes.product} key = {id}>
                <div className={classes.circle}>
                    <img
                        src={`http://localhost:8088/post/downloadFile/${id}`}
                        alt="Post Image"
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = image;
                        }}
                    />
                </div>
                <div className={classes.content}>
                    {owner ?
                        <h5 style={{fontWeight: 'bold'}}><Link to={`${userId}/edit/${id}`}>{post_header}  (Var rediģēt)</Link></h5>
                        :
                        admin ?
                        <h5 style={{fontWeight: 'bold'}}><Link to={`edit/${id}`}>{post_header} (Var
                            rediģēt)</Link></h5>
                        :
                        <h5 style={{fontWeight: 'bold'}}><Link to={`public/show/${id}`}>{post_header}</Link></h5>

                        // <h5 style={{fontWeight: 'bold'}}><Link to={`public/show/${id}`}>{post_header}</Link></h5>
                    }
                    {/*{admin ?*/}
                    {/*    <h5 style={{fontWeight: 'bold'}}><Link to={`edit/${id}`}>{post_header} (Var*/}
                    {/*        rediģēt)</Link></h5>*/}
                    {/*    :*/}
                    {/*    <h5 style={{fontWeight: 'bold'}}><Link to={`public/show/${id}`}>{post_header}</Link></h5>*/}
                    {/*}*/}
                    <hr/>
                    <h5>This post is shared by {company}</h5>
                    <h6>Salary: {salary}€/mēn</h6>
                </div>
            </div>
            // <Card className="mx-2 my-2" style={{ width: '18rem' }}>
            //     <Card.Body>
            //         <Card.Title>{post_header}</Card.Title>
            //         <Card.Text>
            //             {extra_info}
            //         </Card.Text>
            //     </Card.Body>
            //     <ListGroup className="list-group-flush">
            //         <ListGroup.Item>Salary : {salary} $</ListGroup.Item>
            //         <ListGroup.Item>Work type : {post_type}</ListGroup.Item>
            //         <ListGroup.Item>Job offer from : {company}</ListGroup.Item>
            //     </ListGroup>
            //     <Card.Body>
            //         <Card.Link href="#"><Link to={"/show/"+id}>Show</Link></Card.Link>
            //
            //     </Card.Body>
            // </Card>
        );
    }
    else {
        return (
            <h1>Post list is empty </h1>
        )
    }

};

export default PostCard;
