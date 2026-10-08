import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./login.css";
import { findUser, getCurrentUser, normalizeUser, saveUser } from "../auth";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const [adminId, setAdminId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  // Sub-card कडून आलेला डेटा
  const redirectTo = location.state?.redirectTo || "/products";
  const targetAgentId = location.state?.targetAgentId || location.state?.agentId || null;
  const targetAgentName = location.state?.targetAgentName || "this agent";

  const handleBackToHomeProducts = () => {
    navigate("/");

    setTimeout(() => {
      const productsSection = document.getElementById("products");

      if (productsSection) {
        productsSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 100);
  };

  // युजरला संबंधित एजंटचा ॲक्सेस आहे का तपासणे
  const verifyAgentAccess = (user) => {
    if (!targetAgentId) return true;

    const role = user?.role || user?.userRole || "user";
    if (role === "admin") return true;

    const allowed = Array.isArray(user?.allowedAgents) ? user.allowedAgents : [];
    return allowed.includes(targetAgentId);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    const parseResponseBody = async (response) => {
      try {
        const text = await response.text();

        if (!text) {
          return {};
        }

        try {
          return JSON.parse(text);
        } catch {
          return { message: text };
        }
      } catch {
        return {};
      }
    };

    // ==========================================
    // API LOGIN ATTEMPTS
    // ==========================================
    const loginAttempts = [
      { email: adminId, password },
      { username: adminId, password },
    ];

    let lastError = "Invalid Email or Password";

    try {
      for (const payload of loginAttempts) {
        // const response = await fetch("http://localhost:8080/api/auth/login", {
         const response = await fetch("https://dnyanaihelpme-medical-billing-system.hf.space/api/auth/dnyanailogin", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        const data = await parseResponseBody(response);

        if (response.ok) {
          const loggedInUser = normalizeUser(data.user || data);

          // एजंट ॲक्सेस व्हेरिफाय करा
          if (!verifyAgentAccess(loggedInUser)) {
            setError(
              `You are not registered for ${targetAgentName}. Please register first to access this agent.`
            );
            return;
          }

          saveUser(loggedInUser);

          navigate(redirectTo, {
            state: { loggedInUser },
          });
          return;
        }

        lastError = data?.message || data?.error || data?.detail || lastError;
      }
    } catch (apiError) {
      console.error("Login API Error:", apiError);
      lastError = "Server error. Please try again later.";
    }

    // ==========================================
    // LOCAL / FALLBACK AUTHENTICATION
    // ==========================================
    const storedUser = findUser(adminId, password) || getCurrentUser();

    if (
      storedUser &&
      ((storedUser.email && storedUser.email === adminId) ||
        (storedUser.username && storedUser.username === adminId)) &&
      storedUser.password === password
    ) {
      const loggedInUser = findUser(adminId, password) || normalizeUser(storedUser);

      // एजंट ॲक्सेस व्हेरिफाय करा
      if (!verifyAgentAccess(loggedInUser)) {
        setError(
          `You are not registered for ${targetAgentName}. Please register first to access this agent.`
        );
        return;
      }

      saveUser(loggedInUser);

      navigate(redirectTo, {
        state: { loggedInUser },
      });
      return;
    }

    setError(lastError);
  };

  return (
    <div className="login-page">
      <div className="login-box">

        {/* ==================================
            LOGO
        ================================== */}
        <div className="login-heading">
          <div className="login-logo">
            <img src="/images/dnyai-logo.jpeg" alt="DnyanAI logo" />
          </div>
        </div>

        {/* ==================================
            SUBTITLE
        ================================== */}
        <h2 style={{ textAlign: "center", color: "#111827", fontWeight: "bold" }}>
          Login
        </h2>
        <p style={{ textAlign: "center", color: "#6b7280", fontSize: "15px", lineHeight: "1.4" }}>
          Sign in to continue
        </p>

        {/* ==================================
            LOGIN FORM
        ================================== */}
        <form onSubmit={handleLogin}>

          {/* USERNAME / EMAIL */}
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
                placeholder="Enter Email / Username"
                value={adminId}
                onChange={(e) => {
                  setAdminId(e.target.value);
                  setError("");
                }}
                required
              />
            </div>
          </div>

          {/* PASSWORD */}
          <div className="input-group">
            <div className="input-with-icon">
              <span className="input-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" focusable="false">
                  <rect x="4" y="10" width="16" height="11" rx="2" />
                  <path d="M8 10V7a4 4 0 0 1 8 0v3" />
                </svg>
              </span>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
                required
              />
              <button
                type="button"
                className="show-password-btn"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            <div className="forgot-password-row">
              <button
                type="button"
                className="forgot-password-btn"
                onClick={() => setError("Password reset is not available yet.")}
              >
                Forgot Password?
              </button>
            </div>

            {/* ERROR DISPLAY */}
            {error && (
              <p className="login-error" style={{ marginTop: "10px" }}>
                {error}
              </p>
            )}
          </div>

          {/* LOGIN BUTTON */}
          <button type="submit" className="login-btn">
            Login
          </button>
        </form>

        {/* ==================================
            SIGNUP + BACK TO PRODUCTS
        ================================== */}
        <div className="login-bottom-actions">
          <div className="signup-redirect">
            <button type="button" onClick={() => navigate("/signup")}>
              <span style={{ marginRight: "10px" }}>Don't have an account?</span>
              Sign Up
            </button>
          </div>

          <button
            type="button"
            className="back-products-btn"
            onClick={handleBackToHomeProducts}
          >
            ← Back to Products
          </button>
        </div>

      </div>
    </div>
  );
}

export default Login;