import axios from 'axios';
import { bookingAction } from './bookingSlice';
const sanitizeEmail = (email) => {
  if (typeof email !== 'string') {
    throw new Error('Invalid email: expected string but got ' + typeof email);
  }
  return email.replace(/\./g, '_');
};

export function fetchAllBookings() {
  return async (dispatch) => {
    try {
      const res = await axios.get(
        `https://stayfinder-website-default-rtdb.firebaseio.com/bookings.json`
      );

      const allBookings = [];

      for (const userEmailId in res.data) {
        const bookingsPerUser = res.data[userEmailId];

        for (const bookingId in bookingsPerUser) {
          const bookingData = bookingsPerUser[bookingId];

          allBookings.push({
            id: bookingId,
            userEmail: userEmailId,
            ...bookingData,
          });
        }
      }

      dispatch(bookingAction.replaceBookings(allBookings));
    } catch (err) {
      console.error('Admin: Failed to fetch all bookings', err);
    }
  };
}

export function updateBookingStatus(bookingId, newStatus) {
  return async (dispatch, getState) => {
    const bookings = getState().bookings.bookings;
    const booking = bookings.find((b) => b.id === bookingId);
    if (!booking) return;

    try {
      const sanitizedEmail = sanitizeEmail(booking.userEmail);

      await axios.patch(
        `https://stayfinder-website-default-rtdb.firebaseio.com/bookings/${sanitizedEmail}/${bookingId}.json`,
        { status: newStatus }
      );

      dispatch(fetchAllBookings()); 
    } catch (err) {
      console.error("Admin: Failed to update booking status", err);
    }
  };
}
