import React, { useEffect, useState } from "react";
import { getAllRooms } from "../services/roomService";
import AddRoom from "./AddRoom";
import BookingForm from "./BookingForm";

// 🔹 IMPORT ROOM IMAGES
import room1 from "../assets/rooms/room1.jpg";
import room2 from "../assets/rooms/room2.jpg";
import room3 from "../assets/rooms/room3.jpg";

const RoomList = ({ role }) => {
  const [rooms, setRooms] = useState([]);
  const username = localStorage.getItem("username") || "user";

  // 🔹 IMAGE MAPPING (STEP 3)
const roomImages = {
  201: room1,
  301: room2,
  Suite: room3,
  Deluxe: room2,
};

  const loadRooms = () => {
    getAllRooms().then((res) => setRooms(res.data));
  };

  useEffect(() => {
    loadRooms();
  }, []);

  return (
    <div>
      {role === "ADMIN" && <AddRoom onRoomAdded={loadRooms} />}

      <h2>Room List</h2>

      <table>
        <thead>
          <tr>
            <th>Image</th>
            <th>Room No</th>
            <th>Type</th>
            <th>Price</th>
            {role === "USER" && <th>Book</th>}
          </tr>
        </thead>

        <tbody>
          {rooms.map((room) => (
            <tr key={room.id}>
              <td>
                <img
                  src={
                    roomImages[room.roomNumber] ||
                    roomImages[room.roomType] ||
                    room1
                  }
                  alt="room"
                  style={{
                    width: "120px",
                    height: "80px",
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                />
              </td>

              <td>{room.roomNumber}</td>
              <td>{room.roomType}</td>
              <td>₹ {room.price}</td>

              {role === "USER" && (
                <td>
                  <BookingForm roomId={room.id} username={username} />
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RoomList;
