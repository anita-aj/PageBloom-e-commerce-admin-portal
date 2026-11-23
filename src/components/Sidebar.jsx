import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";

const BASE = import.meta.env.BASE_URL;

function Sidebar() {
  const signOut = useAuthStore((state) => state.signOut);
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut();
    navigate("/login");
  };

  return (
    <aside className="flex min-h-screen w-52 flex-col justify-between bg-cream p-4 font-bold">
      <div>
        <img
          src={`${BASE}images/Logo1.png`}
          alt="PageBloom logo"
          className="h-16"
        />
        <h3 className="mb-10 mt-4 text-2xl text-clay">PageBloom</h3>

        <nav className="flex flex-col gap-6">
          <Link to="/" className="text-black hover:text-clay">
            Home
          </Link>
          <Link to="/products" className="text-black hover:text-clay">
            Products
          </Link>
          <Link to="/add-product" className="text-black hover:text-clay">
            Add Product
          </Link>
          <Link to="/orders" className="text-black hover:text-clay">
            Orders
          </Link>
          <Link to="/analytics" className="text-black hover:text-clay">
            Analytics
          </Link>
        </nav>
      </div>

      <button
        type="button"
        onClick={handleSignOut}
        className="mt-8 rounded bg-clay px-4 py-2 text-white hover:opacity-90"
      >
        Sign Out
      </button>
    </aside>
  );
}

export default Sidebar;