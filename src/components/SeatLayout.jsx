import React from 'react';
import { useBooking } from '../contexts/BookingContext';
import { clsx } from 'clsx';

const SeatLayout = () => {
  const { selectedBus, selectedSeats, toggleSeat } = useBooking();

  if (!selectedBus) return null;

  const totalSeats = selectedBus.totalSeats;
  const seats = Array.from({ length: totalSeats }, (_, i) => i + 1);

  return (
    <div className="bg-gray-50 p-6 rounded-xl border">
      <div className="mb-8 flex justify-center text-gray-400 italic text-sm">
        <div className="border-r-4 border-gray-300 h-8 w-24 flex items-center justify-center">Driver</div>
      </div>

      <div className="seat-grid max-w-[280px] mx-auto">
        {seats.map(num => {
          const isBooked = !selectedBus.availableSeats.includes(num);
          const isSelected = selectedSeats.includes(num);

          return (
            <button
              key={num}
              disabled={isBooked}
              onClick={() => toggleSeat(num)}
              className={clsx(
                "h-10 w-10 border-2 rounded-md font-medium text-sm transition-all relative overflow-hidden",
                isBooked 
                  ? "bg-gray-200 border-gray-200 text-gray-400 cursor-not-allowed" 
                  : isSelected 
                    ? "bg-primary-500 border-primary-600 text-white shadow-inner" 
                    : "bg-white border-gray-300 hover:border-primary-400 text-gray-600"
              )}
            >
              {num}
              {isSelected && <div className="absolute top-0 right-0 w-2 h-2 bg-white rounded-bl-sm" />}
            </button>
          );
        })}
      </div>

      <div className="mt-10 flex flex-wrap justify-center gap-6 text-sm">
        <div className="flex items-center gap-2">
          <div className="h-5 w-5 bg-white border-2 border-gray-300 rounded" />
          <span>Available</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-5 w-5 bg-primary-500 border-2 border-primary-600 rounded" />
          <span>Selected</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-5 w-5 bg-gray-200 border-2 border-gray-200 rounded" />
          <span>Booked</span>
        </div>
      </div>
    </div>
  );
};

export default SeatLayout;