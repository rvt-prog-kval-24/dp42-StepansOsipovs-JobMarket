import React, {useEffect, useState} from 'react';
import classes from "../styles/main.module.css"
import Card from 'react-bootstrap/Card';
import {Link} from "react-router-dom";
import {ListGroup} from "react-bootstrap";
import image from "../images/icon-image-not-found-free-vector.jpg"


const PostCard = ({id,post_header, salary,post_type,company}) => {
    if (id != null) {


        return (

            <div className={classes.product} key = {id}>
                <div className={classes.circle}>
                    <img src={image}/>
                </div>
                <div className={classes.content}>
                   <h5><Link to={`/show/${id}`}>{post_header}</Link></h5>
                   <hr/>
                    <h5>This post is shared by {company}</h5>
                    <h6>Salary: {salary}$</h6>


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
