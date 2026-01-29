import { BUSES, CITIES } from './mockData';

const delay = (ms) => new Promise(res => setTimeout(res, ms));

export const apiService = {
  fetchBuses: async (from, to, date) => {
    await delay(800);
    return BUSES.filter(bus => 
      bus.routes.includes(from) && bus.routes.includes(to)
    );
  },

  getBusById: async (id) => {
    await delay(400);
    return BUSES.find(b => b.id === id);
  },

  login: async (email, password) => {
    await delay(1000);
    if (email && password) {
      return { id: "U1", name: "John Doe", email };
    }
    throw new Error("Invalid credentials");
  },

  saveBooking: async (bookingData) => {
    await delay(1500);
    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    const newBooking = {
      ...bookingData,
      id: "BK" + Math.floor(Math.random() * 1000000),
      timestamp: new Date().toISOString()
    };
    bookings.push(newBooking);
    localStorage.setItem('bookings', JSON.stringify(bookings));
    return newBooking;
  },

  getUserBookings: async (userId) => {
    await delay(600);
    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    return bookings;
  }
};
