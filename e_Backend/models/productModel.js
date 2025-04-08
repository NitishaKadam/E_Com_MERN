import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  offerprice: {
    type: Number,
    required: false,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: false,
  },
  category: {
    type: String,
    required: false,
  },
  quantity: {
    type: Number,
    required: false,
  },
}, { timestamps: true });

const Product = mongoose.model("Product", productSchema);
export default Product;
