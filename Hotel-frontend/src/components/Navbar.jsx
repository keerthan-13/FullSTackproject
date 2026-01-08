import React from "react";

const Navbar = ({ role, onLogout }) => {
  return (
    <nav style={styles.navbar}>
      <h3 style={styles.logo}>Hotel Management</h3>

      <div style={styles.links}>
        <button style={styles.btn}>Rooms</button>

        {role === "ADMIN" && (
          <>
            <button style={styles.btn}>Add Room</button>
            <button style={styles.btn}>Bookings</button>
          </>
        )}

        {role === "USER" && (
          <button style={styles.btn}>My Bookings</button>
        )}

        <button style={styles.logoutBtn} onClick={onLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 20px",
    backgroundColor: "#1e3c72",
    color: "white",
    borderRadius: "8px",
    marginBottom: "20px",
  },
  logo: {
    margin: 0,
  },
  links: {
    display: "flex",
    gap: "10px",
  },
  btn: {
    background: "white",
    color: "#1e3c72",
    border: "none",
    padding: "6px 12px",
    borderRadius: "5px",
    cursor: "pointer",
  },
  logoutBtn: {
    background: "#e63946",
    color: "white",
    border: "none",
    padding: "6px 12px",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default Navbar;
