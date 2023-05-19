import express from "express";
const router = express.Router();
import userController from "../controllers/userController.js";

router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);

// admin routes
router.get("/", userController.getUsers);



export default router;
