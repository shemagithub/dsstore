import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import MobileBottomNav from "./MobileBottomNav";

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-store-black text-white">
      <Header />
      <div className="flex-1 pb-[72px] md:pb-0">
        <Outlet />
      </div>
      <Footer />
      <MobileBottomNav />
    </div>
  );
};

export default Layout;
