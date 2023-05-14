import express from "express";
const router = express.Router();
import categoryController from "../controllers/categoryController.js";

router.get("/", categoryController.getCategories);
router.post("/", categoryController.newCategory)
router.delete("/:category", categoryController.deleteCategory);
router.post("/attr", categoryController.saveAttr);


export default router;


// router.get("/", controller.getAll);
// router.get("/:id", controller.get);
// router.post("/", controller.post);
// router.put("/:id", controller.put);
// router.delete("/:id", controller.delete);