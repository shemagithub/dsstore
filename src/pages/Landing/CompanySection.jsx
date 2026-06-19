import React from "react";
import { useStore } from "../../context/StoreContext";
import WhatsAppIcon from "../../Components/WhatsAppIcon";
import StoreLoader from "../../Components/StoreLoader";

const CompanySection = () => {
  const { companyInfo, loading } = useStore();

  if (loading || !companyInfo) {
    return (
      <section id="about">
        <StoreLoader message="Loading company info..." />
      </section>
    );
  }

  const { name, description, location, contact, hours, highlights } = companyInfo;
  const mapsQuery = encodeURIComponent(
    `${location?.address || ""}, ${location?.city || ""}, ${location?.country || ""}`
  );

  return (
    <section id="about" className="store-page py-16 lg:py-24 border-t border-store-border">
      <div className="x_container">
        <div className="mb-12">
          <p className="section-label mb-3">About Us</p>
          <h2 className="section-title">
            <span className="text-store-yellow">{name}</span>
          </h2>
          <p className="mt-4 text-store-muted max-w-2xl text-base sm:text-lg leading-relaxed">
            {description}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          <div className="store-card p-6 sm:p-8">
            <h3 className="text-white font-bold text-lg mb-3">Location</h3>
            <p className="text-store-muted text-sm leading-relaxed">{location?.address}</p>
            <p className="text-white font-medium mt-1">
              {location?.city}, {location?.country}
            </p>
            <a
              href={`https://maps.google.com/?q=${mapsQuery}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 text-sm text-store-yellow hover:underline"
            >
              Open in Google Maps →
            </a>
          </div>

          <div className="store-card p-6 sm:p-8">
            <h3 className="text-white font-bold text-lg mb-3">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <span className="text-store-muted">Phone: </span>
                <a href={`tel:${(contact?.phone || "").replace(/\s/g, "")}`} className="text-white hover:text-store-yellow">
                  {contact?.phone}
                </a>
              </li>
              <li>
                <span className="text-store-muted">Email: </span>
                <a href={`mailto:${contact?.email}`} className="text-white hover:text-store-yellow">
                  {contact?.email}
                </a>
              </li>
            </ul>
            <a
              href={`https://wa.me/${contact?.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp text-sm py-2.5 px-4 mt-5 w-full sm:w-auto"
            >
              <WhatsAppIcon className="w-4 h-4" />
              Chat on WhatsApp
            </a>
          </div>

          <div className="store-card p-6 sm:p-8 sm:col-span-2 lg:col-span-1">
            <h3 className="text-white font-bold text-lg mb-3">Opening Hours</h3>
            <ul className="space-y-2">
              {(hours || []).map(({ days, time }) => (
                <li key={days} className="flex justify-between text-sm gap-4">
                  <span className="text-store-muted">{days}</span>
                  <span className="text-white font-medium">{time}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 store-card p-6 sm:p-8">
          <h3 className="text-white font-bold mb-4">Why shop with us</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {(highlights || []).map((item) => (
              <div key={item} className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-store-yellow flex-shrink-0" />
                <span className="text-store-muted text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompanySection;
