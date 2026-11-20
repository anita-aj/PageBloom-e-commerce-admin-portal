
import { Link } from "react-router-dom"; //link that changes page without reloading
import useAuthStore from "../store/useAuthStore"; 
import useFetch from "../hooks/useFetch"; // loading hook
import StatCard from "./StatCard"; // the number card
import { API } from "../constants"; // the server address
import { revenueOf } from "../utils"; // the revenue calculator

const link = "rounded-xl bg-cream px-4 py-3"; // one style text reused on the three links

function Home() {
  const user = useAuthStore((s) => s.user); // who is logged in
  const { data: products } = useFetch(`${API}/products`); // load the products and call the list products
  const { data: orders } = useFetch(`${API}/orders`); // load the orders and call the list orders

      return (
    <div>
      <div className="mb-6 rounded-xl bg-cream bg-cover bg-center p-8" style={{ backgroundImage: "url(/images/Home-bg1.png)" }}>
        <h1 className="text-3xl font-bold">Welcome, {user.name}!</h1>
        <p>Manage your bookshop with ease. Add books, update prices, track orders and see how your store is growing.</p>
      </div>
    </div>
  );
}

export default Home;