import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaUserCircle } from "react-icons/fa";

function Profile() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  if (!user) return null;

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="auth-box text-center" style={{ maxWidth: "450px", width: "100%" }}>
        <FaUserCircle size={80} className="text-primary mb-3" />
        <h2 className="mb-4">User Profile</h2>

        <div className="text-start mt-3">
          <div className="mb-3">
            <label className="fw-semibold text-muted small">Full Name</label>
            <div className="form-control bg-light border-0 py-2">{user.name}</div>
          </div>

          <div className="mb-3">
            <label className="fw-semibold text-muted small">Email Address</label>
            <div className="form-control bg-light border-0 py-2">{user.email}</div>
          </div>

          <div className="mb-4">
            <label className="fw-semibold text-muted small">Account Role</label>
            <div className="form-control bg-light border-0 py-2 text-capitalize">
              <span className={`badge ${user.role === "admin" ? "bg-danger" : "bg-primary"}`}>
                {user.role}
              </span>
            </div>
          </div>
        </div>

        <button className="btn btn-primary w-100 disabled" title="Update feature is currently under development">
          Edit Profile
        </button>
        <p className="text-muted small mt-2">Profile updating is managed by system administrators.</p>
      </div>
    </div>
  );
}

export default Profile;