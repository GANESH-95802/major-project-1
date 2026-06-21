import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";

function Orders() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const fetchOrders = async () => {
      try {
        const response = await api.get("/orders");
        setOrders(response.data);
      } catch (err) {
        console.error("Error fetching orders:", err);
        setError("Could not retrieve orders. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user, navigate]);

  const getStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case "delivered":
        return "bg-success";
      case "shipped":
        return "bg-info text-dark";
      case "cancelled":
        return "bg-danger";
      case "pending":
      default:
        return "bg-warning text-dark";
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "800px" }}>
      <h2 className="mb-4">My Orders</h2>

      {loading && <div className="text-center py-5"><h3>Loading orders...</h3></div>}
      {error && <div className="alert alert-danger">{error}</div>}

      {!loading && !error && orders.length === 0 && (
        <div className="text-center py-5 shadow-sm rounded bg-white">
          <h3>No orders placed yet</h3>
          <p className="text-muted">You haven't ordered anything yet. Head over to our catalog!</p>
          <Link to="/products" className="btn btn-primary mt-2">
            Browse Products
          </Link>
        </div>
      )}

      {!loading && !error && orders.length > 0 && (
        <div className="d-flex flex-column gap-4">
          {orders.map((order) => (
            <div key={order._id} className="card shadow-sm border-0 p-4 bg-white">
              <div className="d-flex justify-content-between align-items-center border-bottom pb-3 mb-3 flex-wrap gap-2">
                <div>
                  <span className="text-muted small">Order ID:</span>
                  <span className="fw-semibold ms-2">{order._id}</span>
                  <div className="text-muted small mt-1">
                    Placed on: {new Date(order.createdAt).toLocaleDateString()}
                  </div>
                </div>
                <div>
                  <span className={`badge ${getStatusBadge(order.status)} fs-6 px-3 py-2`}>
                    {order.status}
                  </span>
                </div>
              </div>

              {/* Items List */}
              <div className="mb-3">
                <h6>Items Purchased:</h6>
                <ul className="list-group list-group-flush">
                  {order.items?.map((item, idx) => (
                    <li key={idx} className="list-group-item px-0 d-flex justify-content-between">
                      <div>
                        {item.name} <span className="text-muted">x {item.quantity}</span>
                      </div>
                      <span className="fw-semibold">
                        ₹{(parseFloat(String(item.price).replace(/[^0-9.]/g, "")) || 0) * item.quantity}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Total and Shipping details */}
              <div className="d-flex justify-content-between align-items-center mt-3 pt-3 border-top flex-wrap gap-2">
                <div>
                  {order.shippingDetails?.address && (
                    <div className="small text-muted">
                      <strong>Deliver to:</strong> {order.shippingDetails.address}
                    </div>
                  )}
                </div>
                <h5 className="mb-0">
                  Total Paid: <span className="text-primary fw-bold">₹{order.total}</span>
                </h5>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Orders;