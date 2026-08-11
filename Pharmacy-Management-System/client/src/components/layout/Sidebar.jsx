import {
  LayoutDashboard,
  Pill,
  Tags,
  ShoppingCart,
  Package,
  Users,
  Truck,
  FileBarChart,
  Settings,
  LogOut,
} from "lucide-react";

import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../features/auth/authSlice";

const Sidebar = () => {
  const dispatch = useDispatch();

  const menus = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      path: "/",
    },
    {
      name: "Medicines",
      icon: Pill,
      path: "/medicines",
    },
    {
      name: "Categories",
      icon: Tags,
      path: "/categories",
    },
    {
      name: "Purchase",
      icon: ShoppingCart,
      path: "/purchase",
    },
    {
      name: "Inventory",
      icon: Package,
      path: "/inventory",
    },
    {
      name: "Customers",
      icon: Users,
      path: "/customers",
    },
    {
      name: "Suppliers",
      icon: Truck,
      path: "/suppliers",
    },
    {
      name: "Reports",
      icon: FileBarChart,
      path: "/reports",
    },
    {
      name: "Settings",
      icon: Settings,
      path: "/settings",
    },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-white shadow-lg">
      <div className="h-16 flex items-center justify-center border-b">
        <h1 className="text-2xl font-bold text-blue-600">Pharmacy ERP</h1>
      </div>

      <nav className="p-4 space-y-2">
        {menus.map((menu) => {
          const Icon = menu.icon;

          return (
            <NavLink
              key={menu.path}
              to={menu.path}
              className={({ isActive }) =>
                `flex items-center gap-3 p-3 rounded-lg transition ${
                  isActive ? "bg-blue-600 text-white" : "hover:bg-slate-100"
                }`
              }
            >
              <Icon size={20} />

              {menu.name}
            </NavLink>
          );
        })}
      </nav>

      <button
        onClick={() => dispatch(logout())}
        className="absolute bottom-6 left-4 right-4 flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg"
      >
        <LogOut size={18} />
        Logout
      </button>
    </aside>
  );
};

export default Sidebar;
