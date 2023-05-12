import express from "express";
const router = express.Router();
import getProduct from "../controllers/ProductController.js"

router.get("/", getProduct)

export default router;

