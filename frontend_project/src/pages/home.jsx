import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/axios.js";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'
import "../assets/css/home.css"
import Carousel from 'react-bootstrap/Carousel';


export default function Home() {
  const navigate = useNavigate()
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const  { id } = useParams()
  const Quantity = 1

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await API.get(`accounts/home/`, {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("access_token")}`
  }
});
      console.log("API Data:", res.data);
      setProducts(res.data.products || []);
      setCategories(res.data.categories || []);
      console.log(categories);
    } catch (error) {
      console.error("Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  };

    const addToCart = async (product_id) => {
  const cartData = {
    quantity: 1,
    product_id: product_id
  };

  try {
    const res = await API.post("orders/cart/add/", cartData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`
      }
    });

    navigate(`/cart/`);
  } catch (err) {
    console.error("Add to cart error:", err.response?.data || err.message);
  }
};

  

  if (loading) {
    return <h2 style={{ textAlign: "center" }}>Loading...</h2>;
  }

  return (
    <div className="overall-container">
      <nav className="navbar navbar-expand-lg p-2">
    <div className="container-fluid">
      <a className="navbar-brand" href="#">
        Amazon</a>
      <button className="navbar-toggler" type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">

          <li className="nav-item">
            <a className="nav-link active" href="#">Home</a>
          </li>

          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown">
              Products
            </a>
            <ul className="dropdown-menu">
              <li><a className="dropdown-item" href="#">Action</a></li>
            </ul>
          </li>

          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown">
              Category
            </a>
            <ul className="dropdown-menu">
              <li><a className="dropdown-item" href="#">Action</a></li>
            </ul>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to={`/my_orders/`} >My Orders</Link>
          </li>

        </ul>
      </div>

    </div>
      </nav>

      <div className="row">
        <div className="col-12 top-header">
          <form className="d-flex" role="search" action={`/products/search/`} method="GET">
              <input className="form-control me-2 search-bar" type="search" placeholder="Search" name="q" aria-label="Search" required/>
              <Link to="/search" className="btn btn-outline-secondary">Search</Link>
            </form>
            <div className="signin-cart">
              <div className="nav-user">
                <a href={ `/` }>
                  <i className="fa-solid fa-user"></i>
                <div className="bg-secondary text-white register-btn">
                  <p>Sign In / Register</p>
                </div>
                </a>
              </div>
          <Link to="/cart" className="btn bg-secondary text-white">Cart</Link>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-12 p-0 slide-show">
          <Carousel>
          { products.length > 0 ? (
            products.map((product) => (
            <Carousel.Item key={product.id}>
              <div style={{
                          backgroundImage: `url(${product.image})`,
                          height: "500px",
                          backgroundSize: "80% 100%",
                          backgroundPosition: "center",
                          backgroundRepeat: "no-repeat"
                        }}>
                <Carousel.Caption className="pt-3">
                  <h5>{ product.name }</h5>
                  <h2>{ product.description }</h2>
                  <h5> &#8377; { product.price }</h5>
                  <Link className="btn bg-secondary text-decoration-none text-white" to={`/product/${product.id}`}>Shop Now</Link>
                </Carousel.Caption>
              </div>
            </Carousel.Item>
            ))
          ):(
            <p>Product not found</p>
          )
            
          }
          </Carousel>
        </div>
    </div>


      <div className="row shop-by-category">
    <div className="col-12 home-category">
      <h2>Shop by Category</h2>
      <a href="">View All <i className="fa-solid fa-greater-than"></i></a>
    </div>
    <div className="category-wrapper">
        {categories.length > 0 ? (
          categories.map((cat) => (
            <Link key={cat.id} to={`/category/${cat.id}/`}>
          <div className="card category-small-box" key={cat.id}>
            <img src={cat.image} alt={cat.name} className="category-image" />
            <h6>{cat.name}</h6>
          </div>
        </Link>
          ))
        ) : (
          <p>No categories found</p>
        )}
      </div>
      
      </div>

  <div className="row shop-featured-product">
    <div className="col-12 home-category">
        <h2>Featured Products</h2>
        <a href="#">View All <i className="fa-solid fa-greater-than"></i></a>
    </div>

  <div className="col-12 featured-products-list">
    {products.length > 0 ? (
          products.map((product) => (
            <div key={product.id} className="featured-product-box">
                <img src={product.image} alt={product.name} className="featured-product-image" />
                <h6>{ product.name }</h6>
                <h5> &#8377; {product.price}</h5>
        <div>
          <button className="btn bg-primary text-white" onClick={()=>addToCart(product.id)}>Add to Cart</button>
          <Link className="btn bg-secondary text-decoration-none text-white" to={`/product/${product.id}`}>View Detail</Link>
        </div>
      </div>
          ))
        ) : (
          <p>No products found</p>
        )}
    </div>

  </div>

  <footer className="footer container-fluid">
  <div className="footer-container container-fluid">
    <div className="footer-col">
      <h3>Company</h3>
      <ul>
        <li>About Us</li>
        <li>Our Services</li>
        <li>Privacy Policy</li>
        <li>Affiliate Program</li>
      </ul>
    </div>

    <div className="footer-col">
      <h3>Get Help</h3>
      <ul>
        <li>FAQ</li>
        <li>Shipping</li>
        <li>Returns</li>
        <li>Order Status</li>
        <li>Payment Options</li>
      </ul>
    </div>

    <div className="footer-col">
      <h3>Follow Us</h3>
      <ul>
        <li>Facebook</li>
        <li>Instagram</li>
        <li>Twitter</li>
      </ul>
    </div>

  </div>
</footer>
</div> 
  );
}

