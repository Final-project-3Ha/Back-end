import express from "express";
const router = express.Router();
import categoryController from "../controllers/categoryController.js";
import {verifyIsLoggedIn, verifyIsAdmin} from '../middleware/verifyAuthToken.js'
import cors from "cors";
router.use(cors());

router.use(verifyIsLoggedIn)
router.use(verifyIsAdmin)
router.get("/", categoryController.getCategories);
router.post("/", categoryController.newCategory)
router.delete("/:category", categoryController.deleteCategory);
router.post("/attr", categoryController.saveAttr);


export default router;


