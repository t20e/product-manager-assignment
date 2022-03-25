const mongoose =require('mongoose')


//create collection *#O
const ProductSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true, 'title is required'],
        minlength: [3, 'title needs to be more than 2 letters']
    },
    price:{
        type:Number,
        required:[true, 'price is required'],
        // // min:[]
    },
    description:{
        type:String,
        required:[true,'description is required'],
        minlength: [9, 'description needs to be more than 2 letters']
    },
},
    {timestamps:true}
)
const Product = mongoose.model('Product', ProductSchema)

module.exports = Product;