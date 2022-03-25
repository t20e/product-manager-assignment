import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios, { Axios } from 'axios';

const OneProduct = () => {
    let {_id} = useParams()
    let[product, setProduct] = useState([])
    useEffect(()=>{
        axios.get(`http://localhost:8000/api/product/${_id}`)
        .then(res=>{
            setProduct(res.data.results)
            console.log(product);
        })
        .catch(err=>{
            console.log('error getting one product!')
        });
    }, []);
    return (
        <div>
            <ul>
                <li>title: {product.title}</li>
                <li>price: {product.price}</li>
                <li>description: {product.description}</li>
                <li>Product number: {product._id}</li>
            </ul>
        </div>
    );
};


export default OneProduct;