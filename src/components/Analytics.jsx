import useFetch from "../hooks/useFetch";
import StatCard from "./StatCard";
import { API } from "../constants";
import { revenueOf } from "../utils";

function Analytics() {
  const { data: orders } = useFetch(`${API}/orders`);
  const { data: products } = useFetch(`${API}/products`);
  const { data: topBooks } = useFetch(`${API}/topBooks`);

  const customers = new Set(
    orders.map((order) => order.customerId ?? order.customer).filter(Boolean)
  ).size;

  const salesRows = orders
    .filter((order) => order.status !== "Cancelled")
    .flatMap((order) =>
      (order.items || []).map((title, index) => {
        const product = products.find((book) => book.title === title);
        const price = Number(product?.price ?? 0);

        return {
          id: `${order.id}-${index}`,
          date: order.date,
          title,
          category: product?.category || "Unknown",
          unitsSold: 1,
          averagePrice: price,
          totalRevenue: price,
        };
      })
    );

  const formatCurrency = (amount) =>
    `KES ${Number(amount).toLocaleString("en-KE")}`;

  const formatDate = (date) =>
    new Date(`${date}T00:00:00`).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Analytics Dashboard</h1>

      <div className="rounded-xl bg-white shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-bold">Book Sales Report</h2>
          <p className="text-sm text-gray-500">
            Sales details for each book in your orders
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-700">
              <tr>
                <th className="px-4 py-3 font-semibold">Date</th>
                <th className="px-4 py-3 font-semibold">Book Title</th>
                <th className="px-4 py-3 font-semibold">Category</th>
                <th className="px-4 py-3 font-semibold">Units Sold</th>
                <th className="px-4 py-3 font-semibold">Avg. Price</th>
                <th className="px-4 py-3 font-semibold">Total Revenue</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {salesRows.length > 0 ? (
                salesRows.map((sale) => (
                  <tr key={sale.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 whitespace-nowrap">
                      {formatDate(sale.date)}
                    </td>
                    <td className="px-4 py-3 font-medium">
                      {sale.title}
                    </td>
                    <td className="px-4 py-3">{sale.category}</td>
                    <td className="px-4 py-3">{sale.unitsSold}</td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      {sale.averagePrice
                        ? formatCurrency(sale.averagePrice)
                        : "�"}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap font-medium">
                      {sale.totalRevenue
                        ? formatCurrency(sale.totalRevenue)
                        : "�"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="px-4 py-8 text-center text-gray-500"
                  >
                    No sales records available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <h2 className="font-bold mb-3">Top Selling Books</h2>
        {topBooks.map((book) => (
          <p key={book.id}>
            {book.title}: {book.sold} sold
          </p>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard
          label="Total Revenue"
          value={`Ksh ${revenueOf(orders).toLocaleString()}`}
        />

        <StatCard label="Total Orders" value={orders.length} />

        <StatCard label="Total Customers" value={customers} />
      </div>
    </div>
  );
}

export default Analytics;