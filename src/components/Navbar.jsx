import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bus, User, LogOut, History } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2 text-primary-600 font-bold text-2xl">
              <Bus className="h-8 w-8" />
              <span>BusGo</span>
            </Link>
          </div>

          <div className="flex items-center gap-6">
            <Link to="/" className="text-gray-600 hover:text-primary-600">Book Your Tickets Now</Link>
            
            {isAuthenticated ? (
              <>
                <Link to="/my-bookings" className="flex items-center gap-1 text-gray-600 hover:text-primary-600">
                  <History className="h-4 w-4" />
                  <span>My Bookings</span>
                </Link>
                <div className="flex items-center gap-4 border-l pl-4">
                  <div className="flex items-center gap-2">
                    <div className="bg-primary-100 p-2 rounded-full">
                      <User className="h-4 w-4 text-primary-600" />
                    </div>
                    <span className="text-sm font-medium text-gray-700">{user.name}</span>
                  </div>
                  <button 
                    onClick={handleLogout}
                    className="text-gray-500 hover:text-red-600 transition-colors"
                  >
                    <LogOut className="h-5 w-5" />
                  </button>
                </div>
              </>
            ) : (
              <Link 
                to="/login"
                className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
