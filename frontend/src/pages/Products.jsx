import React, { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import api from "../services/api";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get("/products");
        setProducts(response.data);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Could not load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-5">Latest Products</h1>

      {loading && <div className="text-center mt-5"><h3>Loading products...</h3></div>}
      {error && <div className="alert alert-danger text-center">{error}</div>}

      {!loading && !error && products.length === 0 && (
        <div className="text-center mt-5">
          <h3>No products found.</h3>
          <p>Please check back later or add new products via the Admin Dashboard.</p>
        </div>
      )}

      <div className="row">
        {products.map((item) => (
          <div className="col-md-4 mb-4" key={item._id || item.name}>
            <ProductCard product={item} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;
