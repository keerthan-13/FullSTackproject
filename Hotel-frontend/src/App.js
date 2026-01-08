import React, { useState, useEffect } from "react";
import "./App.css";
import Login from "./components/Login";
import Register from "./components/Register";
import RoomList from "./components/RoomList";
import Navbar from "./components/Navbar";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [role, setRole] = useState(null); // 🔹 null instead of ""
  const [showRegister, setShowRegister] = useState(false);

  // 🔹 LOAD LOGIN STATE FROM localStorage (ON PAGE REFRESH)
  useEffect(() => {
    const savedLogin = localStorage.getItem("isLoggedIn");
    const savedRole = localStorage.getItem("role");

    if (savedLogin === "true" && savedRole) {
      setLoggedIn(true);
      setRole(savedRole);
    }
  }, []);

  // 🔹 ON LOGIN SUCCESS
  const handleLoginSuccess = (data) => {
    setLoggedIn(true);
    setRole(data.role);

    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("role", data.role);
  };

  // 🔹 LOGOUT
  const handleLogout = () => {
    setLoggedIn(false);
    setRole(null);
    setShowRegister(false);

    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("role");
  };

  // 🔹 LOADING STATE (VERY IMPORTANT)
  if (loggedIn && !role) {
    return (
      <div className="app-container">
        <h2 style={{ color: "white" }}>Loading...</h2>
      </div>
    );
  }

  // 🔹 WHEN USER IS LOGGED IN
  if (loggedIn) {
    return (
      <div className="app-container">
        <Navbar role={role} onLogout={handleLogout} />
        <RoomList role={role} />
      </div>
    );
  }

  // 🔹 LOGIN / REGISTER SCREEN
  return (
    <div className="app-container">
      {showRegister ? (
        <Register onBackToLogin={() => setShowRegister(false)} />
      ) : (
        <>
          <Login onLoginSuccess={handleLoginSuccess} />
          <button
            className="link-btn"
            onClick={() => setShowRegister(true)}
          >
            New user? Register
          </button>
        </>
      )}
    </div>
  );
}

export default App;
