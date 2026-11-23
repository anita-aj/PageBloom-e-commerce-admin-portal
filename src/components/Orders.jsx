import useFetch from "../hooks/useFetch";
import { API } from "../constants";

function Orders() {
  const { data: orders, loading } = useFetch(`${API}/orders`);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Orders</h2>
      
      <table className="w-full mt-8 text-left border-collapse">
        <thead >
          <tr>
            <th className="px-4 py-3">ID</th>
            <th className="px-4 py-3">Customer</th>
            <th className="px-4 py-3">Total</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Date</th>
          </tr>
        </thead>
        <tbody >
          {orders.map((order) => (
            <tr key={order.id}>
              <td className="px-4 py-3">{order.id}</td>
              <td className="px-4 py-3">{order.customer}</td>
              <td className="px-4 py-3">${order.total}</td>
              <td className="px-4 py-3">{order.status}</td>
              <td className="px-4 py-3">{order.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Orders;
