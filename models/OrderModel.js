import mongoose from "mongoose";

const itemSchema = mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Product" },
  name: {
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
  image: {
    type: String,
    required: true,
  },
});

const orderSchema = mongoose.Schema({
  user: {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    fname: {
      type: String,
      required: true,
    },
    lname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone_no: {
      type: Number,
      required: true,
    },
    alt_phone_no: {
      type: Number,
      // required: true,
    },
  },
  orderItems: [itemSchema],
  shippingAddress: {
    house_no: {
      type: Number,
      // required: true,
    },
    street: {
      type: String,
      // required: true,
    },
    city: {
      type: String,
      // required: true,
    },
    state: {
      type: String,
      // required: true,
    },
    country: {
      type: String,
      // required: true,
    },
    pincode: {
      type: Number,
      // required: true,
    },
  },
  paymentMethod: {
    type: String,
    enum: ["cod", "upi", "card"],
    required: true,
  },
  isPaid: {
    type: Boolean,
    required: true,
  },
  paidAt: {
    type: Date,
    // required: true,
  },
  shippingPrice: {
    type: Number,
    required: true,
  },
  shippingDate: {
    type: Date,
    // required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  isDelivered: {
    type: Boolean,
    default: false,
  },
  deliveryDate: {
    type: Date,
    // required: true,
  },
});

const Order = mongoose.model("Order", orderSchema);

export default Order;