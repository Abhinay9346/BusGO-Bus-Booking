import React, { useState, useEffect } from 'react';
import { useBooking } from '../contexts/BookingContext';
import { apiService } from '../services/api';
import BusCard from '../components/BusCard';
import { useNavigate } from 'react-router-dom';
import { Filter, Loader2, ArrowLeft } from 'lucide-react';

const SearchResults = () => {
  const { searchParams, setSelectedBus } = useBooking();
  const [buses, setBuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const results = await apiService.fetchBuses(searchParams.from, searchParams.to, searchParams.date);
        setBuses(results);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (searchParams.from && searchParams.to) {
      fetch();
    } else {
      navigate('/');
    }
  }, [searchParams, navigate]);

  const handleSelectBus = (bus) => {
    setSelectedBus(bus);
    navigate('/book');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <button 
            onClick={() => navigate('/')}
            className="flex items-center gap-1 text-primary-600 font-medium mb-2 hover:underline"
          >
            <ArrowLeft className="h-4 w-4" /> Edit Search
          </button>
          <h2 className="text-2xl font-bold">
            {searchParams.from} to {searchParams.to}
          </h2>
          <p className="text-gray-500">{searchParams.date} • {buses.length} Buses found</p>
        </div>
        
        <button className="flex items-center gap-2 bg-white border px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
          <Filter className="h-4 w-4" /> Filters
        </button>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <Loader2 className="h-10 w-10 animate-spin text-primary-600 mb-4" />
          <p className="text-gray-500">Searching for available buses...</p>
        </div>
      ) : buses.length > 0 ? (
        <div className="grid grid-cols-1 gap-4">
          {buses.map(bus => (
            <BusCard key={bus.id} bus={bus} onSelect={handleSelectBus} />
          ))}
        </div>
      ) : (
        <div className="bg-white p-12 rounded-xl text-center border shadow-sm">
          <p className="text-xl font-bold mb-2">No buses found</p>
          <p className="text-gray-500 mb-6">We couldn't find any buses for the selected route and date.</p>
          <button 
            onClick={() => navigate('/')}
            className="bg-primary-600 text-white px-8 py-2 rounded-lg transition-colors font-bold"
          >
            Try different cities
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchResults;
