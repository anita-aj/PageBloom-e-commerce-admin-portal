import useFetch from "../hooks/useFetch";
import { API } from "../constants";

function Orders() {
  const { data: orders, loading } = useFetch(`${API}/orders`);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>Orders</h2>
      
      <table border="1" cellPadding="10" style={{ width: "100%", background: "white" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Customer</th>
            <th>Total</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.customer}</td>
              <td>${order.total}</td>
              <td>{order.status}</td>
              <td>{order.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Orders;
