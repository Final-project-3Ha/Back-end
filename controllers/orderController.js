import Order from "../models/OrderModel.js";
// import User from "../models/UserModel.js";
import Product from "../models/ProductModel.js";
import { Types } from "mongoose";
const { ObjectId } = Types;

const getUserOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: new ObjectId(req.user._id) });
    res.send(orders);
  } catch (error) {
    next(error);
  }
};

// Get the Order

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

// Create Order

const createOrder = async (req, res, next) => {
  try {
    const { cartItems, orderTotal, paymentMethod } = req.body;
    if (!cartItems || !orderTotal || !paymentMethod) {
      return res.status(400).send("All inputs are required");
    }

    let ids = cartItems.map((item) => {
      return item.productId
    })

    let qty = cartItems.map((item) => {
      return Number(item.quantity);
    });
    await Product.find({_id: {$in: ids}}).then((products) => {
      products.forEach(function (product, idx) {
        product.sales += qty[idx];
        product.save();
      })
    })

    const order = new Order({
      user: new ObjectId(req.user._id),
      orderTotal: orderTotal,
      cartItems: cartItems,
      paymentMethod: paymentMethod,
    })

    const createOrder = await order.save()
    res.status(201).send(createOrder)
    
  } catch (err) {
    next(err);
  }
};

export default { getUserOrders, getOrder, createOrder};
