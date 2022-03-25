const ProductController = require('../controllers/product.controller')

module.exports = (app) =>{
    app.get('/api/products', ProductController.findAllProducts)
    app.post('/api/product/add', ProductController.createProduct)
    app.get('/api/product/:id', ProductController.getOneProduct)
    //delete
    app.delete('/api/product/delete/:id', ProductController.deleteProduct)
    app.delete('/api/product/deleteAll', ProductController.deleteAllProduct)
    //update
    app.put('/api/edit/:id', ProductController.editProduct)
}