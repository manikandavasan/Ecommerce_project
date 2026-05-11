import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'
import "../assets/css/product_category.css"
import API from "../api/axios.js"
import { Link } from "react-router-dom";

export default function CategoryProducts() {
  const { id } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, [id]);

  const [loading, setLoading] = useState(true);

const fetchProducts = async () => {
  try {
    const res = await API.get(`products/category/${id}/`);
    setProducts(res.data.products);
  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
  }
};
  if (loading) {
  return <div className="text-center p-5"><div className="spinner-border"></div></div>;
}
  return (
    <div className="row category-overall-div">
      <h1>Category Products</h1>
        <div className="col product_list">
          {products.length === 0 ? (
            <div className="no-products">No products found 😕</div>
          ) : (
            products.map((product) => (
              <div key={product.id} className="card card-list">
                    <img src={product.image} alt={product.name} height="50%" width="100%"
                     />
                    <div className="card-body">
                        <h5 className="card-title">{product.name}</h5>
                        <p className="card-text">₹ {product.price}</p>
                        <Link className="btn btn-primary p-2 ps-3 pe-3" to={`/product/${product.id}`}>View Detail</Link>
                    </div>
          </div>
            ))
          )}
        </div>
    </div>
  );
}