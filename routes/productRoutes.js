import express from "express";
const router = express.Router();
import productController from "../controllers/ProductController.js";

router.get("/", productController.getProducts);
router.get("/category/:categoryName", productController.getProducts);
router.get("/category/:categoryName/search/:searchQuery", productController.getProducts);
router.get("/search/:searchQuery", productController.getProducts);
router.get("/:id", productController.getProductById);


// router.post("/", productController.newCategory)
// router.delete("/:category", productController.deleteCategory);
// router.post("/attr", productController.saveAttr);

export default router;

