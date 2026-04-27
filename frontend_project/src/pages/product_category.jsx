import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'
import "../assets/css/product_category.css"

export default function CategoryProducts() {
  const { id } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, [id]);

  const fetchProducts = async () => {
    const res = await axios.get(`http://127.0.0.1:8000/products/category/${id}/`);
    setProducts(res.data.products);
  };

  return (
    <div className="row">
      <h1>Category Products</h1>
        <div className="col product_list">
          {products.map((product) => (
          <div key={product.id} className="card card-list">
                    <img src={`http://127.0.0.1:8000/media/${product.image}`} alt="" height="50%" width="100%"
                     />
                    <div className="card-body">
                        <h5 className="card-title">{product.name}</h5>
                        <p className="card-text">₹ {product.price}</p>
                        <a href={ `/products/product/${product.id}` } className="btn btn-primary p-2 ps-3 pe-3">View</a>
                    </div>
          </div>
        ))}
        </div>
    </div>
  );
}