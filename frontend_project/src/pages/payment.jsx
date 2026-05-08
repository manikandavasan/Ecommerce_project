import 'bootstrap/dist/css/bootstrap.min.css'
import "../assets/css/payment.css"

export default function Payment() {
  return (
    <div className="payment">
      <form className="payment-form">

        <h2>🔒 Secure Payment</h2>
        <p className="order-info">Order #12345</p>
        <h3 className="total">Total: ₹1050</h3>

        <div className="payment-options">
          <label>
            <input type="radio" name="payment" defaultChecked />
            <span>UPI</span>
          </label>

          <label>
            <input type="radio" name="payment" />
            <span>Card</span>
          </label>

          <label>
            <input type="radio" name="payment" />
            <span>Cash on Delivery</span>
          </label>
        </div>

        <div className="card-details">
          <input type="text" placeholder="Card Number" />
          <div className="card-row">
            <input type="text" placeholder="MM/YY" />
            <input type="text" placeholder="CVV" />
          </div>
        </div>

        <button type="button" className="btn btn-primary pay-btn">
          Pay Now
        </button>

        <p className="secure-text">🔐 Your payment is 100% secure</p>

      </form>
    </div>
  );
}