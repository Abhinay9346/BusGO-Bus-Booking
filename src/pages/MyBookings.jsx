import React, { useState, useEffect } from 'react';
import { apiService } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import { Ticket, Calendar, MapPin, Loader2 } from 'lucide-react';

const MyBookings = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await apiService.getUserBookings(user.id);
        setBookings(data.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)));
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
            <div key={booking.id} className="bg-white rounded-xl border shadow-sm overflow-hidden flex flex-col md:flex-row">
              <div className="bg-primary-600 p-6 flex items-center justify-center text-white md:w-48 text-center flex-col">
                <p className="text-xs uppercase tracking-widest opacity-80 mb-1">Ticket ID</p>
                <p className="text-xl font-mono font-bold">{booking.id}</p>
              </div>
              <div className="p-6 flex-1">
                <div className="flex flex-col md:flex-row justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-lg underline decoration-primary-200 underline-offset-4">{booking.busName}</h3>
                    <p className="text-sm text-gray-500">{booking.busType}</p>
                  </div>
                  <div className="text-right mt-2 md:mt-0">
                    <p className="text-xl font-bold text-gray-800">${booking.amount}</p>
                    <p className="text-xs text-green-600 font-bold uppercase tracking-tight">Confirmed</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600">
                      {new Date(booking.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600 font-medium">{booking.from} <span className="mx-1">→</span> {booking.to}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Ticket className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600 font-medium">Seats: {booking.seats.join(', ')}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white p-12 text-center rounded-xl border border-dashed border-gray-300">
          <p className="text-gray-500 text-lg mb-4">You haven't made any bookings yet.</p>
          <a href="/" className="text-primary-600 font-bold hover:underline">Start your first journey</a>
        </div>
      )}
    </div>
  );
};

export default MyBookings;
