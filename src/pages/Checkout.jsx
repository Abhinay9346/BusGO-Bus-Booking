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

  if (!selectedBus || selectedSeats.length === 0) {
    navigate('/');
    return null;
  }

  const subtotal = calculateTotal(selectedBus.price);
  const finalTotal = subtotal - appliedDiscount;

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    const found = COUPONS.find(c => c.code.toUpperCase() === coupon.toUpperCase());
    if (found) {
      const discount = found.type === 'percentage' 
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
        busName: selectedBus.name,
        from: searchParams.from,
        to: searchParams.to,
        date: searchParams.date,
        seats: selectedSeats,
        amount: finalTotal,
        busType: selectedBus.type,
        departure: selectedBus.departure
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
          <p className="text-gray-500 mb-6">Your ticket has been sent to your email.</p>
          <p className="text-sm text-gray-400">Redirecting to your bookings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold mb-8">Checkout</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl border shadow-sm">
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <CreditCard className="text-primary-600" /> Payment Method
            </h3>
            <div className="p-4 border-2 border-primary-500 bg-primary-50 rounded-lg mb-4">
              <p className="font-bold text-primary-900">Credit / Debit Card</p>
              <p className="text-sm text-primary-700">Simulated secure payment</p>
            </div>
            
            <div className="space-y-4">
              <input type="text" placeholder="Card Number" className="w-full p-2.5 border rounded-lg" disabled value="**** **** **** 4242" />
              <div className="grid grid-cols-2 gap-4">
                <input type="text" placeholder="MM/YY" className="p-2.5 border rounded-lg" disabled value="12/28" />
                <input type="text" placeholder="CVV" className="p-2.5 border rounded-lg" disabled value="***" />
              </div>
            </div>
          </div>

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
              <button className="bg-gray-800 text-white px-4 rounded-lg font-bold">Apply</button>
            </form>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            {appliedDiscount > 0 && <p className="text-green-600 text-sm mt-2 font-bold select-none">Coupon Applied! Saved ${appliedDiscount}</p>}
          </div>
        </div>

        <div>
          <div className="bg-white p-6 rounded-xl border shadow-sm sticky top-8">
            <h3 className="font-bold text-lg border-b pb-4 mb-4">Fare Details</h3>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-500">Base Fare ({selectedSeats.length} Seats)</span>
                <span>${subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Service Fee</span>
                <span>$2.00</span>
              </div>
              {appliedDiscount > 0 && (
                <div className="flex justify-between text-green-600 font-medium">
                  <span>Discount</span>
                  <span>-${appliedDiscount}</span>
                </div>
              )}
              <div className="flex justify-between text-xl font-bold border-t pt-4 mt-4">
                <span>Total Amount</span>
                <span>${finalTotal + 2}</span>
              </div>
            </div>

            <button
              onClick={handlePayment}
              disabled={isProcessing}
              className="w-full bg-primary-600 text-white font-bold py-4 rounded-xl hover:bg-primary-700 transition-colors flex items-center justify-center gap-2"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="animate-spin h-5 w-5" />
                  Processing...
                </>
              ) : (
                `Pay $${finalTotal + 2}`
              )}
            </button>
            <p className="text-center text-xs text-gray-400 mt-4">By clicking Pay, you agree to our terms of service.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
