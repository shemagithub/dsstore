import React from "react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const cards = [
    { title: "Shoes", desc: "Add, edit, or remove shoe products", to: "/admin/shoes" },
    { title: "Promotions", desc: "Schedule shoes on promotion dates", to: "/admin/promotions" },
    { title: "Company", desc: "Store info, hero carousel & contact", to: "/admin/company" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-2">Dashboard</h1>
      <p className="text-store-muted mb-8">Manage all content on the Didier Shoes Store website.</p>

      <div className="grid sm:grid-cols-3 gap-6">
        {cards.map(({ title, desc, to }) => (
          <Link key={to} to={to} className="store-card store-card-hover p-6 block">
            <h2 className="text-store-yellow font-bold text-lg mb-2">{title}</h2>
            <p className="text-store-muted text-sm">{desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
