import express from "express";
const app = express();
import productRoute from './productRoutes.js'
// router.put("/block/:id", authMiddleware, isAdmin, authControllers.blockUser);

app.use('/product', productRoute)

export default app;
