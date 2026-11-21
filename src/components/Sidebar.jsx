import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div style={{
      width: "200px",
      background: "#333",
      color: "white",
      padding: "10px",
      height: "100vh"
    }}>
      <h3>PageBloom</h3>
      
      <Link to="/" style={{ color: "white", display: "block", marginBottom: "10px" }}>
        Home
      </Link>
      
      <Link to="/orders" style={{ color: "white", display: "block", marginBottom: "10px" }}>
        Orders
      </Link>
      
      <Link to="/products" style={{ color: "white", display: "block" }}>
        Products
      </Link>
    </div>
  );
}

export default Sidebar;