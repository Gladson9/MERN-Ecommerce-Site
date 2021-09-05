const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema;

const ProductsInCartSchema = new mongoose.Schema({
  product: {
    type: ObjectId,
    ref: "Product",
  },
  name: String,
  count: Number,
  price: Number,
});

const ProductsInCart = mongoose.model("ProductsInCart", ProductsInCartSchema);

const orderSchema = new mongoose.Schema(
  {
    products: [ProductsInCartSchema],
    transaction_id: {},
    amount: { type: Number },
    address: String,
    status: {
      type: String,
      default: "Received",
      enum: ["Cancelled", "Delivered", "Shipped", "Processing", "Received"], //enum is something like default(we provide) values which can be used
    },
    updated: Date,
    user: {
      type: ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
module.exports = { Order, ProductsInCart };
