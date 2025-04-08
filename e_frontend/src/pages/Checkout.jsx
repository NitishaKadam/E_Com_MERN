import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import './Checkout.css'

function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const product = location.state?.product;
  const items = location.state?.items;

  const discount = 0.1;
  const deliveryCharge = 50;
  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 5);
  const formattedDate = deliveryDate.toDateString();

  const calculateFinalAmount = (price) => {
    const discountedPrice = price - price * discount;
    return discountedPrice + deliveryCharge;
  };

  const totalAmount = product
    ? calculateFinalAmount(product.price)
    : items.reduce((sum, item) => sum + calculateFinalAmount(item.price), 0);

  const handleConfirmPayment = () => {
    setLoading(true);
    setTimeout(() => {
      navigate("/payment-success", {
        state: {
          product: product || items,
          finalAmount: totalAmount,
          deliveryDate: formattedDate,
        },
      });
    }, 2000); 
  };

  if (!product && !items) return <p>No product found for checkout.</p>;

  return (
    <div id="checkout" style={{ padding: "20px" }}>
      
      <h2>Checkout Summary {items ? "(Cart)" : ""}</h2>

      {product ? (
        <div>
          <h3>{product.name}</h3>
          <img src={product.image} alt={product.name} style={{ width: "150px" }} />
          <p>Original Price: ₹{product.price}</p>
          <p>Discount (10%): -₹{product.price * discount}</p>
          <p>Delivery Charge: ₹{deliveryCharge}</p>
          <hr />
          <h3>Total: ₹{totalAmount}</h3>
        </div>
      ) : (
        items.map((item, index) => {
          const discounted = item.price - item.price * discount;
          const total = discounted + deliveryCharge;
          return (
            <div key={index}>
              <h3>{item.name}</h3>
              <img src={item.image} alt={item.name} style={{ width: "100px" }} />
              <p>Original Price: ₹{item.price}</p>
              <p>Discount (10%): -₹{item.price * discount}</p>
              <p>Delivery Charge: ₹{deliveryCharge}</p>
              <p><b>Total: ₹{total}</b></p>
              <hr />
            </div>
          );
        })
      )}

      <p id="del">Delivery by: <b>{formattedDate}</b></p>

      {loading ? (
        <p style={{ marginTop: "20px", color: "green", fontWeight: "bold" }}>Processing payment...</p>
      ) : (
        <button id="btn"
          onClick={handleConfirmPayment}
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            backgroundColor: "green",
            color: "white",
          }}
        >
          Confirm Payment
        </button>
      )}
    </div>
  );
}

export default Checkout;
