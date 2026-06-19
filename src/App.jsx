import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./Components/Layout";
import Landing from "./pages/Landing";
import ShoeDetail from "./pages/ShoeDetail";
import AdminLogin from "./pages/Admin/AdminLogin";
import AdminLayout from "./pages/Admin/AdminLayout";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminShoes from "./pages/Admin/AdminShoes";
import AdminPromotions from "./pages/Admin/AdminPromotions";
import AdminCompany from "./pages/Admin/AdminCompany";

const App = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Landing />} />
        <Route path="/shoe/:id" element={<ShoeDetail />} />
      </Route>

      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="shoes" element={<AdminShoes />} />
        <Route path="promotions" element={<AdminPromotions />} />
        <Route path="company" element={<AdminCompany />} />
      </Route>
    </Routes>
  );
};

export default App;
