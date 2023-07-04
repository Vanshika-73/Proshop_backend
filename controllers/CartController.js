import Cart from "../models/CartModel.js";
import asyncHandler from "express-async-handler";

// @desc- read user cart
// @route-GET/api/cart/:user
// @access- public
const getUserCart = asyncHandler(async (req,res,next)=>{
  try {
    const {user} = req.params;
    const result = await Cart.findOne({user});
    res.status(200).send(result);
  } catch (error) {
    next(error);  
  }
})

// @desc- create user cart
// @route-POST/api/cart/:user
// @access- public
const createUserCart = asyncHandler(async (req, res, next) => {
  try {
    const { user } = req.params;
    const result = await Cart.create({ user, items: [] });
    res.status(200).send({ success: true });
  } catch (error) {
    next(error);
  }
});

// @desc- add items in user cart
// @route-PUT/api/cart/:user
// @access- public
const addCartItem = asyncHandler(async (req, res, next) => {
  try {
    const { user } = req.params;
    const { product } = req.body;
    const existItem = await Cart.updateOne(
      { user,"items._id":product._id},
      { $set: { "items.$.qty":product.qty  } }
    );
    console.log("ex",existItem);
    if(existItem.matchedCount != 1 || existItem.modifiedCount===0){
      const result = await Cart.updateOne(
        { user },
        { $push: { items: product } }
      );
      if(result.modifiedCount===0)throw new Error("item not added to cart");
    }
    let data= await Cart.findOne({user});
    res.status(200).send(data);
   
    
  } catch (error) {
    next(error);
  }
});

// @desc- update item qty in user cart
// @route-PUT/api/cart/qty/:user
// @access- public
const updateQty = asyncHandler(async (req, res, next) => {
  try {
    const { user } = req.params;

    const { _id, qty  } = req.body;
    const result = await Cart.updateOne(
      { user, "items._id":_id },
      { $set: { "items.$.qty":qty  } }
    );
    if(result.modifiedCount===0)throw new Error("item qty not updated in cart");
    let data= await Cart.findOne({user});
    res.status(200).send(data);
  } catch (error) {
    next(error);
  }
});

// @desc- delete item in user cart
// @route- DELETE/api/cart/:user/:_id
// @access- public
const deleteCartItem = asyncHandler(async (req, res, next) => {
  try {
    const { user, _id } = req.params;
    const result = await Cart.updateOne(
      { user },
      { $pull: { "items": {_id }} }
    );
    if(result.deleteCount===0)throw new Error("item not deleted in cart");
    let data= await Cart.findOne({user});
    res.status(200).send(data);
  } catch (error) {
    next(error);
  }
});

const clearCart = asyncHandler(async(req,res,next)=>{
  try {
    const {user} = req.params;
    const result = await Cart.updateOne({user},{$set: {items:[]}},{new:true});
    res.status(200).send(result);
  } catch (error) {
    next(error)
  }
})


export {createUserCart,addCartItem,updateQty,deleteCartItem,getUserCart,clearCart};