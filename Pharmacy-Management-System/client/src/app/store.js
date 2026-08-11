import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../features/auth/authSlice";
import medicineReducer from "../features/medicine/medicineSlice";
import categoryReducer from "../features/category/categorySlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    medicine: medicineReducer,
    category: categoryReducer,
  },
});