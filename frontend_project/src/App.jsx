import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import Signup from "./pages/signup.jsx";
import Signin from "./pages/signin.jsx";
import Home from "./pages/home.jsx";
import Cart from "./pages/shopping_cart.jsx";
import Checkout from "./pages/checkout_page.jsx";
import Payment from "./pages/payment.jsx";
import MyOrders from "./pages/my_orders.jsx";
import ProductDetail from "./pages/product_detail.jsx";
import CategoryProducts from "./pages/product_category.jsx";
import Search from "./pages/search_result.jsx";

function App() {
  return (
    <Router>
      <Routes>

        {/* Auth */}
        <Route path="/" element={<Signup />} />
        <Route path="accounts/signin/" element={<Signin />} />

        {/* Main Pages */}
        <Route path="accounts/home/:id/" element={<Home />} />
        <Route path="orders/cart/" element={<Cart />} />
        <Route path="orders/checkout/" element={<Checkout />} />
        <Route path="orders/payment/" element={<Payment />} />
        <Route path="orders/my_orders/" element={<MyOrders />} />

        {/* Dynamic Routes */}
        <Route path="products/product/:id/" element={<ProductDetail />} />
        <Route path="products/category/:id/" element={<CategoryProducts />} />

        {/* Search */}
        <Route path="products/search/" element={<Search />} />

      </Routes>
    </Router>
  );
}

export default App;