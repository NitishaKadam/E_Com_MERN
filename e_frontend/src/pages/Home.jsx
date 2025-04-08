import { Link } from "react-router-dom";

function Home() {
  return (
    <div 
      style={{
        height: "100vh",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        textShadow: "1px 1px 3px rgba(0, 0, 0, 0.7)",
      }}
    >
      <h1 style={{ fontSize: "6rem", marginBottom: "10px" ,color:"black",textDecoration:"none"}}>
        UrbanAura
      </h1>
      <p style={{ fontSize: "2rem", marginBottom: "20px" ,color:"black" , textShadow:"black"}}>
        Discover amazing products at great prices.
      </p>
      <Link to="/signup">
        <button
          style={{
            padding: "10px 20px",
            fontSize: "1.2rem",
            backgroundColor: "#ff4081",
            border: "2px solid black",
            borderRadius: "20px",
            color: "black",
            cursor: "pointer",
            transition: "background 0.3s ease",
          }}
        >
          Shop Now
        </button>
      </Link>
    </div>
  );
}

export default Home;
