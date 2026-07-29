import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  medicines: [],
};

const medicineSlice = createSlice({
  name: "medicine",
  initialState,
  reducers: {
    setMedicines: (state, action) => {
      state.medicines = action.payload;
    },

    addMedicine: (state, action) => {
      state.medicines.push(action.payload);
    },

    updateMedicine: (state, action) => {
      const index = state.medicines.findIndex(
        (medicine) => medicine._id === action.payload._id
      );

      if (index !== -1) {
        state.medicines[index] = action.payload;
      }
    },

    removeMedicine: (state, action) => {
      state.medicines = state.medicines.filter(
        (medicine) => medicine._id !== action.payload
      );
    },
  },
});

export const {
  setMedicines,
  addMedicine,
  updateMedicine,
  removeMedicine,
} = medicineSlice.actions;

export default medicineSlice.reducer;