import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import './Cart.css'

function Cart() {
  const { cart, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();

  
  const handleBuyAll = () => {
    navigate("/checkout", { state: { items: cart } });
  };


  const handleBuySingle = (item) => {
    navigate("/checkout", { state: { product: item } });
  };

  return (
    <div id="cart" style={{ padding: "20px" }}>
      <h1>Your Cart</h1>

      {cart.length === 0 ? (
        <p id="no">No items in cart</p>
      ) : (
        <div>
          {cart.map((item, index) => (
            <div
              key={index}
              style={{
                borderBottom: "1px solid #ccc",
                padding: "10px 0",
                display: "flex",
                gap: "20px",
                alignItems: "center"
              }}
            >
              <img src={item.image} alt={item.name} style={{ width: "100px" }} />
              <div>
                <h3>{item.name}</h3>
                <p>Price: ₹{item.price}</p>
                <p>{item.description}</p>
                <p>Quantity: {item.quantity || 1}</p>

                
                <button
                  onClick={() => removeFromCart(item._id)}
                  style={{
                    padding: "5px 10px",
                    backgroundColor: "#e53935",
                    color: "#fff",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                    marginTop: "5px",
                    marginRight: "10px"
                  }}
                >
                  Remove
                </button>

               
                <button
                  onClick={() => handleBuySingle(item)}
                  style={{
                    padding: "5px 10px",
                    backgroundColor: "#4caf50",
                    color: "#fff",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                    marginTop: "5px"
                  }}
                >
                  Buy Now
                </button>
              </div>
            </div>
          ))}

          
          <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
            <button
              onClick={clearCart}
              style={{
                padding: "10px 20px",
                backgroundColor: "#000",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer"
              }}
            >
              Clear Cart
            </button>

            <button
              onClick={handleBuyAll}
              style={{
                padding: "10px 20px",
                backgroundColor: "#4caf50",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer"
              }}
            >
              Buy All Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
