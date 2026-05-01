import { HashRouter as Router, Routes, Route } from "react-router-dom";

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
import AddCategory from "./pages/AddCategory";
import AddProduct from "./pages/AddProduct";

function App() {
  return (
    <Router>
      <Routes>

        {/* Auth */}
        <Route path="/" element={<Signup />} />
        <Route path="/signin/" element={<Signin />} />

        {/* Main Pages */}
        <Route path="/home/" element={<Home />} />
        <Route path="/cart/" element={<Cart />} />
        <Route path="/checkout/" element={<Checkout />} />
        <Route path="/payment/" element={<Payment />} />
        <Route path="/my_orders/" element={<MyOrders />} />

        {/* Dynamic Routes */}
        <Route path="/product/:id/" element={<ProductDetail />} />
        <Route path="/category/:id/" element={<CategoryProducts />} />

        {/* Search */}
        <Route path="/search/" element={<Search />} />
        <Route path="/add-category" element={<AddCategory />} />
        <Route path="/add-product" element={<AddProduct />} />

      </Routes>
    </Router>
  );
}

export default App;