import { FaShoppingCart } from "react-icons/fa";
import { useCart } from "../context/CartContext";

function ProductCard({ product }) {
  const { addToCart } = useCart();

  // Price styling formatting helper
  const formattedPrice = typeof product.price === "number" 
    ? `₹${product.price}` 
    : product.price;

  const productName = product.title || product.name;
  const productImage = product.imageUrl || product.image || "https://images.unsplash.com/photo-1531403009284-440f080d1e12";

  return (
    <div className="product-card h-100 d-flex flex-column justify-content-between">
      <div>
        <img
          src={productImage}
          className="img-fluid"
          alt={productName}
          style={{
            height: "220px",
            width: "100%",
            objectFit: "cover",
            borderRadius: "15px",
          }}
        />
        <h3 className="mt-3 fs-5 text-dark fw-semibold">{productName}</h3>
        {product.description && (
          <p className="text-muted small text-truncate" title={product.description}>
            {product.description}
          </p>
        )}
      </div>

      <div className="mt-3">
        <div className="d-flex justify-content-between align-items-center">
          <h4 className="text-primary mb-0 fw-bold">{formattedPrice}</h4>
          <button className="btn btn-success btn-sm px-3 py-2" onClick={() => addToCart(product)}>
            <FaShoppingCart className="me-1" /> Add Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;