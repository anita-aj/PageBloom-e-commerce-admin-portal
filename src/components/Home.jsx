import { useState, useEffect } from "react"; 
import { Link } from "react-router-dom";
import { PlusCircle, BarChart3, ClipboardList } from "lucide-react"; 
import useAuthStore from "../store/useAuthStore"; 
import useFetch from "../hooks/useFetch"; 
import StatCard from "./StatCard"; 
import { API } from "../constants"; 
import { revenueOf } from "../utils";

const linkstyle = "flex items-center justify-center gap-2 rounded-xl bg-amber-50 p-4 py-15 text-center hover:bg-amber-100";// one style for all the quick action links
const banners = ["/images/banner1.png", "/images/banner2.png", "/images/banner3.png"]; //images for the welcome banner

function Home() {
  
  const user = useAuthStore((store) => store.user); 
  const { data: products } = useFetch(`${API}/products`); // load the products and call the list products
  const { data: orders } = useFetch(`${API}/orders`); // load the orders and call the list orders
  const [current, setCurrent] = useState(0); // which banner picture is showing

useEffect(() => { 
  const timer = setInterval(() => { 
    setCurrent((i) => (i + 1) % banners.length); // move to the next picture, looping back to the first
  }, 5000);
  return () => clearInterval(timer); // stop the timer when leaving the page
}, []);

      return (
    <div className="flex min-h-screen flex-col gap-6">
       
        {/* welcome banner */}
   <div className="relative min-h-50 flex-1 overflow-hidden rounded-2xl bg-cream"> 
   {banners.map((src, i) => (
    <div key={src}
      className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${i === current ? "opacity-100" : "opacity-0"}`}
      style={{ backgroundImage: `url(${src})` }} />
   ))}
    <div className="absolute top-0 bottom-0 left-0 w-2/3 bg-linear-to-r from-cream/90 via-cream/50 to-transparent" /> 
    <div className="absolute inset-y-0 left-0 flex w-full flex-col justify-center px-10 md:w-3/5"> 
    <h1 className="text-4xl font-bold sm:text-5xl">Welcome, {user.name}!</h1>
    <p className="mt-3 text-lg sm:text-xl">Manage your bookshop with ease. Add books, update prices, track orders and see how your store is growing.</p>
   </div>
   </div>

        {/* three statistic cards for the products, orders and revenue*/}
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard  label="Total products" value={products.length} />
        <StatCard  label="Total orders" value={orders.length} />
        <StatCard  label="Total revenue" value={`Ksh ${revenueOf(orders).toLocaleString()}`} />
      </div>

       {/* links for the quick actions( add product, view analytics and view orders) */}
     <div>
    <h2 className="mb-2 text-xl font-bold">Quick actions</h2>
    <div className="grid gap-4 sm:grid-cols-3"> 
    <Link to="/add-product" className={linkstyle}><PlusCircle/>Add new product</Link>
    <Link to="/analytics" className={linkstyle}><BarChart3/>View analytics</Link>
    <Link to="/orders" className={linkstyle}><ClipboardList/>View orders</Link>
  </div>
  </div>


    </div>
  );
}

export default Home;