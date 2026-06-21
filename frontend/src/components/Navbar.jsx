import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaUser, FaSignOutAlt, FaTachometerAlt } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

function Navbar() {
  const { user, logout } = useAuth();
  const { cartItems } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="navbar navbar-expand-lg bg-white shadow-sm py-3">
      <div className="container">
        <Link className="navbar-brand text-primary fw-bold fs-4" to="/">
          ShopSphere
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <div className="navbar-nav ms-auto align-items-center">
            <Link className="nav-link mx-2" to="/">
              Home
            </Link>

            <Link className="nav-link mx-2" to="/products">
              Products
            </Link>

            <Link className="nav-link mx-2 position-relative me-3" to="/cart">
              <FaShoppingCart size={20} />
              {totalCartCount > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {totalCartCount}
                </span>
              )}
            </Link>

            {user ? (
              <div className="d-flex align-items-center gap-2">
                {user.role === "admin" && (
                  <Link className="btn btn-outline-secondary btn-sm mx-1" to="/admin">
                    <FaTachometerAlt /> Admin
                  </Link>
                )}
                
                <Link className="btn btn-light btn-sm mx-1" to="/profile">
                  <FaUser className="me-1" /> {user.name}
                </Link>

                <Link className="btn btn-light btn-sm mx-1" to="/orders">
                  Orders
                </Link>

                <button className="btn btn-outline-danger btn-sm mx-1" onClick={handleLogout}>
                  <FaSignOutAlt className="me-1" /> Logout
                </button>
              </div>
            ) : (
              <Link className="btn btn-primary btn-sm px-4" to="/login">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;