import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../features/auth/authSlice";
import medicineReducer from "../features/medicine/medicineSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    medicine: medicineReducer,
  },
});