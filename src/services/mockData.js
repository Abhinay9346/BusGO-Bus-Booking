export const CITIES = [
  "Visakhapatnam",
  "Vijayawada",
  "Guntur",
  "Nellore",
  "Kurnool",
  "Tirupati",
  "Rajahmundry",
  "Eluru",
  "Anantapur",
  "Kadapa"
];

export const BUSES = [
  {
    id: "AP1",
    name: "APSRTC Express",
    type: "AC Sleeper",
    departure: "08:00 AM",
    arrival: "02:00 PM",
    duration: "6h 00m",
    price: 950,
    rating: 4.5,
    totalSeats: 32,
    availableSeats: [1, 3, 5, 7, 10, 12, 15, 18, 21, 25, 28],
    routes: ["Visakhapatnam", "Vijayawada"],
    runningDays: ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"]
  },

  {
    id: "AP2",
    name: "Orange Travels",
    type: "Non-AC Sleeper",
    departure: "09:00 PM",
    arrival: "05:00 AM",
    duration: "8h 00m",
    price: 800,
    rating: 4.2,
    totalSeats: 36,
    availableSeats: [2, 4, 6, 9, 11, 14, 17, 20, 23, 27, 30, 34],
    routes: ["Vijayawada", "Tirupati"],
    runningDays: ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"]
  },

  {
    id: "AP3",
    name: "Sri Krishna Travels",
    type: "AC Semi-Sleeper",
    departure: "07:30 AM",
    arrival: "01:30 PM",
    duration: "6h 00m",
    price: 700,
    rating: 4.3,
    totalSeats: 40,
    availableSeats: [1, 5, 8, 12, 16, 20, 24, 28, 33, 37],
    routes: ["Guntur", "Nellore"],
    runningDays: ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"]
  },

  {
    id: "AP4",
    name: "Morning Star",
    type: "Non-AC Seater",
    departure: "06:00 AM",
    arrival: "11:30 AM",
    duration: "5h 30m",
    price: 450,
    rating: 4.0,
    totalSeats: 45,
    availableSeats: [3, 6, 9, 14, 18, 22, 26, 30, 35, 40],
    routes: ["Vijayawada", "Guntur"],
    runningDays: ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"]
  },

  {
    id: "AP5",
    name: "Jagan Deluxe",
    type: "AC Sleeper",
    departure: "10:00 PM",
    arrival: "06:00 AM",
    duration: "8h 00m",
    price: 1100,
    rating: 4.7,
    totalSeats: 30,
    availableSeats: [1, 4, 7, 10, 13, 16, 20, 24, 28],
    routes: ["Vijayawada", "Guntur"],
    runningDays: ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"]
  },

  {
    id: "AP6",
    name: "Venkateswara Travels",
    type: "Semi-Sleeper",
    departure: "01:00 PM",
    arrival: "07:00 PM",
    duration: "6h 00m",
    price: 650,
    rating: 4.1,
    totalSeats: 38,
    availableSeats: [2, 6, 10, 15, 19, 23, 27, 31, 35],
    routes: ["Vijayawada", "Guntur"],
    runningDays: ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"]
  },

  {
    id: "AP7",
    name: "SVT Express",
    type: "AC Seater",
    departure: "05:30 AM",
    arrival: "11:30 AM",
    duration: "6h 00m",
    price: 600,
    rating: 4.4,
    totalSeats: 42,
    availableSeats: [1, 4, 8, 12, 16, 21, 26, 30, 35, 39],
    routes: ["Vijayawada", "Guntur"],
    runningDays: ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"]
  },

  {
    id: "AP8",
    name: "Sri Balaji",
    type: "Non-AC Sleeper",
    departure: "08:30 PM",
    arrival: "04:30 AM",
    duration: "8h 00m",
    price: 750,
    rating: 4.0,
    totalSeats: 34,
    availableSeats: [3, 7, 11, 14, 18, 22, 26, 29, 32],
    routes: ["Vijayawada", "Guntur"],
    runningDays: ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"]
  },

  {
    id: "AP9",
    name: "Godavari Express",
    type: "AC Semi-Sleeper",
    departure: "09:00 AM",
    arrival: "03:30 PM",
    duration: "6h 30m",
    price: 720,
    rating: 4.6,
    totalSeats: 40,
    availableSeats: [2, 6, 10, 14, 18, 22, 26, 30, 35],
    routes: ["Rajahmundry", "Eluru"],
    runningDays: ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"]
  },

  {
    id: "AP10",
    name: "Coastal Rider",
    type: "Non-AC Seater",
    departure: "07:00 AM",
    arrival: "01:00 PM",
    duration: "6h 00m",
    price: 480,
    rating: 4.1,
    totalSeats: 45,
    availableSeats: [1, 5, 9, 13, 18, 22, 27, 31, 36, 41],
    routes: ["Eluru", "Visakhapatnam"],
    runningDays: ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"]
  },

  {
    id: "AP11",
    name: "Rayalaseema King",
    type: "AC Sleeper",
    departure: "09:30 PM",
    arrival: "05:30 AM",
    duration: "8h 00m",
    price: 1050,
    rating: 4.8,
    totalSeats: 32,
    availableSeats: [2, 5, 9, 13, 17, 21, 25, 29],
    routes: ["Kurnool", "Kadapa"],
    runningDays: ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"]
  },

  {
    id: "AP12",
    name: "Capital Connect",
    type: "AC Semi-Sleeper",
    departure: "04:00 PM",
    arrival: "10:00 PM",
    duration: "6h 00m",
    price: 680,
    rating: 4.3,
    totalSeats: 40,
    availableSeats: [1, 4, 8, 12, 16, 20, 24, 28, 32, 36],
    routes: ["Vijayawada", "Guntur"],
    runningDays: ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"]
  }
];

export const COUPONS = [
  { code: "SAVE10", discount: 10, type: "percentage" },
  { code: "WELCOME50", discount: 50, type: "fixed" }
];
