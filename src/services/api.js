import { BUSES } from "./mockData";

const delay = (ms) => new Promise(res => setTimeout(res, ms));

const getDay = (date) =>
  ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"][new Date(date).getDay()];

export const apiService = {
  fetchBuses: async (from, to, date) => {
    await delay(800);

    const day = getDay(date);

    return BUSES.filter(
      bus =>
        bus.routes[0] === from &&
        bus.routes[1] === to &&
        bus.runningDays.includes(day)
    );
  },

  getBusById: async (id) => {
    await delay(400);
    return BUSES.find(b => b.id === id);
  },

  login: async (email, password) => {
    await delay(1000);
    if (email && password) {
      return { id: "U1", name: "User", email };
    }
    throw new Error("Invalid credentials");
  },

  saveBooking: async (bookingData) => {
    await delay(1500);
    const bookings = JSON.parse(localStorage.getItem("bookings") || "[]");
    const newBooking = {
      ...bookingData,
      id: "BK" + Math.floor(Math.random() * 1000000),
      timestamp: new Date().toISOString()
    };
    bookings.push(newBooking);
    localStorage.setItem("bookings", JSON.stringify(bookings));
    return newBooking;
  },

  getUserBookings: async () => {
    await delay(600);
    return JSON.parse(localStorage.getItem("bookings") || "[]");
  }
};
