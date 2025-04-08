import express from "express";
import Cart from "../models/Cart.js";

const router = express.Router();

router.post("/save", async (req, res) => {
  const { userId, items } = req.body;

  try {
    let cart = await Cart.findOne({ userId });

    if (cart) {
      cart.items = items; 
    } else {
      cart = new Cart({ userId, items });
    }

    await cart.save();
    res.status(200).json({ message: "Cart saved successfully", cart });
  } catch (err) {
    res.status(500).json({ error: "Failed to save cart", details: err.message });
  }
});

router.get("/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const cart = await Cart.findOne({ userId }).populate("items.productId");
    if (!cart) return res.status(404).json({ message: "Cart not found" });

   
    const items = cart.items.map((item) => ({
      ...item.productId._doc, 
      quantity: item.quantity, 
    }));

    res.status(200).json({ items }); 
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch cart", details: err.message });
  }
});


export default router;
