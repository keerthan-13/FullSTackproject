import React, { useState } from "react";
import axios from "axios";

const Register = ({ onBackToLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8080/auth/register",
        {
          username: username,
          password: password,
        }
      );

      if (response.data.status === "registered") {
        setMessage("Registration successful! Please login.");
      } else if (response.data.status === "exists") {
        setMessage("User already exists.");
      }
    } catch (err) {
      setMessage("Registration failed. Try again.");
    }
  };

  return (
    <div className="form-card">
      <h2>Register</h2>

      <form onSubmit={handleRegister}>
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

        <button type="submit">Register</button>
      </form>

      {message && <p className="success">{message}</p>}

      <button className="link-btn" onClick={onBackToLogin}>
        Back to Login
      </button>
    </div>
  );
};

export default Register;
