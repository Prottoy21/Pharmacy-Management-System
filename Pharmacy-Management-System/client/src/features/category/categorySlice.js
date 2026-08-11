import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: [],
  loading: false,
  error: null,
};

const categorySlice = createSlice({
  name: "category",

  initialState,

  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    setCategories: (state, action) => {
      state.categories = action.payload;
    },

    setError: (state, action) => {
      state.error = action.payload;
    },

    addCategory: (state, action) => {
      state.categories.unshift(action.payload);
    },

    updateCategoryState: (state, action) => {
      const index = state.categories.findIndex(
        (category) => category._id === action.payload._id
      );

      if (index !== -1) {
        state.categories[index] = action.payload;
      }
    },

    removeCategory: (state, action) => {
      state.categories = state.categories.filter(
        (category) => category._id !== action.payload
      );
    },
  },
});

export const {
  setLoading,
  setCategories,
  setError,
  addCategory,
  updateCategoryState,
  removeCategory,
} = categorySlice.actions;

export default categorySlice.reducer;