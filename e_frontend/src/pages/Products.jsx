import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { useCart } from "../context/CartContext";
import './Products.css'

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const navigate = useNavigate();
  const { cart, addToCart } = useCart();

  const categories = [
    "All",
    "Kids",
    "Men",
    "Women",
    "Accessories",
    "Gadgets",
    "Decors",
    "Grocessory",
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get("/api/products");
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product);
    alert(`${product.name || "Product"} added to cart`);
  };

  if (loading) {
    return (
      <div style={{ padding: "50px", textAlign: "center", fontSize: "24px" }}>
        Loading...
      </div>
    );
  }

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  return (
    <div style={{ padding: "20px" }}>
      <span id="styleCart">
      <h1>Products</h1>
      <p id="pcart">
        🛒 Items in Cart: {cart.length} &nbsp;
        <button id="bcart" onClick={() => navigate("/cart")}>View Cart</button>
      </p></span>

      
      <div
        style={{
          margin: "20px 0",
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
        }}
      >
        {categories.map((cat) => (
          <button id="box"
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            style={{
              padding: "8px 16px",
              backgroundColor: selectedCategory === cat ? "green" : "brown",
              color: selectedCategory === cat ? "white" : "white",
              border: "1px solid black",
              borderRadius: "10px",
              cursor: "pointer",
              padding:"20px",
              fontSize:"15px"
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      
      {filteredProducts.length === 0 ? (
        <p style="font-size:20px">No products found in "{selectedCategory}" category.</p>
      ) : (
        <div id="box1"
          className="products-list"
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "20px",
            justifyContent: "flex-start",
          }}
        >
          {filteredProducts.map((product) => (
            <div id="box2"
              key={product._id}
              className="product-card"
              style={{
                border: "3px solid black",
                padding: "10px",
                width: "250px",
              }}
            >
              <img
                src={product.image}
                alt={product.name}
                style={{ width: "100%", height: "200px", objectFit: "cover" }}
              />
              <h2>{product.name}</h2>
              <p>
                <b>Price</b>: ₹{product.offerprice} <s>₹{product.price}</s>
              </p>
              <p>{product.description}</p>
              <Link id="view"  to={`/product/${product._id}`}>View Details</Link>
              <br />
              <button id="add" onClick={() => handleAddToCart(product)}>
                Add to Cart
              </button>
              <button id="buy" 
                onClick={() => navigate("/checkout", { state: { product } })}
              >
                Buy Now
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
