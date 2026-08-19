import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./login.css";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const [adminId, setAdminId] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  // Get the page which user wanted to open
  const redirectTo = location.state?.redirectTo || "/products";

  const handleLogin = (e) => {
    e.preventDefault();

    // Admin credentials
    const ADMIN_ID = "admin";
    const ADMIN_PASSWORD = "admin123";

    if (adminId === ADMIN_ID && password === ADMIN_PASSWORD) {
      // Save login status
      sessionStorage.setItem("isLoggedIn", "true");

      // Go to actual agent page
      navigate(redirectTo);
    } else {
      setError("Invalid Admin ID or Password");
    }
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <h2>Admin Login</h2>

        <p className="login-subtitle">
          Please login to access the Education Agent
        </p>

        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label>Admin ID</label>

            <input
              type="text"
              placeholder="Enter Admin ID"
              value={adminId}
              onChange={(e) => {
                setAdminId(e.target.value);
                setError("");
              }}
            />
          </div>

          <div className="input-group">
            <label>Password</label>

            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
            />
          </div>

          {error && <p className="login-error">{error}</p>}

          <button type="submit" className="login-btn">
            Login
          </button>
        </form>

        <button
          className="back-products-btn"
          onClick={() => navigate("/products")}
        >
          ← Back to Products
        </button>
      </div>
    </div>
  );
}

export default Login;