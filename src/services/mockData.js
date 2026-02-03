/* ================= CITIES ================= */
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

/* ================= DISTANCE MAP (KM) ================= */
const DISTANCE_KM = {
  Visakhapatnam: {
    Vijayawada: 350, Guntur: 380, Nellore: 500, Rajahmundry: 200,
    Eluru: 300, Tirupati: 800, Kurnool: 900, Anantapur: 1000, Kadapa: 950
  },
  Vijayawada: {
    Visakhapatnam: 350, Guntur: 35, Nellore: 280, Rajahmundry: 160,
    Eluru: 60, Tirupati: 450, Kurnool: 430, Anantapur: 550, Kadapa: 520
  },
  Guntur: {
    Visakhapatnam: 380, Vijayawada: 35, Nellore: 245, Rajahmundry: 180,
    Eluru: 90, Tirupati: 420, Kurnool: 410, Anantapur: 530, Kadapa: 500
  },
  Nellore: {
    Visakhapatnam: 500, Vijayawada: 280, Guntur: 245, Rajahmundry: 360,
    Eluru: 300, Tirupati: 140, Kurnool: 300, Anantapur: 450, Kadapa: 320
  },
  Kurnool: {
    Visakhapatnam: 900, Vijayawada: 430, Guntur: 410, Nellore: 300,
    Rajahmundry: 600, Eluru: 520, Tirupati: 330, Anantapur: 260, Kadapa: 210
  },
  Tirupati: {
    Visakhapatnam: 800, Vijayawada: 450, Guntur: 420, Nellore: 140,
    Rajahmundry: 520, Eluru: 480, Kurnool: 330, Anantapur: 380, Kadapa: 260
  },
  Rajahmundry: {
    Visakhapatnam: 200, Vijayawada: 160, Guntur: 180, Nellore: 360,
    Eluru: 140, Tirupati: 520, Kurnool: 600, Anantapur: 700, Kadapa: 650
  },
  Eluru: {
    Visakhapatnam: 300, Vijayawada: 60, Guntur: 90, Nellore: 300,
    Rajahmundry: 140, Tirupati: 480, Kurnool: 520, Anantapur: 650, Kadapa: 600
  },
  Anantapur: {
    Visakhapatnam: 1000, Vijayawada: 550, Guntur: 530, Nellore: 450,
    Rajahmundry: 700, Eluru: 650, Tirupati: 380, Kurnool: 260, Kadapa: 210
  },
  Kadapa: {
    Visakhapatnam: 950, Vijayawada: 520, Guntur: 500, Nellore: 320,
    Rajahmundry: 650, Eluru: 600, Tirupati: 260, Kurnool: 210, Anantapur: 210
  }
};

/* ================= REAL TRAVEL TIME ================= */
function calculateDuration(from, to, busType) {
  const distance = DISTANCE_KM[from]?.[to];
  if (!distance) return "N/A";

  let speed = 55;
  if (busType.includes("AC")) speed = 60;
  if (busType.includes("Non-AC")) speed = 50;

  const totalHours = distance / speed;
  const h = Math.floor(totalHours);
  const m = Math.round((totalHours - h) * 60);

  return `${h}h ${m}m`;
}

/* ================= REALISTIC PRICE ================= */
const PRICE_PER_KM = {
  "AC Sleeper": 2.4,
  "AC Semi-Sleeper": 2.0,
  "AC Seater": 1.8,
  "Non-AC Sleeper": 1.9,
  "Non-AC Seater": 1.4
};

function calculatePrice(from, to, busType) {
  const distance = DISTANCE_KM[from]?.[to];
  if (!distance) return 0;

  const rate = PRICE_PER_KM[busType] || 1.8;
  const basePrice = distance * rate;

  // small realistic variation
  return Math.round(basePrice + Math.random() * 50);
}

/* ================= BUS TEMPLATES (6 PER ROUTE) ================= */
const BUS_TEMPLATES = [
  { name: "APSRTC Express", type: "AC Sleeper" },
  { name: "Orange Travels", type: "Non-AC Sleeper" },
  { name: "Sri Balaji", type: "AC Semi-Sleeper" },
  { name: "Morning Star", type: "Non-AC Seater" },
  { name: "SVT Express", type: "AC Seater" },
  { name: "Coastal Rider", type: "Non-AC Sleeper" }
];

/* ================= TIME SLOTS ================= */
const TIME_SLOTS = [
  ["05:30 AM", "11:30 AM"],
  ["07:00 AM", "01:00 PM"],
  ["08:30 AM", "02:30 PM"],
  ["01:00 PM", "07:00 PM"],
  ["09:00 PM", "05:00 AM"],
  ["10:00 PM", "06:00 AM"]
];

const DAYS = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];

function generateSeats(total) {
  return Array.from({ length: total }, (_, i) => i + 1)
    .filter(n => n % 3 === 0 || n % 5 === 0);
}

/* ================= FINAL BUSES ================= */
let busId = 1;
export const BUSES = [];

CITIES.forEach(from => {
  CITIES.forEach(to => {
    if (from !== to) {
      BUS_TEMPLATES.forEach((tpl, i) => {
        const [departure, arrival] = TIME_SLOTS[i];

        BUSES.push({
          id: `AP${busId++}`,
          name: tpl.name,
          type: tpl.type,
          departure,
          arrival,
          duration: calculateDuration(from, to, tpl.type),
          price: calculatePrice(from, to, tpl.type),
          rating: (4 + Math.random()).toFixed(1),
          totalSeats: 40,
          availableSeats: generateSeats(40),
          routes: [from, to],
          runningDays: DAYS
        });
      });
    }
  });
});

/* ================= COUPONS ================= */
export const COUPONS = [
  { code: "SAVE10", discount: 10, type: "percentage" },
  { code: "WELCOME50", discount: 50, type: "fixed" }
];
