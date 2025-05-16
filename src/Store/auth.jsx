import { createSlice } from '@reduxjs/toolkit';

const authInitialState = {
  token: localStorage.getItem('token'),
  userLogged: !!localStorage.getItem('token'),
};

const authSlice = createSlice({
  name: 'auth',
  initialState: authInitialState,
  reducers: {
    login(state, action) {
      const token = action.payload;
      state.token = token;
      state.userLogged = !!state.token;
      localStorage.setItem('token', token);
    },
    logout(state) {
      state.token = null;
      state.userLogged = false;
      localStorage.removeItem('token');
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
