import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice({
  name: "category",
  initialState: {
    categories: [],
    totalQuantity: 0,
  },
  reducers: {
    replaceCategories(state, action) {
      state.categories = action.payload.categories || [];
      state.totalQuantity = state.categories.length;
    },
    addItemToCategories(state, action) {
      const newCategory = action.payload;
      state.categories.push(newCategory);
      state.totalQuantity++;
    },
    removeItemFromCategories(state, action) {
      const id = action.payload;
      state.categories = state.categories.filter((category) => category.id !== id);
      state.totalQuantity = state.categories.length;
    },
   updateItemInCategories(state, action) {
      const updatedCategory = action.payload;
      if (!updatedCategory || !updatedCategory.id) return;

      const index = state.categories.findIndex((category) => category.id === updatedCategory.id);
      if (index !== -1) {
        state.categories[index] = {
          ...state.categories[index],
          ...updatedCategory,       
        };
      }
    },
  },
});

export const categoryActions = categorySlice.actions;
export default categorySlice.reducer;
