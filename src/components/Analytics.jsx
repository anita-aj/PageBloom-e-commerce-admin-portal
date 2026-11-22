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

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Analytics Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard
          label="Total Revenue"
          value={`Ksh ${revenueOf(orders).toLocaleString()}`}
        />

        <StatCard
          label="Total Orders"
          value={orders.length}
        />

        <StatCard
          label="Total Customers"
          value={customers}
        />
      </div>
    </div>
  );
}


export default Analytics;