import { createSlice } from '@reduxjs/toolkit';

const bookingSlice = createSlice({
  name: 'bookings',
  initialState: {
    bookings: [],
  },
  reducers: {
    replaceBookings(state, action) {
      state.bookings = action.payload; 
    },
    updateBookingStatus(state, action) {
      const { id, status } = action.payload;
      const existingBooking = state.bookings.find((booking) => booking.id === id);
      if (existingBooking) {
        existingBooking.status = status; 
      }
    },
  },
});

export const bookingAction = bookingSlice.actions;
export default bookingSlice.reducer;
