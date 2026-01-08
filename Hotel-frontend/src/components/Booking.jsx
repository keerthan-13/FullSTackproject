import React, { useEffect, useState } from "react";
import { addBooking, getAllBookings } from "../services/bookingService";
import { getAllRooms } from "../services/roomService";

const Booking = () => {
  const [bookings, setBookings] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [form, setForm] = useState({
    customerName: "",
    checkInDate: "",
    checkOutDate: "",
    roomId: "",
  });

  const loadData = () => {
    getAllBookings().then(res => setBookings(res.data));
    getAllRooms().then(res => setRooms(res.data));
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    addBooking({
      customerName: form.customerName,
      checkInDate: form.checkInDate,
      checkOutDate: form.checkOutDate,
      room: { id: form.roomId }
    }).then(() => {
      alert("Booking successful");
      loadData();
    });
  };

  return (
    <div>
      <h2>Book a Room</h2>

      <form onSubmit={handleSubmit}>
        <input placeholder="Customer Name"
          onChange={e => setForm({ ...form, customerName: e.target.value })}
          required />

        <input type="date"
          onChange={e => setForm({ ...form, checkInDate: e.target.value })}
          required />

        <input type="date"
          onChange={e => setForm({ ...form, checkOutDate: e.target.value })}
          required />

        <select
          onChange={e => setForm({ ...form, roomId: e.target.value })}
          required>
          <option value="">Select Room</option>
          {rooms.map(room => (
            <option key={room.id} value={room.id}>
              Room {room.roomNumber}
            </option>
          ))}
        </select>

        <button type="submit">Book</button>
      </form>

      <h2>Bookings</h2>
      <ul>
        {bookings.map(b => (
          <li key={b.id}>
            {b.customerName} booked Room {b.room.roomNumber}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Booking;
