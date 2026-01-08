import React, { useState } from "react";
import axios from "axios";
import "./Auth.css";

// ✅ IMPORT LOGIN IMAGE
import loginImage from "../assets/login.jpg";

const Login = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:8080/auth/login",
        {
          username,
          password,
        }
      );

      if (response.data.status === "success") {
        onLoginSuccess(response.data);
      } else {
        setError(response.data.message || "Invalid credentials");
      }
    } catch (err) {
      console.error("Login error:", err);

      // 🔹 STEP 4: PROPER ERROR HANDLING
      if (err.response) {
        // Backend responded with error
        setError(err.response.data.message || "Invalid credentials");
      } else {
        // Backend not reachable / CORS / network issue
        setError("Backend not reachable");
      }
    }
  };

  return (
    <div className="auth-wrapper">
      {/* LEFT IMAGE */}
      <div className="auth-image">
        <img src={loginImage} alt="Hotel Login" />
      </div>

      {/* RIGHT LOGIN FORM */}
      <div className="auth-container">
        <h2>Login</h2>

        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Login</button>

          {error && <p className="error">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default Login;
