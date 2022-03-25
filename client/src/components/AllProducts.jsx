import React from 'react';
import {useState, useEffect} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AllProducts = () => {
    const [productList, setProductList] = useState([]) 
    useEffect( () => {
        axios.get("http://localhost:8000/api/products")
            .then(res =>{
                setProductList(res.data.results);
            })
            .catch(err=>{
                console.log('error fetching', err);
            })
    }, [productList]);


    return (
        <div>
            <h1>All Products</h1>
            {
                productList.map( (allProducts, i) =>{
                    return(
                        <div key={i}>
                            <h4>Title: {allProducts.title}</h4>
                            <h4>Price: ${allProducts.price}</h4>
                            <h4>Description: {allProducts.description}</h4>
                            <button><Link to={`/${allProducts._id}`}>See Product page!</Link></button>
                        </div>
                    )
                } )
            }
        </div>
    );
};


export default AllProducts;