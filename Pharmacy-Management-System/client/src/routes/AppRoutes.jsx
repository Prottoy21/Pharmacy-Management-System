import { Routes, Route } from "react-router-dom";

import DashboardLayout from "../components/layout/DashboardLayout";
import ProtectedRoute from "../components/common/ProtectedRoute";

import Dashboard from "../pages/dashboard/Dashboard";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

import MedicineList from "../pages/medicines/MedicineList";
import MedicineForm from "../pages/medicines/MedicineForm";
import MedicineEdit from "../pages/medicines/MedicineEdit";
import CategoryList from "../pages/categories/CategoryList";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected routes */}
      <Route
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />

        <Route path="medicines" element={<MedicineList />} />

        <Route path="medicines/add" element={<MedicineForm />} />

        <Route path="medicines/edit/:id" element={<MedicineEdit />} />
        <Route path="/categories" element={<CategoryList />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
