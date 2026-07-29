import {
  DollarSign,
  Package,
  ShoppingCart,
  TrendingUp,
  AlertTriangle,
  CalendarClock,
  Wallet,
  Users,
} from "lucide-react";

const stats = [
  {
    title: "Today's Sales",
    value: "৳0",
    icon: DollarSign,
  },
  {
    title: "Today's Profit",
    value: "৳0",
    icon: TrendingUp,
  },
  {
    title: "Monthly Sales",
    value: "৳0",
    icon: ShoppingCart,
  },
  {
    title: "Monthly Profit",
    value: "৳0",
    icon: Wallet,
  },
  {
    title: "Total Medicines",
    value: "0",
    icon: Package,
  },
  {
    title: "Low Stock",
    value: "0",
    icon: AlertTriangle,
  },
  {
    title: "Near Expiry",
    value: "0",
    icon: CalendarClock,
  },
  {
    title: "Customers",
    value: "0",
    icon: Users,
  },
];

const Dashboard = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">
          Pharmacy Dashboard
        </h1>

        <p className="text-gray-500 mt-2">
          Welcome to Pharmacy ERP Management System
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="bg-white rounded-xl shadow p-6 border"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-500 text-sm">
                    {item.title}
                  </p>

                  <h2 className="text-3xl font-bold mt-2">
                    {item.value}
                  </h2>
                </div>

                <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                  <Icon className="text-blue-600" size={24} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow border p-6 h-96">
          <h2 className="text-xl font-semibold mb-4">
            Monthly Sales
          </h2>

          <div className="h-full flex items-center justify-center text-gray-400">
            Recharts Sales Graph
          </div>
        </div>

        <div className="bg-white rounded-xl shadow border p-6 h-96">
          <h2 className="text-xl font-semibold mb-4">
            Purchase Analytics
          </h2>

          <div className="h-full flex items-center justify-center text-gray-400">
            Recharts Purchase Graph
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow border p-6">
        <h2 className="text-xl font-semibold mb-4">
          Recent Sales
        </h2>

        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-3">Invoice</th>
              <th className="text-left py-3">Customer</th>
              <th className="text-left py-3">Amount</th>
              <th className="text-left py-3">Status</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td className="py-4">No Data</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;