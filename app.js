require("dotenv").config();

const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();
const path = require("path");
// My Routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");
const orderRoutes = require("./routes/order");
const stripeRoutes = require("./routes/stripePayment");
const paymentBraintreeRoutes = require("./routes/payment");

// Database connection
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("DB CONNECTED");
  })
  .catch(() => {
    console.log("Database not Connected");
  });

// Middlewares
// app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());
app.use(cors());

// Routes
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", orderRoutes);
app.use("/api", stripeRoutes);
app.use("/api", paymentBraintreeRoutes);
// port
const port = process.env.PORT || 8000;

// Starting a server
app.listen(port, () => {
  console.log(`app is running at ${port}`);
});

if (process.env.NODE_ENV == "production") {
  console.log("Dir Name", __dirname);
  app.use(express.static(path.join(__dirname, "projectfrontend/build")));
  app.get("*", (req, res) => {
    res.sendFile(
      path.join(__dirname, "projectfrontend", "build", "index.html")
    );
  });
}
