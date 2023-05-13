import express from "express";
const router = express.Router();
import getOrders from "../controllers/orderController.js";

router.get("/", getOrders);

export default router;
