import express from "express";
const router = express.Router();
import productController from "../controllers/ProductController.js";

router.get("/", productController.getProducts);
router.get("/category/:categoryName", productController.getProducts);
router.get("/category/:categoryName/search/:searchQuery", productController.getProducts);
router.get("/search/:searchQuery", productController.getProducts);
router.get("/get-one/:id", productController.getProductById);
router.get("/bestsellers", productController.getBestsellers);


// Admin routes

router.get("/admin", productController.adminGetProducts);
router.delete("/admin/:id", productController.adminDeleteProduct);
router.post("/admin", productController.adminCreateProduct);
router.post("/admin/upload", productController.adminUpload);
router.put("/admin/:id", productController.adminUpdateProduct);

export default router;

