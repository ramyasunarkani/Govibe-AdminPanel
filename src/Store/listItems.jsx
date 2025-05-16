import { createSlice } from "@reduxjs/toolkit";

const listSlice = createSlice({
  name: "list",
  initialState: {
    items: [],
    totalQuantity: 0,
  },
  reducers: {
    replaceList(state, action) {
      state.items = action.payload.items || [];
      state.totalQuantity = state.items.length;
    },
    addItemToList(state, action) {
      const newItem = action.payload;
      state.items.push(newItem);
      state.totalQuantity++;
    },
    removeItemFromList(state, action) {
      const id = action.payload;
      state.items = state.items.filter((item) => item.id !== id);
      state.totalQuantity = state.items.length;
    },
   updateItemInList(state, action) {
      const updatedItem = action.payload;
      if (!updatedItem || !updatedItem.id) return;

      const index = state.items.findIndex((item) => item.id === updatedItem.id);
      if (index !== -1) {
        state.items[index] = {
          ...state.items[index],
          ...updatedItem,       
        };
      }
    },
  },
});

export const listActions = listSlice.actions;
export default listSlice.reducer;
