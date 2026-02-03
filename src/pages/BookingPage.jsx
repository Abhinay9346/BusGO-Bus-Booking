import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../contexts/BookingContext';
import SeatLayout from '../components/SeatLayout';
import { Users, Info, ArrowLeft } from 'lucide-react';

const BookingPage = () => {
  const { selectedBus, selectedSeats, calculateTotal } = useBooking();
  const navigate = useNavigate();

  useEffect(() => {
    if (!selectedBus) {
      navigate('/search');
    }
  }, [selectedBus, navigate]);

  if (!selectedBus) return null;

  const total = calculateTotal(selectedBus.price);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
       <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-1 text-primary-600 font-medium mb-6 hover:underline"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Search
        </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Users className="text-primary-600" /> Select Your Seats
            </h2>
            <SeatLayout />
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border p-6 sticky top-8">
            <h3 className="font-bold text-lg mb-4">Journey Summary</h3>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Bus Name</span>
                <span className="font-medium">{selectedBus.name}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Type</span>
                <span className="font-medium">{selectedBus.type}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Selected Seats</span>
                <span className="font-medium">
                  {selectedSeats.length > 0 ? selectedSeats.join(', ') : 'None'}
                </span>
              </div>
            </div>

            {selectedSeats.length > 0 && (
              <div className="border-t pt-4">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-gray-600">Total Fare</span>
                  <span className="text-2xl font-bold text-primary-600">₹{total}</span>
                </div>
                <button
                  onClick={() => navigate('/checkout')}
                  className="w-full bg-primary-600 text-white font-bold py-3 rounded-lg hover:bg-primary-700 transition"
                >
                  Proceed to Checkout
                </button>
              </div>
            )}

            <div className="mt-6 flex items-start gap-2 bg-blue-50 p-4 rounded-lg text-xs text-blue-800">
              <Info className="h-4 w-4 shrink-0 mt-0.5" />
              <p>Tickets will be sent to your registered email and phone number after successful payment.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
