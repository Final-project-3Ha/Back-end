import express from "express";
const router = express.Router();
import orderController from "../controllers/orderController.js";
import {verifyIsLoggedIn, verifyIsAdmin} from '../middleware/verifyAuthToken.js'


// user routes 
router.use(verifyIsLoggedIn);

router.get("/", orderController.getUserOrders);
router.get("/user/:id", orderController.getOrder);
router.post("/", orderController.createOrder);

// Admin routes

router.use(verifyIsAdmin)


export default router;
