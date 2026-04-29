import { useEffect, useState } from "react";
import API from "../api/axios.js";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'
import "../assets/css/product_detail.css"


export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [related, setRelated] = useState([]);
  const [Quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState("");
  const navigate = useNavigate()

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    const res = await API.get(`products/product/${id}/`, {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("access")}`
  }
});
    setProduct(res.data.product);
    setRelated(res.data.related_products);
  };

  const addToCart = async (product_id) => {
    const cartData = {
      Quantity: Quantity,
      product_id: product_id
    };
    try {
      const res = await API.post("orders/cart/add/", cartData);
      setMessage("Added successfully");
      navigate(`/orders/cart/`)
    } catch (err) {
      setMessage(err.response?.data?.error || "Error occurred");
    }
  }

  return (
    <div className="container-fluid product-detail-body">
      <h1>Product Details</h1>
      <div className="row product-box">
        <div className="col-lg-6 product_image">
          <img src={`https://ecommerce-project-hm4w.onrender.com/media/${product.image}`} alt=""  />
        </div>
        <div className="col-lg-6 detail-box">
            <h1>{product.name}</h1>
            <div className="product-rating">
                <div>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-regular fa-star"></i>
                </div>
                <h4>|</h4>
                <h4>120 reviews</h4>
            </div>
            <h1>{product.price}</h1>
            <p>{product.description}</p>
            <div className="cart-box">
                <div className="quantity-input">
                    <label>Quantity:</label>
                    <input type="number" value={Quantity} onChange={(e) => setQuantity(e.target.value)} />
                </div>
                <button className="btn bg-primary text-white" onClick={ ()=> addToCart(product.id)}>Add to Cart</button>
                <button className="btn bg-secondary text-white">Buy Now</button>
            </div>
        </div>
    </div>


    <h1>Related Products</h1>
    <div className="row temporary">
        <div className="col related-product">
            {related.map((p) => (
            <div key={p.id} className="related-product-box">
              <img src={`http://127.0.0.1:8000/${p.image}`} alt="" width="100%" height="100px" />
                    <p>{p.name}</p>
                    <h3>${p.price}</h3>
                </div>
        ))}
        </div>
    </div>
    </div>
  );
}