import React, { useEffect, useState } from "react";
import axios from "axios";

const MyBookings = ({ role }) => {
  const [bookings, setBookings] = useState([]);
  const username = localStorage.getItem("username") || "user";

  useEffect(() => {
    const url =
      role === "ADMIN"
        ? "http://localhost:8080/bookings"
        : `http://localhost:8080/bookings/user/${username}`;

    axios.get(url).then((res) => setBookings(res.data));
  }, [role, username]);

  return (
    <div>
      <h2>{role === "ADMIN" ? "All Bookings" : "My Bookings"}</h2>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>User</th>
            <th>Room ID</th>
            <th>Check-In</th>
            <th>Check-Out</th>
          </tr>
        </thead>

        <tbody>
          {bookings.map((b) => (
            <tr key={b.id}>
              <td>{b.id}</td>
              <td>{b.username}</td>
              <td>{b.roomId}</td>
              <td>{b.checkInDate}</td>
              <td>{b.checkOutDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyBookings;
