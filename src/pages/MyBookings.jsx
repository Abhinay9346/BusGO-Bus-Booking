import React, { useState, useEffect } from 'react';
import { apiService } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import { Ticket, Calendar, MapPin, Loader2 } from 'lucide-react';

const MyBookings = () => {
  const { user } = useAuth();

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedTicket, setSelectedTicket] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await apiService.getUserBookings(user.id);
        setBookings(
          data.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
        );
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [user]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
        <Ticket className="h-8 w-8 text-primary-600" />
        My Bookings
      </h2>

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
        </div>
      ) : bookings.length > 0 ? (
        <div className="space-y-6">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="bg-white rounded-xl border shadow-sm overflow-hidden flex flex-col md:flex-row"
            >
              {/* LEFT */}
              <div className="bg-primary-600 p-6 flex items-center justify-center text-white md:w-48 text-center flex-col">
                <p className="text-xs uppercase tracking-widest opacity-80 mb-1">
                  Ticket ID
                </p>
                <p className="text-xl font-mono font-bold">{booking.id}</p>
              </div>

              {/* RIGHT */}
              <div className="p-6 flex-1">
                <div className="flex flex-col md:flex-row justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-lg underline decoration-primary-200 underline-offset-4">
                      {booking.busName}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {booking.busType}
                    </p>
                  </div>

                  <div className="text-right mt-2 md:mt-0">
                    <p className="text-xl font-bold text-gray-800">
                      ₹{booking.amount}
                    </p>
                    <p className="text-xs text-green-600 font-bold uppercase">
                      CONFIRMED
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-5">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600">
                      {new Date(booking.date).toLocaleDateString('en-US', {
                        weekday: 'short',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600 font-medium">
                      {booking.from} → {booking.to}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-sm">
                    <Ticket className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600 font-medium">
                      Seats: {booking.seats.join(', ')}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedTicket(booking)}
                  className="px-5 py-2 rounded-md bg-primary-600 text-white text-sm font-semibold hover:bg-primary-700 transition"
                >
                  View Ticket
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white p-12 text-center rounded-xl border border-dashed border-gray-300">
          <p className="text-gray-500 text-lg mb-4">
            You haven't made any bookings yet.
          </p>
          <a href="/" className="text-primary-600 font-bold hover:underline">
            Start your first journey
          </a>
        </div>
      )}

      {/* ================= VIEW TICKET MODAL ================= */}
      {selectedTicket && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl overflow-hidden">

            {/* HEADER */}
            <div className="bg-primary-600 text-white px-6 py-5 flex justify-between items-center">
              <div>
                <h3 className="text-lg font-bold tracking-wide">
                  BusGO E-Ticket
                </h3>
                <p className="text-xs opacity-90">
                  Booking ID • {selectedTicket.id}
                </p>
              </div>

              <button
                onClick={() => setSelectedTicket(null)}
                className="text-white text-xl font-bold"
              >
                ×
              </button>
            </div>

            {/* BODY */}
            <div className="p-6 space-y-6 text-sm text-gray-700">

              {/* ROUTE */}
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-xs text-gray-400">From</p>
                  <p className="font-semibold text-gray-900">
                    {selectedTicket.from}
                  </p>
                </div>

                <div className="text-primary-600 font-bold text-xl">→</div>

                <div className="text-right">
                  <p className="text-xs text-gray-400">To</p>
                  <p className="font-semibold text-gray-900">
                    {selectedTicket.to}
                  </p>
                </div>
              </div>

              <hr />

              {/* DETAILS */}
              <div className="grid grid-cols-2 gap-4">
                <Info label="Bus" value={selectedTicket.busName} />
                <Info label="Type" value={selectedTicket.busType} />
                <Info label="Date" value={new Date(selectedTicket.date).toDateString()} />
                <Info label="Seats" value={selectedTicket.seats.join(', ')} />
                <Info label="Departure" value={selectedTicket.departure} />
                <Info label="Arrival" value={selectedTicket.arrival} />
              </div>

              <hr />

              {/* ✅ PASSENGER DETAILS */}
              {Array.isArray(selectedTicket.passengers) &&
                selectedTicket.passengers.length > 0 && (
                  <div>
                    <p className="font-semibold text-gray-800 mb-3">
                      Passenger Details
                    </p>

                    <div className="border rounded-lg overflow-hidden">
                      <table className="w-full text-sm">
                        <thead className="bg-gray-50 text-gray-600">
                          <tr>
                            <th className="px-3 py-2 text-left">Seat</th>
                            <th className="px-3 py-2 text-left">Name</th>
                            <th className="px-3 py-2 text-left">Age</th>
                            <th className="px-3 py-2 text-left">Gender</th>
                          </tr>
                        </thead>
                        <tbody>
                          {selectedTicket.passengers.map((p, i) => (
                            <tr key={i} className="border-t">
                              <td className="px-3 py-2 font-medium">{p.seat}</td>
                              <td className="px-3 py-2">{p.name}</td>
                              <td className="px-3 py-2">{p.age}</td>
                              <td className="px-3 py-2">{p.gender}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

              <hr />

              {/* FARE */}
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-xs text-gray-400">Total Fare</p>
                  <p className="text-xl font-bold text-gray-900">
                    ₹{selectedTicket.amount}
                  </p>
                </div>

                <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold">
                  CONFIRMED
                </span>
              </div>
            </div>

            <div className="bg-gray-50 px-6 py-4 text-xs text-gray-500 text-center">
              Please carry a valid ID proof during travel
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const Info = ({ label, value }) => (
  <div>
    <p className="text-xs text-gray-400">{label}</p>
    <p className="font-medium">{value}</p>
  </div>
);

export default MyBookings;
