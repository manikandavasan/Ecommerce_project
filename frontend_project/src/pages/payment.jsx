export default function Payment() {
  return (
    <div className="payment">
      <form className="payment-form">
        <h1>Secure Payment</h1>
        <h4>Order #12345 | Total: ₹1050</h4>

        <p>Please complete your payment</p>

        <button className="btn btn-primary">Pay Now</button>

        <p>Your payment is 100% secure</p>
      </form>
    </div>
  );
}