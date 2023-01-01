const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const colors = require("colors");
const errorHandler = require("./middleware/errorHandler");
const usersRoutes = require("./routes/v1/users.routes");
const productRoutes = require("./routes/v1/products.routes");
const reviewsRoutes = require("./routes/v1/reviews.routes");

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


app.get("/", async (req, res) => {
  res.send("Hello WORLD This is a CREATIVE AGENCY SERVER");
});

app.all("*", (req, res) => {
  res.json({ message: "No route is found" });
});
// here is errorHandler function
app.use(errorHandler);

module.exports = app;
