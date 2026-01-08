import api from "./api";

export const createBooking = (booking) => {
  return api.post("/bookings", booking);
};

export const getMyBookings = (username) => {
  return api.get(`/bookings/user/${username}`);
};
