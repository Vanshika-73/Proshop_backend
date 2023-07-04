import mongoose from "mongoose";


const reviewSchema= mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    rating: {
        type: Number,
        required: true,
      },
    name:{
        type:String,
        required:true
    },
    comment:{
        type:String,
    },
})



const productSchema = mongoose.Schema({
    name:{
        type:String,
        required: true,

    },
    image:{
        type: String,
        required: true,
    },
    brand:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    countInStock:{
        type:Number,
        required:true,
    },
    ratings:{
        type:Number,
        //  required:true,
    },
    numReviews:{
        type:Number,
        default:0
        // required: true,
    },
    reviews:[reviewSchema]
});

const  Product = new mongoose.model('Product', productSchema);

export default Product;