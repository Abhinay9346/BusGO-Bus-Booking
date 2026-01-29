import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../contexts/BookingContext';
import { useAuth } from '../contexts/AuthContext';
import { apiService } from '../services/api';
import { CreditCard, Tag, Loader2, CheckCircle2 } from 'lucide-react';
import { COUPONS } from '../services/mockData';

const Checkout = () => {
  const { selectedBus, selectedSeats, calculateTotal, searchParams, resetBooking } = useBooking();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [coupon, setCoupon] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  // ✅ PASSENGERS STATE (seat-wise)
  const [passengers, setPassengers] = useState(
    selectedSeats.map(seat => ({
      seat,
      name: '',
      age: '',
      gender: ''
    }))
  );

  if (!selectedBus || selectedSeats.length === 0) {
    navigate('/');
    return null;
  }

  const subtotal = calculateTotal(selectedBus.price);
  const finalTotal = subtotal - appliedDiscount;

  const handlePassengerChange = (index, field, value) => {
    const updated = [...passengers];
    updated[index][field] = value;
    setPassengers(updated);
  };

  const allPassengersValid = passengers.every(
    p => p.name && p.age && p.gender
  );

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    const found = COUPONS.find(
      c => c.code.toUpperCase() === coupon.toUpperCase()
    );

    if (found) {
      const discount =
        found.type === 'percentage'
          ? (subtotal * found.discount) / 100
          : found.discount;

      setAppliedDiscount(discount);
      setError('');
    } else {
      setError('Invalid coupon code');
      setAppliedDiscount(0);
    }
  };

  const handlePayment = async () => {
    setIsProcessing(true);
    try {
      const bookingData = {
        userId: user.id,
        passengers,
        busName: selectedBus.name,
        busType: selectedBus.type,
        from: searchParams.from,
        to: searchParams.to,
        date: searchParams.date,
        seats: selectedSeats,
        amount: finalTotal + 2,
        departure: selectedBus.departure,
        arrival: selectedBus.arrival,
        status: "CONFIRMED",
        refundAmount: 0
      };

      await apiService.saveBooking(bookingData);
      setIsSuccess(true);

      setTimeout(() => {
        resetBooking();
        navigate('/my-bookings');
      }, 3000);
    } catch (err) {
      setError('Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="max-w-md mx-auto py-20 px-4 text-center">
        <div className="bg-white p-8 rounded-2xl shadow-xl">
          <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4 animate-bounce" />
          <h2 className="text-2xl font-bold mb-2">Booking Confirmed!</h2>
          <p className="text-gray-500 mb-6">Redirecting to your bookings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold mb-8">Checkout</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* LEFT SIDE */}
        <div className="space-y-6">

          {/* PASSENGER DETAILS */}
          <div className="bg-white p-6 rounded-xl border shadow-sm">
            <h3 className="font-bold mb-4">Passenger Details</h3>

            <div className="space-y-4">
              {passengers.map((p, index) => (
                <div key={p.seat} className="border rounded-lg p-4 bg-gray-50">
                  <p className="font-semibold mb-3 text-primary-600">
                    Seat {p.seat}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <input
                      type="text"
                      placeholder="Full name"
                      value={p.name}
                      onChange={(e) =>
                        handlePassengerChange(index, 'name', e.target.value)
                      }
                      className="p-2.5 border rounded-lg"
                    />

                    <input
                      type="number"
                      placeholder="Age"
                      min="1"
                      max="100"
                      value={p.age}
                      onChange={(e) =>
                        handlePassengerChange(index, 'age', e.target.value)
                      }
                      className="p-2.5 border rounded-lg"
                    />

                    <select
                      value={p.gender}
                      onChange={(e) =>
                        handlePassengerChange(index, 'gender', e.target.value)
                      }
                      className="p-2.5 border rounded-lg"
                    >
                      <option value="">Gender</option>
                      <option>Male</option>
                      <option>Female</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* PAYMENT METHOD */}
          <div className="bg-white p-6 rounded-xl border shadow-sm">
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <CreditCard className="text-primary-600" /> Payment Method
            </h3>

            <div className="p-4 border-2 border-primary-500 bg-primary-50 rounded-lg mb-4">
              <p className="font-bold text-primary-900">Credit / Debit Card</p>
              <p className="text-sm text-primary-700">Simulated secure payment</p>
            </div>

            <input
              className="w-full p-2.5 border rounded-lg mb-3"
              disabled
              value="**** **** **** 4242"
            />

            <div className="grid grid-cols-2 gap-4">
              <input className="p-2.5 border rounded-lg" disabled value="12/28" />
              <input className="p-2.5 border rounded-lg" disabled value="***" />
            </div>
          </div>

          {/* COUPONS */}
          <div className="bg-white p-6 rounded-xl border shadow-sm">
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <Tag className="text-primary-600" /> Offers & Coupons
            </h3>

            <form onSubmit={handleApplyCoupon} className="flex gap-2">
              <input
                type="text"
                placeholder="Enter SAVE10"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
                className="flex-1 p-2.5 border rounded-lg uppercase"
              />
              <button className="bg-gray-800 text-white px-4 rounded-lg font-bold">
                Apply
              </button>
            </form>

            {error && (
              <p className="text-red-500 text-sm mt-2">{error}</p>
            )}

            {appliedDiscount > 0 && (
              <p className="text-green-600 text-sm mt-2 font-bold">
                Coupon applied! Saved ₹{appliedDiscount}
              </p>
            )}
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div>
          <div className="bg-white p-6 rounded-xl border shadow-sm sticky top-8">
            <h3 className="font-bold text-lg border-b pb-4 mb-4">
              Fare Details
            </h3>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span>Base Fare ({selectedSeats.length} Seats)</span>
                <span>₹{subtotal}</span>
              </div>

              <div className="flex justify-between">
                <span>Service Fee</span>
                <span>₹2</span>
              </div>

              {appliedDiscount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Discount</span>
                  <span>-₹{appliedDiscount}</span>
                </div>
              )}

              <div className="flex justify-between text-xl font-bold border-t pt-4">
                <span>Total</span>
                <span>₹{finalTotal + 2}</span>
              </div>
            </div>

            <button
              onClick={handlePayment}
              disabled={!allPassengersValid || isProcessing}
              className={`w-full py-4 rounded-xl font-bold text-white
                ${
                  allPassengersValid
                    ? 'bg-primary-600 hover:bg-primary-700'
                    : 'bg-gray-300 cursor-not-allowed'
                }`}
            >
              {isProcessing ? (
                <>
                  <Loader2 className="animate-spin h-5 w-5 inline mr-2" />
                  Processing...
                </>
              ) : (
                `Pay ₹${finalTotal + 2}`
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
