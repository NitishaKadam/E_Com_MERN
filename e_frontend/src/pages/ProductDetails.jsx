import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`/api/products/${id}`);
        console.log("Fetched product:", data);
        setProduct(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product:", error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <p style="font-size:30px;">Loading product...</p>;
  if (!product) return <p>No product found!</p>;

  return (
    <div id="prod" style={{ padding: "20px" }}>
      <h1>{product.name}</h1> 
      <img src={product.image} alt={product.name} style={{ width: "300px" }} /> 
      <p><strong>Price:</strong> ₹{product.price}</p>
      <p><strong>Offer Price:</strong> ₹{product.offerprice}</p>
      <p><strong>Discount:</strong> {product.discount}%</p>
      <p><strong>Category:</strong> {product.category}</p>
      <p><strong>Rating:</strong> {product.rating}</p>
      <p><strong>Reviews:</strong> {product.reviews}</p>
      <p><strong>Description:</strong> {product.description}</p>
    </div>
  );
}
