import Product from "../models/productModel.js";

// Create a product
export const createProduct = async (req, res) => {
    try {
      const {
        name,
        price,
        description,
        category,
        image,
        quantity,
        rating,
        discount,
        offerprice,
        reviews
      } = req.body;
  
      const newProduct = await Product.create({
        name,
        price,
        description,
        category,
        image,
        quantity,
        rating,
        discount,
        offerprice,
        reviews
      });
  
      res.status(201).json({ message: "Product created", product: newProduct });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };
  

  
// Get all products
export const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Get product by ID
export const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: "Product not found" });
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Update a product
export const updateProduct = async (req, res) => {
    try {
        const {
            name,
            price,
            description,
            category,
            image,
            quantity,
            rating,
            discount,
            offerprice,
            reviews
        } = req.body;

        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            {
                name,
                price,
                description,
                category,
                image,
                quantity,
                rating,
                discount,
                offerprice,
                reviews
            },
            { new: true }
        );

        if (!updatedProduct) return res.status(404).json({ message: "Product not found" });
        res.json({ message: "Product updated", product: updatedProduct });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Delete a product
export const deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) return res.status(404).json({ message: "Product not found" });
        res.json({ message: "Product deleted" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
