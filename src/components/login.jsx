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
        <div className="login-heading">
          <div className="login-logo">
            <img src="/images/dnyai-logo.jpeg" alt="DnyanAI logo" />
          </div>
          
        </div>

        <p className="login-subtitle">
          Please login to access the Education Agent
        </p>

        <form onSubmit={handleLogin}>
          <div className="input-group">
            <div className="input-with-icon">
              <span className="input-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" focusable="false">
                  <path d="M20 21a8 8 0 0 0-16 0" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </span>
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
          </div>

          <div className="input-group">
            <div className="input-with-icon">
              <span className="input-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" focusable="false">
                  <rect x="4" y="10" width="16" height="11" rx="2" />
                  <path d="M8 10V7a4 4 0 0 1 8 0v3" />
                </svg>
              </span>
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