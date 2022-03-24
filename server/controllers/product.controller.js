const Product = require('../models/product.model')
//get one product
module.exports.getOneProduct =(req,res) =>{
    Product.findOne({ _id: req.params.id})
        .then(product =>{
            res.json({result:product})
        })
        .catch(err => res.json({message: 'something went wrong fetching', error:err}));
}
//create product
module.exports.createProduct = (req,res) =>{
    Product.create(req.body)
        .then(newProduct =>{
            res.json({results:newProduct})
        })
        .catch(err => res.json({message: 'something went wrong fetching', error:err}));
}
//find all products
module.exports.findAllProducts = (req, res) =>{
    Product.find()
        .then(allProducts =>{
            res.json({results:allProducts})
        })
        .catch(err => res.json({message: 'something went wrong fetching', error:err}));
}