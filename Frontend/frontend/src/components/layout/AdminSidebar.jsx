import { Link, useLocation } from "react-router-dom";
import { Home, Package, Users, Settings } from "lucide-react";

const navItems = [
  { label: "Dashboard", path: "/dashboard", icon: <Home size={20} /> },
  { label: "Products", path: "/admin/products", icon: <Package size={20} /> },
  { label: "Users", path: "/admin/users", icon: <Users size={20} /> },
  { label: "Settings", path: "/admin/settings", icon: <Settings size={20} /> },
];

export default function AdminSidebar() {
  const location = useLocation();

  return (
    <div className="flex flex-col h-screen w-64 bg-gradient-to-b from-blue-500 to-indigo-500 text-white p-4 space-y-4">
      <div className="text-2xl font-bold mb-6">EwisPC Admin</div>

      {navItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={`flex items-center gap-2 p-2 rounded-md transition-all ${
            location.pathname === item.path
              ? "bg-white text-blue-700 font-semibold"
              : "hover:bg-white/20"
          }`}
        >
          {item.icon}
          {item.label}
        </Link>
      ))}
    </div>
  );
}
