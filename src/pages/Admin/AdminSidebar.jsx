import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAdminAuth } from "../../context/AdminAuthContext";

const AdminSidebar = () => {
  const { logout, admin } = useAdminAuth();
  const navigate = useNavigate();

  const linkClass = ({ isActive }) =>
    `block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
      isActive ? "bg-store-yellow text-black" : "text-gray-400 hover:bg-white/5 hover:text-white"
    }`;

  return (
    <aside className="w-64 bg-[#0a0a0a] border-r border-store-border flex flex-col min-h-screen p-5">
      <div className="mb-8">
        <p className="text-store-yellow font-bold">Didier Admin</p>
        <p className="text-xs text-store-muted mt-1 truncate">{admin?.email}</p>
      </div>

      <nav className="space-y-1 flex-1">
        <NavLink to="/admin" end className={linkClass}>
          Dashboard
        </NavLink>
        <NavLink to="/admin/shoes" className={linkClass}>
          Shoes
        </NavLink>
        <NavLink to="/admin/promotions" className={linkClass}>
          Promotions
        </NavLink>
        <NavLink to="/admin/company" className={linkClass}>
          Company Info
        </NavLink>
      </nav>

      <div className="space-y-2 pt-6 border-t border-store-border">
        <button
          onClick={() => navigate("/")}
          className="w-full text-left px-4 py-2 text-sm text-gray-400 hover:text-store-yellow"
        >
          View Store →
        </button>
        <button
          onClick={logout}
          className="w-full text-left px-4 py-2 text-sm text-red-400 hover:text-red-300"
        >
          Logout
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
