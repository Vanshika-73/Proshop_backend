import expressAsyncHandler from "express-async-handler";
import Order from "../models/OrderModel.js";

const getOrders = expressAsyncHandler(async (req, res, next) => {
  try {
    const result = await Order.find();
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
});

const getOrder = expressAsyncHandler(async (req, res, next) => {
  try {
    const { _id } = req.params;
    const result = await Order.findOne({ _id });
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
});

const createOrder = expressAsyncHandler(async (req, res, next) => {
  try {
    const data = req.body;
    const result = await Order.create(data);
    res.status(201).send({ success: result ? true : false });
  } catch (error) {
    next(error);
  }
});

const updateOrder = expressAsyncHandler(async (req, res, next) => {
  try {
    const { _id } = req.params;
    const data = req.body;
    console.log("id",_id,req.body);
    const result = await Order.updateOne({ _id }, data);
    if (result.modifiedCount === 1) {
      const orders = await Order.find();
      res.status(200).send(orders);
    }
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
});

const deleteOrder = expressAsyncHandler(async (req, res, next) => {
  try {
    const { _id } = req.params;
    console.log("des",_id)
    const result = await Order.deleteOne({ _id });
    if (result.deletedCount === 1) {
      const orders = await Order.find();
      res.status(200).send(orders);
    }
  } catch (error) {
    next(error);
  }
});

export { getOrders, getOrder, createOrder, updateOrder, deleteOrder };