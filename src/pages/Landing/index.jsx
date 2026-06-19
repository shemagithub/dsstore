import React, { useEffect } from "react";
import StoreHero from "./StoreHero";
import PromotionSection from "./PromotionSection";
import CompanySection from "./CompanySection";

const Landing = () => {
  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash === "promotions" || hash === "about") {
      setTimeout(() => {
        document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
      }, 150);
    }
  }, []);

  return (
    <>
      <StoreHero />
      <PromotionSection />
      <CompanySection />
    </>
  );
};

export default Landing;
