import express from "express";
const app = express();
import productRoutes from './productRoutes.js'
import categoryRoutes from "./categoryRoutes.js";
import userRoutes from "./userRoutes.js";
import orderRoutes from "./orderRoutes.js";
// router.put("/block/:id", authMiddleware, isAdmin, authControllers.blockUser);

app.use('/product', productRoutes)
app.use('/categories', categoryRoutes)
app.use('/users', userRoutes)
app.use("/orders", orderRoutes);

export default app;
    