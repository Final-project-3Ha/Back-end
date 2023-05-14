import express from "express";
const router = express.Router();
import productController from "../controllers/ProductController.js";

router.get("/", productController.getProducts);
// router.post("/", productController.newCategory)
// router.delete("/:category", productController.deleteCategory);
// router.post("/attr", productController.saveAttr);

export default router;

