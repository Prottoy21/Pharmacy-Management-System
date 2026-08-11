import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  medicines: [],
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
    pages: 0,
  },
  loading: false,
  error: null,
};

const medicineSlice = createSlice({
  name: "medicine",

  initialState,

  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    setMedicines: (state, action) => {
      state.medicines = action.payload;
    },

    setPagination: (state, action) => {
      state.pagination = action.payload;
    },

    setError: (state, action) => {
      state.error = action.payload;
    },

    clearMedicines: (state) => {
      state.medicines = [];
      state.pagination = initialState.pagination;
    },
  },
});

export const {
  setLoading,
  setMedicines,
  setPagination,
  setError,
  clearMedicines,
} = medicineSlice.actions;

export default medicineSlice.reducer;