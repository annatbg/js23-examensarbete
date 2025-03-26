const express = require("express");
const serverless = require("serverless-http");
const app = express();
app.use(express.json());

const { auth } = require("./services/utils/auth/auth");

// import controllers
const userController = require("./controllers/userController");
const productController = require("./controllers/productController");

// CORS Middleware
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }
  next();
});

// Routes user
app.post("/register", userController.registerUser);
app.post("/login", userController.login);
// Routes product
app.get("/products", productController.getProducts);
app.post("/addproduct", auth, productController.createNewProduct);

exports.handler = serverless(app);
