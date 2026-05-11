import { useState } from "react";
import API from "../api/axios.js";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import "../assets/css/search_result.css"

export default function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    try {
    const res = await API.get(`search/?q=${query}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`
      }
    })
    }
    catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-page">

      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="btn btn-primary">Search</button>
      </form>

      {loading ? (
        <div className="text-center p-5">
          <div className="spinner-border"></div>
        </div>
      ) : results.length === 0 ? (
        <div className="no-results">No products found 😕</div>
      ) : (
        <div className="featured-products">
          {results.map((product) => (
            <div key={product.id} className="featured-product-box">
              <img src={product.image} alt={product.name} />
              <h5>{product.name}</h5>
              <h6>₹ {product.price}</h6>

              <div>
                <Link
                  to={`/product/${product.id}`}
                  className="btn btn-secondary text-white"
                >
                  View Detail
                </Link>

                <button className="btn btn-primary">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}