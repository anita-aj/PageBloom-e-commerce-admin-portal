import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className ="bg-cream"style={{
      width: "200px",
      background: "clay",
      color: "brown",
      padding: "10px",
      height: "125vh",
      fontWeight: "bold",
    
    }}>

      <img src="/images/Logo1.png" alt="PageBloom logo" className="h-16 " /> 

      <h3 className="mb-30 mt-5 text-2xl ">PageBloom</h3>
      
      <Link to="/" style={{ color: "black", display: "block", marginBottom: "30px", fontWeight: "bold" }}>
        Home
      </Link>
      
    
      <Link to="/products" style={{ color: "black", display: "block", marginBottom: "30px", fontWeight: "bold" }}>
        Products
      </Link>

       <Link to="/add-product" style={{ color: "black", display: "block", marginBottom: "30px", fontWeight: "bold" }}>
        Add Product
      </Link>

      <Link to="/orders" style={{ color: "black", display: "block", marginBottom: "30px", fontWeight: "bold" }}>
        Orders
      </Link>
      

       <Link to="/Analytics" style={{ color: "black", display: "block", marginBottom: "30px", fontWeight: "bold" }}>
        Analytics
      </Link>
      
      
    </div>
  );
}

export default Sidebar;