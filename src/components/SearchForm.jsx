import React, { useState } from 'react';
import { MapPin, Calendar, Search, ArrowRightLeft } from 'lucide-react';
import { CITIES } from '../services/mockData';

const SearchForm = ({ initialValues, onSearch }) => {
  const [from, setFrom] = useState(initialValues?.from || '');
  const [to, setTo] = useState(initialValues?.to || '');
  const [date, setDate] = useState(initialValues?.date || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (from === to) {
      alert("Source and Destination cannot be the same");
      return;
    }
    onSearch({ from, to, date });
  };

  const swapCities = () => {
    const temp = from;
    setFrom(to);
    setTo(temp);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-lg -mt-12 relative z-10">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-1">From</label>
          <div className="relative">
            <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <select
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              required
              className="pl-10 w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-primary-500 appearance-none"
            >
              <option value="">Select City</option>
              {CITIES.map(city => <option key={city} value={city}>{city}</option>)}
            </select>
          </div>
        </div>

        <div className="flex justify-center pb-2">
          <button 
            type="button" 
            onClick={swapCities}
            className="p-2 rounded-full hover:bg-gray-100 border border-gray-200"
          >
            <ArrowRightLeft className="h-5 w-5 text-primary-500" />
          </button>
        </div>

        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
          <div className="relative">
            <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <select
              value={to}
              onChange={(e) => setTo(e.target.value)}
              required
              className="pl-10 w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-primary-500 appearance-none"
            >
              <option value="">Select City</option>
              {CITIES.map(city => <option key={city} value={city}>{city}</option>)}
            </select>
          </div>
        </div>

        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-1">Travel Date</label>
          <div className="relative">
            <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="date"
              value={date}
              min={new Date().toISOString().split('T')[0]}
              onChange={(e) => setDate(e.target.value)}
              required
              className="pl-10 w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>

        <div className="md:col-span-4 mt-2">
          <button
            type="submit"
            className="w-full bg-primary-600 text-white font-bold py-3 rounded-lg hover:bg-primary-700 flex items-center justify-center gap-2 shadow-md"
          >
            <Search className="h-5 w-5" />
            Search Buses
          </button>
        </div>
      </div>
    </form>
  );
};

export default SearchForm;
