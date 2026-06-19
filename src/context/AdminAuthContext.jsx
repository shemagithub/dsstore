import React, { createContext, useContext, useEffect, useState } from "react";
import { api } from "../api/client";

const AdminAuthContext = createContext(null);

export const AdminAuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (!token) {
      setLoading(false);
      return;
    }
    api
      .getMe()
      .then((data) => setAdmin(data.admin))
      .catch(() => localStorage.removeItem("admin_token"))
      .finally(() => setLoading(false));
  }, []);

  const login = async (email, password) => {
    const data = await api.login(email, password);
    localStorage.setItem("admin_token", data.token);
    setAdmin(data.admin);
    return data;
  };

  const logout = () => {
    localStorage.removeItem("admin_token");
    setAdmin(null);
  };

  return (
    <AdminAuthContext.Provider value={{ admin, loading, login, logout, isAuthenticated: !!admin }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => useContext(AdminAuthContext);

export default AdminAuthContext;
