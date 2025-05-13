// const express = require('express');
//& we had  added type : "module" in package.json , so we can use import instead of require.
import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./Config/db.js";
// import productModel from "./models/product.model.js";
// import mongoose from "mongoose";
import productRoutes from "./Routes/product_routes.js";
dotenv.config();

const app = express();

//! Middleware
//~ Without this, req.body will be undefined.
//~ to parse incoming JSON requests and put the parsed data in -- req.body --
app.use(express.json());



//& This productRoutes can be any name.

//& /api/products is a base URL .it will be present in the URL even if we don't add it in the postman/router.
app.use("/api/products", productRoutes);


app.listen(8000, () => {
  connectDB();
  console.log("Server is running on port : http://localhost:8000");
});
