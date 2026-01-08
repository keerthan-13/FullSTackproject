import api from "./api";

export const getAllRooms = () => {
  return api.get("/rooms");
};

export const addRoom = (room) => {
  return api.post("/rooms", room);
};
