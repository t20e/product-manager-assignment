import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios, { Axios } from 'axios';
import { useHistory } from 'react-router-dom';
import '../css/editPage.css';

const EditProduct = () => {
    let {_id} = useParams()
    
    const [product, setProduct] = useState({
        title:'',
        price:'',
        description:''
    })
    const [formErrors, setFormErrors] = useState({})
    const redirect = useHistory();

    useEffect(()=>{
        axios.get(`http://localhost:8000/api/product/${_id}`)
        .then(res=>{
            setProduct(res.data.results)
        })
        .catch(err=>{
            console.log('error getting one product!')
        });
    }, [_id]);
    
    //change inputs of the product 
    const editInputs = (e) =>{
        //*** IF U ARE USING A CHECKBOX OR SOMETHING OTHER THEN TEXT OR # USE AN IF STATEMENTS */
        setProduct({
            ...product,
            [e.target.name]: e.target.value
        })
    }
        //edit product
    const editProduct =(e) =>{
        e.preventDefault();
        axios.put(`http://localhost:8000/api/edit/${_id}`, product)
            .then(res=>{
                if(res.data.error){ 
                    setFormErrors(res.data.error.errors)
                    console.log('err', formErrors);
                }else{
                    setFormErrors({})
                    redirect.push(`/${_id}`)
                }
            })
            .catch(err=>{
                console.log(err);
            })
    }
    //delete
    const deleteProduct =() =>{
        axios.delete(`http://localhost:8000/api/product/delete/${_id}`)
            .then(res=>{
                redirect.push('/')
            })
            .catch(err=>{
                console.log('error deleting product', err);
            })
    }

    return (
        <div className='mainDiv'>
            <h1>Edit Product</h1>
            <form onSubmit={editProduct}>
                <div>
                    <label htmlFor="">Title</label>
                    <input type="text" name='title' onChange={editInputs} value={product.title} />
                    <p>{formErrors.title?.message}</p>
                </div>
                <div>
                    <label htmlFor="">Price:</label>
                    <input type="text" name='price' onChange={editInputs} value={product.price} />
                    <p>{formErrors.price?.message}</p>
                </div>
                <div>
                    <label htmlFor="">Descriptions:</label>
                    <textarea name='description' onChange={editInputs} value={product.description}  cols="25" rows="10"></textarea>
                    <p>{formErrors.description?.message}</p>
                </div>
                <input type="submit" id='submitBTN' value="Edit Product" />

            </form>
            <button onClick={()=> {deleteProduct(product)}}>Delete Product</button>
            <button><Link to={`/`}>GO HOME </Link></button>


    </div>
    );
};


export default EditProduct;
