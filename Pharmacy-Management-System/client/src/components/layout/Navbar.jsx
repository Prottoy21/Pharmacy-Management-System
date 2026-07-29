import { Bell, Moon, Search } from "lucide-react";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <header className="bg-white shadow h-16 flex items-center justify-between px-6">
      <div className="relative">
        <Search
          className="absolute left-3 top-3 text-gray-400"
          size={18}
        />

        <input
          type="text"
          placeholder="Search..."
          className="pl-10 pr-4 py-2 border rounded-lg w-80"
        />
      </div>

      <div className="flex items-center gap-6">
        <button>
          <Moon />
        </button>

        <button className="relative">
          <Bell />

          <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs h-5 w-5 flex items-center justify-center">
            3
          </span>
        </button>

        <div className="text-right">
          <h3 className="font-semibold">
            {user?.name || "Admin"}
          </h3>

          <p className="text-sm text-gray-500">
            {user?.role || "Administrator"}
          </p>
        </div>
      </div>
    </header>
  );
};

export default Navbar;