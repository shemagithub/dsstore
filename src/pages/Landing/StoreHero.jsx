import React from "react";
import { useStore } from "../../context/StoreContext";
import HeroCarousel from "../../Components/HeroCarousel";

const StoreHero = () => {
  const { companyInfo } = useStore();
  const hero = companyInfo?.hero || {};
  const name = companyInfo?.name || "Didier Shoes Store";
  const description =
    companyInfo?.description ||
    "Welcome to Didier Shoes Store. Discover premium shoes on daily promotion. Pick a date, browse the deals, and order instantly through WhatsApp.";
  const [first = "Didier", ...rest] = name.split(" ");
  const secondLine = rest.length ? rest.join(" ") : "Shoes Store";

  const scrollToPromotions = () => {
    document.getElementById("promotions")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="store-page relative overflow-hidden py-16 sm:py-20 lg:py-28">
      <div className="absolute top-20 left-10 w-72 h-72 bg-store-yellow/5 rounded-full blur-3xl pointer-events-none hero-glow" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-store-yellow/5 rounded-full blur-3xl pointer-events-none hero-glow hero-glow-delay" />

      <div className="x_container grid lg:grid-cols-2 gap-12 lg:gap-16 items-center relative z-10">
        <div className="hero-copy">
          <p className="section-label mb-4">{hero.label || "Summer Collection 2026"}</p>
          <h1 className="text-4xl sm:text-5xl xl:text-6xl font-extrabold leading-[1.1] tracking-tight">
            <span className="text-store-yellow">{first.toUpperCase()}</span>
            <br />
            <span className="text-white">{secondLine.toUpperCase()}</span>
          </h1>
          <p className="mt-6 text-store-muted text-base sm:text-lg max-w-md leading-relaxed">
            {description}
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <button onClick={scrollToPromotions} className="btn-store-primary">
              Shop Now
            </button>
            <button onClick={scrollToPromotions} className="btn-store-outline">
              View Promotions
            </button>
          </div>
          <div className="mt-12 flex gap-8">
            {[
              { value: "11+", label: "Shoe models" },
              { value: "RFW", label: "Local currency" },
              { value: "24/7", label: "WhatsApp order" },
            ].map(({ value, label }) => (
              <div key={label}>
                <p className="text-store-yellow font-extrabold text-xl sm:text-2xl">{value}</p>
                <p className="text-store-muted text-xs sm:text-sm mt-0.5">{label}</p>
              </div>
            ))}
          </div>
        </div>

        <HeroCarousel
          images={hero.images || []}
          badgeTitle={hero.badgeTitle || "New Arrival"}
          badgeSubtitle={hero.badgeSubtitle || "Daily promotions"}
          intervalMs={hero.intervalMs || 4000}
          alt={name}
        />
      </div>
    </section>
  );
};

export default StoreHero;
