import React from 'react';
import {useState, useEffect} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import '../css/homepage.css'

const AllProducts = () => {
    const [productList, setProductList] = useState([]) 
    let [title, setTitle] = useState("")
    let [price, setPrice] = useState("")
    let [description, setDescription] = useState("")
    let [formErrors, setFormErrors] = useState({})
    const redirect = useHistory();

    useEffect( () => {
        axios.get("http://localhost:8000/api/products")
            .then(res =>{
                setProductList(res.data.results);
            })
            .catch(err=>{
                console.log('error fetching', err);
            })
    }, [productList]);

        //create product
    const createProduct =(e) =>{
        e.preventDefault();
        let formHolder = {title, price, description};
        axios.post('http://localhost:8000/api/product/add', formHolder)
            .then(res=>{
                if(res.data.error){ 
                    setFormErrors(res.data.error.errors)
                    console.log('err', formErrors);
                }else{
                    setTitle("")
                    setPrice("")
                    setDescription("")
                    setFormErrors({})
                    redirect.push('/')
                }
            })
            .catch(err=>{
                console.log(err);
            })


    }
    const deleteProduct =(product) =>{
        axios.delete(`http://localhost:8000/api/product/delete/${product._id}`)
            .then(res=>{
                let filterProductList = productList.filter((product) =>{
                    return product._id != product;
                })
                setProductList(filterProductList)
            })
            .catch(err=>{
                console.log(err, 'error deleting product');
            })
    }

    return (
        <div>
            <div>
                <form onSubmit={createProduct} id='form'>
                    <div>
                        <label htmlFor="">Title</label>
                        <input type="text" onChange={(e)=> {setTitle(e.target.value)}} value={title} />
                        <p>{formErrors.title?.message}</p>
                    </div>
                    <div>
                        <label htmlFor="">Price:</label>
                        <input type="text" onChange={(e)=> {setPrice(e.target.value)}} value={price} />
                        <p>{formErrors.price?.message}</p>
                    </div>
                    <div>
                        <label htmlFor="">Descriptions:</label>
                        <textarea onChange={(e)=> {setDescription(e.target.value)}} value={description}  cols="25" rows="10"></textarea>
                        <p>{formErrors.description?.message}</p>
                    </div>
                    <input type="submit" id='submitBTN' value="Add Product" />

                </form>
            </div>
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
                                <button><Link to={`/edit/${allProducts._id}`}>Update Product!</Link></button>
                                <button onClick={()=> {deleteProduct(allProducts)}}>Delete Product</button>

                            </div>
                        )
                    } )
                }
            </div>
        </div>
    );
};


export default AllProducts;