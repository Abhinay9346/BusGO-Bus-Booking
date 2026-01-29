import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { BookingProvider } from './contexts/BookingContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import SearchResults from './pages/SearchResults';
import BookingPage from './pages/BookingPage';
import Checkout from './pages/Checkout';
import MyBookings from './pages/MyBookings';
import Login from './pages/Login';
import Signup from './pages/Signup';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <BookingProvider>
          <div className="min-h-screen flex flex-col bg-gray-50">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/search" element={<SearchResults />} />
                <Route path="/book" element={<BookingPage />} />
                <Route 
                  path="/checkout" 
                  element={
                    <ProtectedRoute>
                      <Checkout />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/my-bookings" 
                  element={
                    <ProtectedRoute>
                      <MyBookings />
                    </ProtectedRoute>
                  } 
                />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
              </Routes>
            </main>
            <footer className="bg-white border-t py-8 text-center text-gray-500 text-sm">
              <div className="max-w-7xl mx-auto px-4">
                <p>&copy; {new Date().getFullYear()} BusGo Ticketing Solutions. All rights reserved.</p>
                <div className="flex justify-center gap-4 mt-2">
                  <span className="hover:text-primary-600 cursor-pointer">Terms</span>
                  <span className="hover:text-primary-600 cursor-pointer">Privacy</span>
                  <span className="hover:text-primary-600 cursor-pointer">Help Center</span>
                </div>
              </div>
            </footer>
          </div>
        </BookingProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
