import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { FaTrash, FaPlus, FaMinus } from "react-icons/fa";

function Cart() {
  const { cartItems, updateQuantity, removeFromCart, getCartTotal } = useCart();
  const navigate = useNavigate();

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Shopping Cart</h2>

      {cartItems.length === 0 ? (
        <div className="text-center py-5 shadow-sm rounded bg-white mt-4">
          <h3>Your cart is empty</h3>
          <p className="text-muted">Looks like you haven't added anything to your cart yet.</p>
          <Link to="/products" className="btn btn-primary mt-3">
            Shop Products
          </Link>
        </div>
      ) : (
        <div className="row mt-4">
          {/* Cart Items List */}
          <div className="col-lg-8">
            {cartItems.map((item) => {
              const prod = item.product;
              const formattedPrice = typeof prod.price === "number" ? `₹${prod.price}` : prod.price;
              const prodName = prod.title || prod.name;
              const prodImage = prod.imageUrl || prod.image || "https://images.unsplash.com/photo-1531403009284-440f080d1e12";
              
              return (
                <div key={prod._id || prodName} className="card mb-3 shadow-sm border-0 p-3">
                  <div className="row align-items-center">
                    <div className="col-md-2 text-center">
                      <img
                        src={prodImage}
                        alt={prodName}
                        className="img-fluid rounded"
                        style={{ maxHeight: "80px", objectFit: "cover" }}
                      />
                    </div>
                    <div className="col-md-4">
                      <h5 className="mb-1">{prodName}</h5>
                      {prod.category && <span className="badge bg-secondary">{prod.category}</span>}
                    </div>
                    <div className="col-md-3 d-flex align-items-center justify-content-center gap-2">
                      <button
                        className="btn btn-outline-secondary btn-sm"
                        onClick={() => updateQuantity(prod._id || prod.name, item.quantity - 1)}
                      >
                        <FaMinus size={10} />
                      </button>
                      <span className="fw-semibold px-2">{item.quantity}</span>
                      <button
                        className="btn btn-outline-secondary btn-sm"
                        onClick={() => updateQuantity(prod._id || prod.name, item.quantity + 1)}
                      >
                        <FaPlus size={10} />
                      </button>
                    </div>
                    <div className="col-md-2 text-center">
                      <h5 className="text-primary mb-0">{formattedPrice}</h5>
                    </div>
                    <div className="col-md-1 text-center">
                      <button
                        className="btn btn-outline-danger btn-sm border-0"
                        onClick={() => removeFromCart(prod._id || prod.name)}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Cart Summary Card */}
          <div className="col-lg-4">
            <div className="card shadow-sm border-0 p-4 bg-white">
              <h4 className="mb-4">Order Summary</h4>
              <div className="d-flex justify-content-between mb-3 border-bottom pb-3">
                <span className="text-muted">Subtotal</span>
                <span className="fw-bold">₹{getCartTotal()}</span>
              </div>
              <div className="d-flex justify-content-between mb-4">
                <span className="text-muted">Delivery</span>
                <span className="text-success fw-semibold">FREE</span>
              </div>
              <div className="d-flex justify-content-between mb-4 border-top pt-3">
                <h5>Total</h5>
                <h4 className="text-primary">₹{getCartTotal()}</h4>
              </div>
              <button
                className="btn btn-primary w-100 py-2 fs-5"
                onClick={() => navigate("/checkout")}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;