import mongoose from "mongoose";

const itemSchema = mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Product" },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  qty: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

const cartSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  items: [itemSchema],
});

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;
