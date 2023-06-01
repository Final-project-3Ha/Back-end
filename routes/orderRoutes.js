import express from "express";
const router = express.Router();
import orderController from "../controllers/orderController.js";
import {verifyIsLoggedIn, verifyIsAdmin} from '../middleware/verifyAuthToken.js'
import cors from "cors";
router.use(cors());

// user routes 
router.use(verifyIsLoggedIn);

router.get("/", orderController.getUserOrders);
router.get("/user/:id", orderController.getOrder);
router.post("/", orderController.createOrder);
router.put("/paid/:id", orderController.updateOrderToPaid);

// Admin routes

router.use(verifyIsAdmin)

router.put("/delivered/:id", orderController.updateOrderToDelivered);
router.get("/admin", orderController.getOrders);
router.get("/analysis/:date", orderController.getOrderForAnalysis);



export default router;
