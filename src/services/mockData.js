export const CITIES = [
  "New York", "Boston", "Washington DC", "Philadelphia", "Chicago", "Miami", "Los Angeles", "San Francisco"
];

export const BUSES = [
  {
    id: "B1",
    name: "Express Liner",
    type: "AC Sleeper",
    departure: "08:00 AM",
    arrival: "02:00 PM",
    duration: "6h 00m",
    price: 45,
    rating: 4.5,
    totalSeats: 32,
    availableSeats: [1, 2, 5, 8, 12, 15, 18, 20, 22, 25, 30],
    routes: ["New York", "Boston"]
  },
  {
    id: "B2",
    name: "Royal Travels",
    type: "Luxury Semi-Sleeper",
    departure: "10:30 AM",
    arrival: "05:30 PM",
    duration: "7h 00m",
    price: 35,
    rating: 4.2,
    totalSeats: 40,
    availableSeats: [3, 4, 6, 7, 10, 11, 14, 19, 21, 24, 28, 35, 38, 39],
    routes: ["New York", "Washington DC"]
  },
  {
    id: "B3",
    name: "Night Owl",
    type: "AC Sleeper",
    departure: "10:00 PM",
    arrival: "06:00 AM",
    duration: "8h 00m",
    price: 55,
    rating: 4.8,
    totalSeats: 30,
    availableSeats: [2, 4, 9, 13, 16, 20, 25],
    routes: ["Washington DC", "Boston"]
  },
  {
    id: "B4",
    name: "Skyline Connect",
    type: "Executive Class",
    departure: "09:00 AM",
    arrival: "04:30 PM",
    duration: "7h 30m",
    price: 60,
    rating: 4.9,
    totalSeats: 24,
    availableSeats: [1, 2, 3, 5, 8, 10, 12, 15, 20],
    routes: ["Chicago", "New York"]
  }
];

export const COUPONS = [
  { code: "SAVE10", discount: 10, type: "percentage" },
  { code: "WELCOME5", discount: 5, type: "fixed" }
];
