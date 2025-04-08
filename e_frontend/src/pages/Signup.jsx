import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios"; 
import './signup.css'

function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:5000/api/auth/signup", form);
      console.log("✅ Signup successful:", data);
      alert("Signup successful! Please log in.");
      navigate("/login"); 
    } catch (err) {
      console.error("Signup Error:", err.response?.data || err.message);
      setError("Signup failed. Try again.");
    }
  };

  return (
    <div className="sign" style={{ padding: "20px"}}>
      <h1>Signup</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form id="style" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          onChange={handleChange}
          required
        /><br></br>
        <input
          type=" email"
          name="email"
          placeholder="Enter Email"
          onChange={handleChange}
          required
        /><br></br>
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
        /><br></br>
        <button id="sign" type="submit">Signup</button>
      </form>

      <p id="already">
        Already have an account?{" "}
        <button id="log"
          onClick={() => navigate("/login")}
        >
          Login
        </button>
      </p>
    </div>
  );
}

export default Signup;
