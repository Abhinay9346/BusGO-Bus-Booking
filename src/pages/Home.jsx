import React from 'react';
import { useNavigate } from 'react-router-dom';
import SearchForm from '../components/SearchForm';
import { useBooking } from '../contexts/BookingContext';
import { Shield, Clock, Smartphone, CreditCard } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();
  const { updateSearchParams } = useBooking();

  const handleSearch = (params) => {
    updateSearchParams(params);
    navigate('/search');
  };

  const features = [
    { icon: <Shield className="h-6 w-6" />, title: "Safe Journey", desc: "Top-rated operators ensuring your safety" },
    { icon: <Clock className="h-6 w-6" />, title: "On-time", desc: "99% punctuality track record" },
    { icon: <Smartphone className="h-6 w-6" />, title: "Easy Booking", desc: "Quick and seamless checkout process" },
    { icon: <CreditCard className="h-6 w-6" />, title: "Secure Payment", desc: "Fully encrypted payment gateway" }
  ];

  return (
    <div>
      <div className="bg-primary-600 py-24 px-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-primary-500 rounded-full opacity-50 blur-3xl" />
        <div className="max-w-7xl mx-auto text-center relative z-10 transition-opacity">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6">
            Your Journey, Our Commitment
          </h1>
          <p className="text-primary-100 text-xl max-w-2xl mx-auto">
            Book bus tickets for over 2,000+ routes across the country with instant confirmation.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 -mt-10 mb-20">
        <SearchForm onSearch={handleSearch} />
      </div>

      <div className="max-w-7xl mx-auto px-4 mb-20">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose BusGo?</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {features.map((f, i) => (
            <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center hover:translate-y-[-5px] transition-transform duration-300">
              <div className="bg-primary-50 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-primary-600">
                {f.icon}
              </div>
              <h3 className="font-bold text-lg mb-2">{f.title}</h3>
              <p className="text-gray-500 text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mb-20">
        <div className="bg-gray-900 rounded-3xl overflow-hidden flex flex-col md:flex-row items-center">
          <div className="p-8 md:p-16 flex-1">
            <h2 className="text-3xl font-bold text-white mb-6">Download the BusGo App</h2>
            <p className="text-gray-400 mb-8 max-w-md">
              Get exclusive mobile-only offers and track your bus in real-time. Available on iOS and Android.
            </p>
            <div className="flex gap-4">
              <div className="bg-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 cursor-pointer hover:bg-gray-100 transition-colors">
                <Smartphone className="h-5 w-5" /> App Store
              </div>
              <div className="bg-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 cursor-pointer hover:bg-gray-100 transition-colors">
                <Smartphone className="h-5 w-5" /> Google Play
              </div>
            </div>
          </div>
          <div className="flex-1 px-8 md:px-0 flex justify-end">
            <img 
               src="https://images.unsplash.com/photo-1512428559083-a4979b2b51ff?auto=format&fit=crop&q=80&w=600" 
               alt="Mobile App" 
               className="h-[400px] object-cover rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
