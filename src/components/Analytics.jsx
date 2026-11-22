import useFetch from "../hooks/useFetch";
import StatCard from "./StatCard";
import { API, CATEGORIES } from "../constants";
import { revenueOf } from "../utils";

function Analytics() {
  const [range, setRange] = useState("1M");

  const { data: revenue } = useFetch(`${API}/revenue`);
  const { data: orders } = useFetch(`${API}/orders`);
  const { data: products } = useFetch(`${API}/products`);
  const { data: topBooks } = useFetch(`${API}/topBooks`);

  return <h1>Analytics</h1>;
}

export default Analytics;