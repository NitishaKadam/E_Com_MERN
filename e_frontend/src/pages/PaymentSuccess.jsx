import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import './PaymentSuccess.css'

function PaymentSuccess() {
  const location = useLocation();
  const navigate = useNavigate();
  const { product, finalAmount, deliveryDate } = location.state || {};

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate("/");
    }, 4000); 
    return () => clearTimeout(timeout);
  }, [navigate]);

  return (
    <div id="style">
      <h1 style={{ color: "green", fontSize: "3rem" }}>🎉 Payment Successful!</h1>
      <p id="tq">Thank you for your purchase.</p>
      <p>Delivery by: <b>{deliveryDate}</b></p>
      <p>Total Paid: ₹{finalAmount}</p>

      <div style={{ marginTop: "30px", animation: "pop 0.5s ease-in-out" }}>
        <span style={{ fontSize: "3rem" }}>✅</span>
      </div>

      <style>{`
        @keyframes pop {
          0% { transform: scale(0.5); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

export default PaymentSuccess;
