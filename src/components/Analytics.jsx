import { useState } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

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
  const byCategory = CATEGORIES.map((c) => ({
  category: c,
  count: products.filter((p) => p.category === c).length,
}));

const customers = new Set(orders.map((o) => o.customerId)).size;

  return <h1>Analytics</h1>;
}

export default Analytics;