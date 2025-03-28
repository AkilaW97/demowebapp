import { Link, useLocation } from "react-router-dom";
import { Home, Package, Users, Settings, CircleGauge } from "lucide-react";

const navItems = [
  { label: "Dashboard", path: "/dashboard", icon: <Home size={20} /> },
  { label: "Add Products", path: "/admin/products", icon: <Package size={20} /> },
  { label: "Users", path: "/admin/users", icon: <Users size={20} /> },
  { label: "Add Drivers", path: "/admin/drivers", icon: <CircleGauge size={20} /> }, 
  { label: "Settings", path: "/admin/settings", icon: <Settings size={20} /> },
];

export default function AdminSidebar() {
  const location = useLocation();

  return (
    <div className="flex flex-col h-screen w-64 bg-[#03613a] text-white p-4 space-y-4">
      <div className="text-2xl font-bold mb-6">E-WISPC Admin</div>

      {navItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={`flex items-center gap-2 p-2 rounded-md transition-all ${
            location.pathname === item.path
              ? "bg-white text-[#05a865] font-semibold"
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