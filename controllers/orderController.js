import Order from "../models/OrderModel.js";
// import User from "../models/UserModel.js";
import Product from "../models/ProductModel.js";
import { Types } from "mongoose";
const { ObjectId } = Types;

// get All the Orders for Users

const getUserOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: new ObjectId(req.user._id) });
    res.send(orders);
  } catch (error) {
    next(error);
  }
};

// Get One Order for Users

const getOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("user", "-password -isAdmin -_id -__v -createdAt -updatedAt")
      .orFail();
    res.send(order);
  } catch (err) {
    next(err);
  }
};

// User Create Order

const createOrder = async (req, res, next) => {
  try {
    const { cartItems, orderTotal, paymentMethod } = req.body;
    if (!cartItems || !orderTotal || !paymentMethod) {
      return res.status(400).send("All inputs are required");
    }

    let ids = cartItems.map((item) => {
      return item.productId;
    });

    let qty = cartItems.map((item) => {
      return Number(item.quantity);
    });
    await Product.find({ _id: { $in: ids } }).then((products) => {
      products.forEach(function (product, idx) {
        product.sales += qty[idx];
        product.save();
      });
    });

    const order = new Order({
      user: new ObjectId(req.user._id),
      orderTotal: orderTotal,
      cartItems: cartItems,
      paymentMethod: paymentMethod,
    });

    const createOrder = await order.save();
    res.status(201).send(createOrder);
  } catch (err) {
    next(err);
  }
};

//  Admin Update order to Paid

const updateOrderToPaid = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id).orFail();
    order.isPaid = true;
    order.paidAt = Date.now();
    const updateOrder = await order.save();
    res.send(updateOrder);
  } catch (err) {
    next(err);
  }
};

// Make order as delivered by Admin when the customer is paid for this order

const updateOrderToDelivered = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id).orFail();
    order.isDelivered = true;
    order.deliveredAt = Date.now();
    const updateOrder = await order.save();
    res.send(updateOrder);
  } catch (err) {
    next(err);
  }
};

// Admin Get All Orders

const getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({})
      .populate("user", "-password")
      .sort({ paymentMethod: "desc" });
    res.send(orders);
  } catch (error) {
    next(error);
  }
};

// Get orders for Analysis

const getOrderForAnalysis = async (req, res, next) => {
  try {
    const start = new Date(req.params.date);
    start.setHours(0, 0, 0, 0);
    const end = new Date(req.params.date);
    end.setHours(23, 59, 59, 999);

    const order = await Order.findOne({
      createdAt: {
        $gte: start,
        $lte: end,
      },
    }).sort({ createdAt: "asc" });

    res.send(order);
  } catch (err) {
    next(err);
  }
};

export default {
  getUserOrders,
  getOrder,
  createOrder,
  updateOrderToPaid,
  updateOrderToDelivered,
  getOrders,
  getOrderForAnalysis,
};
