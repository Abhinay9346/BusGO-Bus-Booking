import React from 'react';
import { Star, Clock, ShieldCheck } from 'lucide-react';

const BusCard = ({ bus, onSelect }) => {
  return (
    <div className="bg-white border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow mb-4">
      <div className="flex flex-col md:flex-row justify-between gap-6">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-xl font-bold text-gray-800">{bus.name}</h3>
            <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs font-semibold flex items-center gap-1">
              <Star className="h-3 w-3 fill-current" />
              {bus.rating}
            </span>
          </div>
          <p className="text-gray-500 text-sm mb-4">{bus.type}</p>
          
          <div className="flex items-center gap-8">
            <div>
              <p className="text-lg font-bold">{bus.departure}</p>
              <p className="text-sm text-gray-500">{bus.routes[0]}</p>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-xs text-gray-400 flex items-center gap-1">
                <Clock className="h-3 w-3" /> {bus.duration}
              </p>
              <div className="w-24 h-0.5 bg-gray-200 relative my-2">
                <div className="absolute top-1/2 left-0 w-2 h-2 -translate-y-1/2 rounded-full bg-gray-300" />
                <div className="absolute top-1/2 right-0 w-2 h-2 -translate-y-1/2 rounded-full bg-gray-300" />
              </div>
            </div>
            <div>
              <p className="text-lg font-bold">{bus.arrival}</p>
              <p className="text-sm text-gray-500">{bus.routes[1]}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-end justify-between border-t md:border-t-0 md:border-l pt-4 md:pt-0 md:pl-8">
          <div className="text-right">
            <p className="text-sm text-gray-400">Starts from</p>
            <p className="text-2xl font-bold text-primary-600">₹{bus.price}</p>
          </div>
          <div className="mt-4 md:mt-0">
            <p className="text-xs text-gray-500 mb-2">{bus.availableSeats.length} Seats left</p>
            <button
              onClick={() => onSelect(bus)}
              className="bg-primary-600 text-white px-8 py-2.5 rounded-lg font-bold hover:bg-primary-700 transition-colors"
            >
              Select Seats
            </button>
          </div>
        </div>
      </div>
      <div className="mt-4 pt-4 border-t flex items-center gap-4 text-xs text-gray-400">
        <span className="flex items-center gap-1"><ShieldCheck className="h-4 w-4 text-green-500" /> Safe Journey</span>
        <span>• Free Cancellation</span>
        <span>• Instant Ticket</span>
      </div>
    </div>
  );
};

export default BusCard;
