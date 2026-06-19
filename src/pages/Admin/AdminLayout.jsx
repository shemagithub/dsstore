import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAdminAuth } from "../../context/AdminAuthContext";
import { ConfirmProvider } from "../../context/ConfirmContext";
import AdminSidebar from "./AdminSidebar";

const AdminLayout = () => {
  const { isAuthenticated, loading } = useAdminAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-store-black flex items-center justify-center text-store-muted">
        Loading...
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <ConfirmProvider>
      <div className="min-h-screen bg-store-black text-white flex">
        <AdminSidebar />
        <main className="flex-1 p-6 sm:p-8 overflow-auto max-h-screen">
          <Outlet />
        </main>
      </div>
    </ConfirmProvider>
  );
};

export default AdminLayout;
