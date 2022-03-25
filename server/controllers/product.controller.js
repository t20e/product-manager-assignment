const Product = require('../models/product.model')
//get one product
module.exports.getOneProduct =(req,res) =>{
    Product.findOne({ _id: req.params.id})
        .then(product =>{
            res.json({results:product})
        })
        .catch(err => res.json({message: 'something went wrong getting one product', error:err}));
}
// //create product
module.exports.createProduct = (req,res) =>{
    Product.create(req.body)
        .then(newProduct =>{
            res.json({results:newProduct})
            console.log(newProduct);
        })
        .catch(err => res.json({message: 'something went creating product', error:err}));
}

//find all products
module.exports.findAllProducts = (req, res) =>{
    Product.find()
        .then(allProducts =>{
            res.json({results:allProducts})
        })
        .catch(err => res.json({message: 'something went wrong fetching', error:err}));
}
//edit product
module.exports.editProduct = (req,res) =>{
    Product.findOneAndUpdate(
        {_id: req.params.id},
        req.body,
        {new: true, runValidators:true}
        )
        .then(editingProduct=>{
            res.json({results:editingProduct})
        })
        .catch(err =>res.json({message:'error updating product', error:err}));
}

//delete product
module.exports.deleteProduct = (req,res) =>{
    Product.findByIdAndDelete(req.params.id)
        .then(deletedProduct =>{
            res.json({results:deletedProduct})
        })
        .catch(err=> res.json({message: 'error deleting product', error:err}))
}
//delete all products
module.exports.deleteAllProduct = (req,res) =>{
    Product.remove()
        .then(deletedProduct =>{
            res.json({results:deletedProduct})
        })
        .catch(err=> res.json({message: 'error deleting product', error:err}))
}