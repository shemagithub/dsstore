import React from "react";
import { Link } from "react-router-dom";
import { useStore } from "../../context/StoreContext";
import StoreLogo from "../StoreLogo";

const Footer = () => {
  const { companyInfo, loading } = useStore();
  const name = companyInfo?.name || "Didier Shoes Store";
  const tagline = companyInfo?.tagline || "";
  const location = companyInfo?.location || {};
  const contact = companyInfo?.contact || {};

  return (
    <footer className="bg-store-black border-t border-store-border mt-auto pb-20 md:pb-0">
      <div className="x_container py-12 sm:py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 text-center sm:text-left">
          <div className="sm:col-span-2 lg:col-span-1 flex flex-col items-center sm:items-start">
            <StoreLogo companyInfo={companyInfo} loading={loading} className="mb-3" />
            <p className="text-store-muted text-sm leading-relaxed">{tagline}</p>
          </div>

          <div>
            <p className="text-white font-semibold mb-4">Quick Links</p>
            <ul className="space-y-2 text-sm text-store-muted">
              <li><Link to="/" className="hover:text-store-yellow">Home</Link></li>
              <li><Link to="/#promotions" className="hover:text-store-yellow">Promotions</Link></li>
              <li><Link to="/#about" className="hover:text-store-yellow">About Us</Link></li>
              <li><Link to="/admin/login" className="hover:text-store-yellow">Admin</Link></li>
            </ul>
          </div>

          <div>
            <p className="text-white font-semibold mb-4">Company</p>
            <ul className="space-y-2 text-sm text-store-muted">
              <li>{location.address}</li>
              <li>{location.city}, {location.country}</li>
              <li>
                <a href={`tel:${(contact.phone || "").replace(/\s/g, "")}`} className="hover:text-store-yellow">
                  {contact.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${contact.email}`} className="hover:text-store-yellow">
                  {contact.email}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-white font-semibold mb-4">Orders</p>
            <p className="text-store-muted text-sm">Order through WhatsApp</p>
            <p className="text-store-yellow text-sm mt-2 font-medium">Rwanda · RFW</p>
            <a
              href={`https://wa.me/${contact.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-3 text-sm text-store-yellow hover:underline"
            >
              Message us →
            </a>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-store-border text-center text-store-muted text-sm">
          © {new Date().getFullYear()} {name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
