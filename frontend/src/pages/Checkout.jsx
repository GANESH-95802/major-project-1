import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import api from "../services/api";

function Checkout() {
  const { user } = useAuth();
  const { cartItems, getCartTotal, clearCart } = useCart();
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!address || !phone) {
      setError("Please enter address and phone details.");
      return;
    }

    if (cartItems.length === 0) {
      setError("Your cart is empty. Cannot place an order.");
      return;
    }

    try {
      const orderData = {
        userId: user._id,
        items: cartItems.map((item) => ({
          productId: item.product._id,
          name: item.product.name,
          quantity: item.quantity,
          price: item.product.price,
        })),
        total: getCartTotal(),
        shippingDetails: {
          address,
          phone,
        },
      };

      await api.post("/orders/create", orderData);
      setSuccess("Order placed successfully!");
      clearCart();
      setTimeout(() => {
        navigate("/orders");
      }, 2000);
    } catch (err) {
      console.error("Error creating order:", err);
      setError(err.response?.data?.message || "Failed to place order. Try again.");
    }
  };

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <form className="auth-box" style={{ maxWidth: "500px", width: "100%" }} onSubmit={handlePlaceOrder}>
        <h2 className="text-center mb-4">Checkout</h2>

        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <div className="card mb-4 bg-light border-0 p-3">
          <h5>Order Summary</h5>
          <div className="d-flex justify-content-between mt-2">
            <span>Total Items:</span>
            <span className="fw-semibold">
              {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
            </span>
          </div>
          <div className="d-flex justify-content-between mt-1">
            <span>Order Total:</span>
            <span className="fw-bold text-primary">₹{getCartTotal()}</span>
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label text-muted">Delivery Address</label>
          <textarea
            className="form-control"
            rows="3"
            placeholder="Enter your complete delivery address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label text-muted">Contact Phone Number</label>
          <input
            className="form-control"
            type="text"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>

        <button className="btn btn-success mt-4 w-100 py-2 fs-5" type="submit">
          Place Order
        </button>
      </form>
    </div>
  );
}

export default Checkout;