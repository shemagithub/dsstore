import React from "react";
import { useStoreNavigation } from "../../utils/useStoreNavigation";
import { useStore } from "../../context/StoreContext";
import StoreLogo from "../StoreLogo";

const Header = () => {
  const { goHome, goPromotions, goAbout } = useStoreNavigation();
  const { companyInfo, loading } = useStore();

  return (
    <header className="sticky top-0 z-40 bg-store-black/80 backdrop-blur-xl border-b border-store-border">
      <div className="x_container h-header_height flex items-center justify-between">
        <StoreLogo companyInfo={companyInfo} loading={loading} />

        <nav className="hidden md:flex items-center gap-1">
          <button
            onClick={goHome}
            className="px-5 py-2 text-gray-300 hover:text-store-yellow font-medium transition-colors rounded-full hover:bg-white/5"
          >
            Home
          </button>
          <button
            onClick={goPromotions}
            className="px-5 py-2 text-gray-300 hover:text-store-yellow font-medium transition-colors rounded-full hover:bg-white/5"
          >
            Promotions
          </button>
          <button
            onClick={goAbout}
            className="px-5 py-2 text-gray-300 hover:text-store-yellow font-medium transition-colors rounded-full hover:bg-white/5"
          >
            About
          </button>
        </nav>

        <div className="md:hidden w-8" aria-hidden="true" />
      </div>
    </header>
  );
};

export default Header;
