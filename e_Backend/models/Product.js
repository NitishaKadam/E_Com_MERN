const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
  category: String,
  image: String,
  quantity: Number,         
  rating: Number,
  discount: Number,
  offerprice: Number,
  reviews: Number,
});

module.exports = mongoose.model("Product", productSchema);
