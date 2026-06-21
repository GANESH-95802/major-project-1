import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";
import { FaUsers, FaBox, FaShoppingBag, FaDollarSign, FaTrash, FaEdit } from "react-icons/fa";

function AdminDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Dashboard Stats
  const [stats, setStats] = useState({ users: 0, products: 0, orders: 0, revenue: 0 });
  const [loading, setLoading] = useState(true);

  // Tabs
  const [activeTab, setActiveTab] = useState("products");

  // Product Management
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: "",
    stock: "",
  });

  // User & Order Lists
  const [usersList, setUsersList] = useState([]);
  const [ordersList, setOrdersList] = useState([]);

  // Notifications
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/");
      return;
    }

    fetchDashboardData();
  }, [user, navigate]);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      // Get general stats
      const statsRes = await api.get("/admin/dashboard");
      setStats(statsRes.data);

      // Get products catalog
      const prodRes = await api.get("/products");
      setProducts(prodRes.data);

      // Get users
      const usersRes = await api.get("/admin/users");
      setUsersList(usersRes.data);

      // Get orders (gets all orders as admin)
      const ordersRes = await api.get("/orders");
      setOrdersList(ordersRes.data);
    } catch (err) {
      console.error("Error loading dashboard data:", err);
      setError("Failed to load dashboard data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProduct = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!newProduct.name || !newProduct.price || !newProduct.stock) {
      setError("Product Name, Price, and Stock are required.");
      return;
    }

    try {
      const response = await api.post("/products/add", {
        ...newProduct,
        price: parseFloat(newProduct.price),
        stock: parseInt(newProduct.stock),
      });

      setSuccess("Product added successfully!");
      setNewProduct({ name: "", description: "", price: "", category: "", image: "", stock: "" });
      fetchDashboardData(); // Refresh list
    } catch (err) {
      console.error("Error creating product:", err);
      setError("Failed to add product.");
    }
  };

  const handleDeleteProduct = async (prodId) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await api.delete(`/products/${prodId}`);
      setSuccess("Product deleted successfully.");
      fetchDashboardData();
    } catch (err) {
      console.error("Error deleting product:", err);
      setError("Failed to delete product.");
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await api.delete(`/admin/user/${userId}`);
      setSuccess("User deleted successfully.");
      fetchDashboardData();
    } catch (err) {
      console.error("Error deleting user:", err);
      setError("Failed to delete user.");
    }
  };

  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    try {
      await api.put(`/admin/order/${orderId}`, { status: newStatus });
      setSuccess("Order status updated.");
      fetchDashboardData();
    } catch (err) {
      console.error("Error updating order status:", err);
      setError("Failed to update status.");
    }
  };

  if (loading) {
    return <div className="text-center py-5"><h3>Loading Admin Panel...</h3></div>;
  }

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Admin Dashboard</h1>
        <button className="btn btn-outline-primary" onClick={fetchDashboardData}>
          Refresh Data
        </button>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      {/* Stats Cards */}
      <div className="row g-4 mb-5">
        <div className="col-md-3">
          <div className="card shadow-sm border-0 p-4 text-center h-100 bg-white">
            <FaUsers size={40} className="text-primary mx-auto mb-2" />
            <h3>{stats.users}</h3>
            <p className="text-muted mb-0">Total Users</p>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card shadow-sm border-0 p-4 text-center h-100 bg-white">
            <FaBox size={40} className="text-warning mx-auto mb-2" />
            <h3>{stats.products}</h3>
            <p className="text-muted mb-0">Products Catalog</p>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card shadow-sm border-0 p-4 text-center h-100 bg-white">
            <FaShoppingBag size={40} className="text-success mx-auto mb-2" />
            <h3>{stats.orders}</h3>
            <p className="text-muted mb-0">Total Orders</p>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card shadow-sm border-0 p-4 text-center h-100 bg-white">
            <FaDollarSign size={40} className="text-danger mx-auto mb-2" />
            <h3>₹{stats.revenue}</h3>
            <p className="text-muted mb-0">Total Revenue</p>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "products" ? "active fw-bold" : ""}`}
            onClick={() => setActiveTab("products")}
          >
            Manage Products
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "orders" ? "active fw-bold" : ""}`}
            onClick={() => setActiveTab("orders")}
          >
            Manage Orders
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "users" ? "active fw-bold" : ""}`}
            onClick={() => setActiveTab("users")}
          >
            Manage Users
          </button>
        </li>
      </ul>

      {/* Tab Content */}
      <div className="bg-white p-4 rounded shadow-sm">
        {/* PRODUCTS TAB */}
        {activeTab === "products" && (
          <div>
            <h4 className="mb-4">Catalog & Add Product</h4>
            <div className="row">
              {/* Product Form */}
              <div className="col-md-4 border-end pe-4 mb-4">
                <h5>Add New Product</h5>
                <form onSubmit={handleCreateProduct} className="mt-3">
                  <div className="mb-3">
                    <input
                      className="form-control"
                      placeholder="Product Name"
                      value={newProduct.name}
                      onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <textarea
                      className="form-control"
                      placeholder="Description"
                      rows="2"
                      value={newProduct.description}
                      onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      className="form-control"
                      type="number"
                      placeholder="Price (₹)"
                      value={newProduct.price}
                      onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      className="form-control"
                      placeholder="Category"
                      value={newProduct.category}
                      onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      className="form-control"
                      placeholder="Image URL"
                      value={newProduct.image}
                      onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      className="form-control"
                      type="number"
                      placeholder="Stock Count"
                      value={newProduct.stock}
                      onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                      required
                    />
                  </div>
                  <button className="btn btn-primary w-100" type="submit">
                    Add Product
                  </button>
                </form>
              </div>

              {/* Product List */}
              <div className="col-md-8 ps-4">
                <h5>Product Catalog List</h5>
                <div className="table-responsive mt-3">
                  <table className="table align-middle">
                    <thead>
                      <tr>
                        <th>Product</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Stock</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((prod) => {
                        const prodName = prod.title || prod.name;
                        const prodImage = prod.imageUrl || prod.image || "https://images.unsplash.com/photo-1531403009284-440f080d1e12";
                        
                        return (
                          <tr key={prod._id}>
                            <td>
                              <div className="d-flex align-items-center gap-2">
                                <img
                                  src={prodImage}
                                  alt={prodName}
                                  style={{ width: "40px", height: "40px", objectFit: "cover", borderRadius: "5px" }}
                                />
                                <div>
                                  <div className="fw-semibold">{prodName}</div>
                                </div>
                              </div>
                            </td>
                            <td>{prod.category || "-"}</td>
                            <td className="fw-bold">₹{prod.price}</td>
                            <td>{prod.stock}</td>
                            <td>
                              <button
                                className="btn btn-outline-danger btn-sm border-0"
                                onClick={() => handleDeleteProduct(prod._id)}
                              >
                                <FaTrash />
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ORDERS TAB */}
        {activeTab === "orders" && (
          <div>
            <h4 className="mb-4">Orders List</h4>
            <div className="table-responsive">
              <table className="table align-middle">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th>Update Status</th>
                  </tr>
                </thead>
                <tbody>
                  {ordersList.map((order) => (
                    <tr key={order._id}>
                      <td>
                        <span className="fw-semibold small">{order._id}</span>
                        <div className="text-muted small">Items count: {order.items?.length || 0}</div>
                      </td>
                      <td className="fw-bold text-primary">₹{order.total}</td>
                      <td>
                        <span className={`badge ${
                          order.status === "Delivered" ? "bg-success" : 
                          order.status === "Shipped" ? "bg-info text-dark" : "bg-warning text-dark"
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td>
                        <select
                          className="form-select form-select-sm"
                          value={order.status}
                          onChange={(e) => handleUpdateOrderStatus(order._id, e.target.value)}
                          style={{ maxWidth: "150px" }}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* USERS TAB */}
        {activeTab === "users" && (
          <div>
            <h4 className="mb-4">Registered Users List</h4>
            <div className="table-responsive">
              <table className="table align-middle">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {usersList.map((u) => (
                    <tr key={u._id}>
                      <td className="fw-semibold">{u.name}</td>
                      <td>{u.email}</td>
                      <td>
                        <span className={`badge ${u.role === "admin" ? "bg-danger" : "bg-primary"}`}>
                          {u.role}
                        </span>
                      </td>
                      <td>
                        {u.role !== "admin" && (
                          <button
                            className="btn btn-outline-danger btn-sm border-0"
                            onClick={() => handleDeleteUser(u._id)}
                          >
                            <FaTrash />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;