const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const colors = require("colors");
// for ejs engine
const ejs = require("ejs");
app.set("view engine", "ejs");
const errorHandler = require("./middleware/errorHandler");
const usersRoutes = require("./routes/v1/users.routes");
const productRoutes = require("./routes/v1/products.routes");
const reviewsRoutes = require("./routes/v1/reviews.routes");
const shippingRoutes = require("./routes/v1/shipping.routes");
const paymentRoutes = require("./routes/v1/payment.routes");
const forgotPasswordRoutes = require("./routes/v1/forgotPassword.routes");
const resetPasswordRoutes = require("./routes/v1/resetPassword.routes");

// middleware
app.use(cors());
app.use(express.json());
// to get ejs files data
app.use(express.urlencoded({ extended: false }));
// to serve upload folders (images)
app.use(express.static("./upload"));

// routes
app.use("/api/v1/user", usersRoutes);
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/reviews", reviewsRoutes);
app.use("/api/v1/shipping", shippingRoutes);
app.use("/api/v1/payment", paymentRoutes);
// +++++++++++Forgot Password++++++++++++
app.use("/api/v1/forgot-password", forgotPasswordRoutes);
app.use("/api/v1/reset-password", resetPasswordRoutes);

app.get("/", async (req, res) => {
  res.send("Hello WORLD This is a CREATIVE AGENCY SERVER");
});

app.all("*", (req, res) => {
  res.json({ message: "No route is found" });
});
// here is errorHandler function
app.use(errorHandler);

module.exports = app;
