import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios"; 

import { useAuth } from "../context/AuthContext";
import './Login.css'

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/auth/login", form);
      login(data.user);
      navigate("/products");
    } catch (err) {
      setError("Invalid credentials.");
    }
  };

  return (
    <div id="login">
      <h1>Login</h1>
      {error && <p>{error}</p>}
      <form id="style" onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required /><br></br>
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required /><br></br>
        <button id="btn" type="submit">Login</button>
      </form>
  
      
      <p id="dont" style={{ marginTop: "10px" }}>
        Don't have an account?{" "}
        <button id="sgn"
          onClick={() => navigate("/signup")}
        >
          Signup
        </button>
      </p>
    </div>
  );
  
}

export default Login;
