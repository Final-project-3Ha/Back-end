import express from "express";
const router = express.Router();
import userController from "../controllers/userController.js";

router.post("/register", userController.registerUser);

// admin routes
router.get("/", userController.getUsers);



export default router;
