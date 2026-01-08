import React, { useState } from "react";
import axios from "axios";

const BookingForm = ({ roomId, username }) => {
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [message, setMessage] = useState("");

  const handleBooking = async () => {
    try {
      await axios.post("http://localhost:8080/bookings", {
        roomId,
        username,
        checkInDate,
        checkOutDate,
      });
      setMessage("Room booked successfully!");
    } catch (err) {
      setMessage("Booking failed");
    }
  };

  return (
    <div>
      <input
        type="date"
        value={checkInDate}
        onChange={(e) => setCheckInDate(e.target.value)}
      />
      <input
        type="date"
        value={checkOutDate}
        onChange={(e) => setCheckOutDate(e.target.value)}
      />
      <button onClick={handleBooking}>Book</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default BookingForm;
