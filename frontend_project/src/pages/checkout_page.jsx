import { useEffect, useState } from "react";
import API from "../api/axios.js";
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'
import "../assets/css/checkout_page.css"


export default function Checkout() {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const res = await API.get("orders/cart/");
      setCartItems(res.data.cart_items);
      setTotal(res.data.total);
    } catch (err) {
      console.error(err);
    }
  };

  const handlePlaceOrder = async () => {
    await API.post(
  "orders/place-order/",
  {},   // body (empty)
  {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access")}`
    }
  }
);
  }

  return (
    <div className="container overall">
      <h1>Checkout</h1>

      <div className="order-summary">
        <h3>Order Summary</h3>
        <table className="order-summary-table">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item.id}>
                <td>{item.product_name}</td>
                <td>{item.price}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h2>Total: ₹{total}</h2>
      </div>

      <form className="checkout-form">
        <h3>Shipping Information</h3>

        <input type="text" placeholder="Full Name" />
        <input type="text" placeholder="Address" />
        <input type="text" placeholder="City" />
        <input type="text" placeholder="Postal Code" />
        <input type="text" placeholder="Phone Number" />

        <label>
          <input type="checkbox" /> Same as Billing Address
        </label>

        <h3>Payment Details</h3>
        <input type="text" placeholder="Card Number" />
        <input type="date" />

        <button className="btn btn-secondary" onClick={handlePlaceOrder}>Place Order</button>
      </form>
    </div>
  );
}