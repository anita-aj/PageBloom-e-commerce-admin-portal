import { Routes, Route } from "react-router-dom"; // tools for describing the pages
import ProtectedRoute from "./components/ProtectedRoute"; // checks you are logged in
import Layout from "./components/Layout"; 
import Login from "./components/Login";
import Home from "./components/Home";
import Products from "./components/Products";
import AddProduct from "./components/AddProduct";
import Orders from "./components/Orders";
import Analytics from "./components/Analytics";

function App() { // the main component
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<ProtectedRoute />}>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/analytics" element={<Analytics />} />
        </Route>
      </Route>
    </Routes>
  );
}
export default App; 