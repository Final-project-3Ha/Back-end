import express from "express";
import jwt from "jsonwebtoken";
const app = express();
import productRoutes from './productRoutes.js'
import categoryRoutes from "./categoryRoutes.js";
import userRoutes from "./userRoutes.js";
import orderRoutes from "./orderRoutes.js";
// router.put("/block/:id", authMiddleware, isAdmin, authControllers.blockUser);

app.get("/logout", (req, res) => {
  return res.clearCookie("access_token").send("access token cleared");
});

// app.get("/get-token", (req, res) => {
//   try {
//     const accessToken = req.cookies["access_token"];
//     const decoded = jwt.verify(accessToken, process.env.JWT_SECRET_KEY);
//     return res.json({ token: decoded.name, isAdmin: decoded.isAdmin });
//   } catch (err) {
//     return res.status(401).send("Unauthorized. Invalid Token");
//   }
// });

app.get("/get-token", (req, res) => {
  try {
    const accessToken = req.cookies["access_token"];
    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET_KEY);

    // Set the SameSite attribute 
    res.cookie("access_token", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });

    return res.json({ token: decoded.name, isAdmin: decoded.isAdmin });
  } catch (err) {
    return res.status(401).send("Unauthorized. Invalid Token");
  }
});


app.use('/products', productRoutes) 
app.use('/categories', categoryRoutes)
app.use('/users', userRoutes)
app.use('/orders', orderRoutes);

export default app;
    