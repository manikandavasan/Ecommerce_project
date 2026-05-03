import { useEffect, useState } from "react";
import API from "../api/axios.js";
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'
import "../assets/css/shopping_cart.css"
import { useNavigate, Link } from "react-router-dom";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
  }, []);

  // ✅ Fetch Cart
  const fetchCart = async () => {
    try {
      setLoading(true);

      const res = await API.get(`/orders/cart/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`
        }
      });

      setCartItems(res.data.cart_items || []);
      setTotal(res.data.total || 0);

    } catch (err) {
      console.error("Cart Error:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Update Quantity
  const submitQuantity = async (id, quantity) => {
    try {
      await API.put(
        `orders/cart/update/${id}/`,
        { quantity: Number(quantity) },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`
          }
        }
      );

      fetchCart();

    } catch (err) {
      console.error("Update error:", err.response?.data);
    }
  };

  // ✅ Delete Item
  const deleteItem = async (id) => {
    try {
      await API.delete(`orders/cart/delete/${id}/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`
        }
      });

      fetchCart();

    } catch (err) {
      console.error("Delete error:", err.response?.data);
    }
  };

  const continueShopping = () => {
    navigate(-1);
  };

  // ✅ Loading UI
  if (loading) {
    return <h2 style={{ textAlign: "center" }}>Loading cart...</h2>;
  }

  return (
    <div className="container">
      <h1>Shopping Cart</h1>

      <div className="row overall-cart">
        {/* LEFT SIDE */}
        <div className="col-12 table-wrapper">
          <table className="cart_table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Remove</th>
              </tr>
            </thead>

            <tbody>
              {cartItems.length > 0 ? (
                cartItems.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <img
                        src={item.image || "/placeholder.png"}
                        width="80"
                        alt=""
                        className="cart-image"
                      />
                      {item.product_name}
                    </td>

                    <td>₹ {item.price}</td>

                    <td className="update-input-btn">
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => {
                          const newQty = Number(e.target.value);

                          setCartItems((prev) =>
                            prev.map((ci) =>
                              ci.id === item.id
                                ? { ...ci, quantity: newQty }
                                : ci
                            )
                          );
                        }}
                      />

                      <button
                        className="btn btn-primary p-1 m-1"
                        onClick={() =>
                          submitQuantity(item.id, item.quantity)
                        }
                      >
                        Update
                      </button>
                    </td>

                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => deleteItem(item.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" style={{ textAlign: "center" }}>
                    Cart is empty
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          <button
            className="btn bg-primary text-white m-3"
            onClick={continueShopping}
          >
            Continue Shopping
          </button>
        </div>

        {/* RIGHT SIDE */}
        <div className="col">
          <table className="cart-summary">
            <thead>
              <tr>
                <th>
                  <h1>Cart Summary</h1>
                </th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>
                  <h2>Total: ₹ {total}</h2>
                </td>
              </tr>

              <tr>
                <td>
                  <Link
                    to="/checkout/"
                    className="btn bg-success text-white"
                  >
                    Proceed to Checkout
                  </Link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}