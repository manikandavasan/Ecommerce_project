import { useEffect, useState } from "react";
import API from "../api/axios.js";
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'
import "../assets/css/my_orders.css"

export default function MyOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const res = await API.get("orders/my_orders/",
      {},
      {
        headers: {
      Authorization: `Bearer ${localStorage.getItem("access")}`
    }
      }
    );
    setOrders(res.data);
    console.log(res.data);
  };

  return (


  <div className="row shop-myorder-product">
    <div className="col-12 myorder-products">
    {orders.map((order) => (
        <div key={order.id} className="myorder-product-box">
          <h3>Order ID: {order.order_id}</h3>
          <p>Total: ₹{order.total}</p>

          <ul className="myorder-list">
            {order.items.map((item) => (
              <li key={item.id}>
                <p>Product: {item.name}</p>
                <p>Price: {item.price}</p>
                <p>Quantity: {item.quantity}</p>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </div>
  );
}