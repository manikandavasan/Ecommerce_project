import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/axios.js";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'
import "../assets/css/home.css"

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
      const res = await API.get(`accounts/home/`)
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
      Quantity: Quantity,
      product_id: product_id
    };
    try {
      const res = await API.post("orders/cart/add/", cartData);
      navigate(`/orders/cart/`)
    } catch (err) {
      alert(str(err))
    }
  }

  

  if (loading) {
    return <h2 style={{ textAlign: "center" }}>Loading...</h2>;
  }

  return (
    <div>
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
            <a className="nav-link" href={`/orders/my_orders/`} >My Orders</a>
          </li>

        </ul>
      </div>

    </div>
      </nav>

      <div className="row">
        <div className="col-12 top-header">
          <form className="d-flex" role="search" action={`/products/search/`} method="GET">
              <input className="form-control me-2 search-bar" type="search" placeholder="Search" name="q" aria-label="Search" required/>
              <button className="btn btn-outline-secondary" type="submit">Search</button>
            </form>
            <div className="signin-cart">
              <div className="nav-user">
                <a href={ `/` }>
                  <i className="fa-solid fa-user"></i>
                <div className="bg-secondary text-white register-btn">
                  <p>Sign In</p>
                  <p>Register</p>
                </div>
                </a>
              </div>
          {/* <a href={`/orders/cart/`}><button className="btn bg-secondary text-white"><i className="fa-solid fa-cart-arrow-down"></i> Cart</button></a> */}
          <Link to="/cart" className="btn bg-secondary text-white">Cart</Link>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-12 p-0 slide-show">
        <div id="carouselExample" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner">
            {products.length > 0 ? (
              products.map((product, index) => (
                <div
                  key={product.id}
                  className={`carousel-item ${index === 0 ? "active" : ""}`}
                >
                  <div
                    className="carousel-bg carousel-image"
                    style={{
                      backgroundImage: `url(../assets/images/products/${product.image}")`,
                      backgroundSize: "80% 100%",
                      backgroundPosition: "center",
                      height: "650px"
                    }}
                  >
<img src={`${product.image}`} />
                    <div className="carousel-content text-center text-white">
                      <h1>{product.name}</h1>
                      <p>{product.description}</p>
                      <h2>${product.price}</h2>

                      <Link to={`/product/${product.id}`} className="btn btn-primary m-5">
                        Shop Now
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No products found</p>
            )}
          </div>

          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExample"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon"></span>
          </button>

          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExample"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon"></span>
          </button>
        </div>
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
            <h5>{cat.id}</h5>
            <img
                src={`media/${cat.image}`}
                alt={cat.name} className="category-image"
              />
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
                <img src={`https://ecommerce-project-hm4w.onrender.com/media/${product.image}`} alt={product.name} className="featured-product-image" />
                <h6>{ product.name }</h6>
                <h5> inr. {product.price}</h5>
        <div>
          <button className="btn bg-primary text-white" onClick={addToCart}>Add to Cart</button>
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

