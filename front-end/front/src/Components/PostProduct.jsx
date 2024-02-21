import React, {useEffect, useState} from 'react';
import axios from "axios";

import classes from "../styles/main.module.css"
import {Link, useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import {useContext} from "react";
import {Loading} from "../context";






const PostProduct = () => {

    const {setLoading} = useContext(Loading);

    const [type,setType]=useState([]);

    const [product, setProduct] = useState({sku: '', name: '', price: '', image:'', productType: ''})
    const [error, setError] = useState();
    const [attribute, setAttribute] = useState();
    const [filter,setFilter]=useState({option:''});

    const {

        formState:{errors,isValid},
        handleSubmit,

    }=useForm({
        mode:"onBlur",
        defaultValues: {
            productType: ""
        }
    });


    useEffect(() => {
        if(product.productType)
            fetchFields(product.productType);

    }, [product.productType]);

    const fetchFields = (type) => {
        axios.get( `http://localhost/magaz/back-end/public/attribute?type=`+ type)
            .then(response => {

                 setAttribute(response.data);
            })
    }





    function getType(){
        axios.get(`http://localhost/magaz/back-end/public/type`)
            .then(response => {

            setType(response.data);

            });


    }
    useEffect(()=>{
        getType();

    }, []);

    const navigate = useNavigate();
    //add product
    function addProduct(e) {

        axios.post( 'http://localhost/magaz/back-end/public/product/saveApi',product)
            .then(response => {

                if(response.data ==="ok") {
                    navigate('/');
                } else {
                    setError(response.data);

                }
            });
    }

    return (

        <form id="product_form" onSubmit={handleSubmit(addProduct)}>

            <div>

                <header>
                    <h1>Product Add</h1>
                    <div className={classes.buttons}>
                        <button   type="submit" >Save</button>
                        &nbsp;&nbsp;&nbsp;
                        <button><Link to='/'>Cancel</Link></button>

                    </div>
                    <hr/>
                </header>
                <br/>
                <br/>
                <div>
                    {error
                        ?
                        <h3 style={{color:"red"}} >{error}</h3>
                        :
                        <p></p>
                    }
                    <div>
                        <label>SKU</label>
                        <input
                            id="sku"
                            placeholder='SKU'
                            onChange={e => setProduct({...product, sku: e.target.value})}
                        />
                    </div>

                    <div>
                        <label>Name</label>
                        <input
                            id="name"
                            placeholder='Name'
                            onChange={e => setProduct({...product, name: e.target.value})}
                        />
                    </div>

                    <div>
                        <label>Image</label>
                        <input
                            type="file"
                            id="name"
                            placeholder='Name'
                            onChange={e => setProduct({...product, image: e.target.value})}
                        />
                    </div>
                    <div>
                        <label>Price ($)</label>
                        <input
                            id="price"
                            placeholder='Price'
                            onChange={e => setProduct({...product, price: e.target.value})}
                        />
                    </div>
                </div>

                <label>Type Switcher </label>


                <select
                    // defaultValue={""}
                    id="productType"
                    value={product.productType}
                    onChange={(e) => {

                        setProduct({
                            sku: product.sku,
                            name: product.name,
                            price: product.price,
                            productType: e.target.value
                        });

                    }}
                >
                    <option value="" disabled>Type Switcher</option>
                    {type.length ?
                        type.map((t) =>
                            <option key={t.type} value={t.type} id={t.type}>{t.type}</option>
                        )
                        :
                        <option>Empty type</option>
                    }
                </select>

            </div>
            <div>     {attribute ?
                Object.keys(attribute['fields']).map(index =>
                    <div key={attribute['fields'][index][0]}>
                        <label>{attribute['fields'][index][0].toUpperCase()+ attribute['fields'][index].slice(1) } {attribute['$unit']} </label>
                        <input
                            id={attribute['fields'][index]}
                            placeholder={attribute['fields'][index][0].toUpperCase()+ attribute['fields'][index].slice(1)}
                            onChange={e => setProduct({...product, [attribute['fields'][index]]: e.target.value})}
                        />
                    </div>
                )
                :
                <p></p>
            }
            </div>
        </form>

    );
};

export default PostProduct;
