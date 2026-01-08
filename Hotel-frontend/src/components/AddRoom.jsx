import React, { useState } from "react";
import axios from "axios";

const AddRoom = ({ onRoomAdded }) => {
  const [roomNumber, setRoomNumber] = useState("");
  const [roomType, setRoomType] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAddRoom = async () => {
    try {
      setLoading(true);

      await axios.post("http://localhost:8080/rooms", {
        roomNumber,
        roomType,
        price: Number(price),
        imageUrl,
        available: true,
      });

      alert("✅ Room added successfully");

      setRoomNumber("");
      setRoomType("");
      setPrice("");
      setImageUrl("");

      if (onRoomAdded) onRoomAdded();
    } catch (error) {
      console.error("Add room error:", error);
      alert("❌ Backend not reachable or CORS issue");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-card">
      <h3>Add Room</h3>

      <input
        placeholder="Room Number"
        value={roomNumber}
        onChange={(e) => setRoomNumber(e.target.value)}
      />

      <input
        placeholder="Room Type"
        value={roomType}
        onChange={(e) => setRoomType(e.target.value)}
      />

      <input
        placeholder="Price"
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      <input
        placeholder="Image URL"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
      />

      <button onClick={handleAddRoom} disabled={loading}>
        {loading ? "Adding..." : "Add Room"}
      </button>
    </div>
  );
};

export default AddRoom;
