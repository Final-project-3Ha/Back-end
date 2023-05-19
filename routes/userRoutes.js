import express from "express";
const router = express.Router();
import {verifyIsLoggedIn, verifyIsAdmin} from '../middleware/verifyAuthToken.js'
import userController from "../controllers/userController.js";

router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);

// user logged in routes

router.use(verifyIsLoggedIn);

router.put("/profile", userController.updateUserProfile);
router.get("/profile/:id", userController.getUserProfile);
router.post("/review/:productId", userController.writeReview);


// admin routes

router.use(verifyIsAdmin);

router.get("/", userController.getUsers);



export default router;
