import React, { createContext, useContext, useState } from 'react';

const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  const [searchParams, setSearchParams] = useState({
    from: '',
    to: '',
    date: ''
  });
  
  const [selectedBus, setSelectedBus] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookingSummary, setBookingSummary] = useState(null);

  const resetBooking = () => {
    setSelectedBus(null);
    setSelectedSeats([]);
    setBookingSummary(null);
  };

  const updateSearchParams = (params) => {
    setSearchParams(params);
  };

  const toggleSeat = (seatNumber) => {
    setSelectedSeats(prev => 
      prev.includes(seatNumber) 
        ? prev.filter(s => s !== seatNumber)
        : [...prev, seatNumber]
    );
  };

  const calculateTotal = (pricePerSeat) => {
    return selectedSeats.length * pricePerSeat;
  };

  return (
    <BookingContext.Provider value={{
      searchParams,
      updateSearchParams,
      selectedBus,
      setSelectedBus,
      selectedSeats,
      setSelectedSeats,
      toggleSeat,
      calculateTotal,
      bookingSummary,
      setBookingSummary,
      resetBooking
    }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => useContext(BookingContext);
