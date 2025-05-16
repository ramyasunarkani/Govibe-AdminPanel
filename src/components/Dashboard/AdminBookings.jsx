import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './AdminBookings.css';
import { updateBookingStatus } from '../../Store/bookings_actions';

const AdminBookings = () => {
  const dispatch = useDispatch();
  const bookings = useSelector((state) => state.bookings.bookings);

  // State for filter (e.g., All, Pending, Confirmed, Rejected)
  const [statusFilter, setStatusFilter] = useState('All');

  // Handle status change for booking
  const handleStatusChange = (bookingId, newStatus) => {
    dispatch(updateBookingStatus(bookingId, newStatus));
  };

  // Filter bookings based on selected status
  const filteredBookings = bookings.filter((booking) => {
    if (statusFilter === 'All') return true;
    return booking.status === statusFilter;
  });

  const handleFilterChange = (e) => {
    setStatusFilter(e.target.value);
  };


  return (
    <div className="admin-bookings-container">
      <h2>All Bookings</h2>
      <div className="status-filter">
        <label>Filter by Status:</label>
        <select value={statusFilter} onChange={handleFilterChange}>
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="Confirmed">Confirmed</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      {filteredBookings.map((booking) => (
        <div className="booking-card" key={booking.id}>
          <div className="booking-image">
            <img src={booking.image} alt={booking.placeName} />
          </div>
          <div className="booking-details">
            <div className="status-dropdown">
              <label>Status:</label>
              <select
                value={booking.status || 'Pending'}
                onChange={(e) => handleStatusChange(booking.id, e.target.value)}
              >
                <option value="Pending">Pending</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Rejected">Reject</option>
              </select>
            </div>
            <p><strong>Place:</strong> {booking.placeName}</p>
            <p><strong>User:</strong> {booking.userName || 'N/A'}</p>
            <p><strong>Email:</strong> {booking.userEmail?.replace(/_/g, '.')}</p>
            <p><strong>Check-In:</strong> {booking.checkIn}</p>
            <p><strong>Check-Out:</strong> {booking.checkOut}</p>
            <p><strong>Guests:</strong> {booking.guests}</p>
            <p><strong>City:</strong> {booking.city}</p>
            <p><strong>Price per Night:</strong> ₹{booking.pricePerNight}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminBookings;
