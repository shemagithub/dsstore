import React from "react";
import { useStoreNavigation } from "../utils/useStoreNavigation";

const NavIcon = ({ children }) => (
  <span className="w-6 h-6 flex items-center justify-center">{children}</span>
);

const MobileBottomNav = () => {
  const { goHome, goPromotions, goAbout, location } = useStoreNavigation();
  const isHome = location.pathname === "/";
  const hash = location.hash.replace("#", "") || "home";

  const isActive = (section) => isHome && hash === section;

  const itemClass = (active) =>
    `flex flex-col items-center justify-center gap-1 flex-1 py-2 transition-colors ${
      active ? "text-store-yellow" : "text-gray-500 hover:text-gray-300"
    }`;

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-store-black/95 backdrop-blur-xl border-t border-store-border safe-bottom"
      aria-label="Mobile navigation"
    >
      <div className="flex items-stretch h-[64px] max-w-lg mx-auto">
        <button type="button" onClick={goHome} className={itemClass(isActive("home"))}>
          <NavIcon>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
              <path strokeLinecap="round" d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1h-5v-7H9v7H4a1 1 0 01-1-1V9.5z" />
            </svg>
          </NavIcon>
          <span className="text-[10px] font-semibold">Home</span>
        </button>

        <button type="button" onClick={goPromotions} className={itemClass(isActive("promotions"))}>
          <NavIcon>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
              <path strokeLinecap="round" d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4H6z" />
              <path strokeLinecap="round" d="M3 6h18M16 10a4 4 0 01-8 0" />
            </svg>
          </NavIcon>
          <span className="text-[10px] font-semibold">Promotions</span>
        </button>

        <button type="button" onClick={goAbout} className={itemClass(isActive("about"))}>
          <NavIcon>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
              <circle cx="12" cy="12" r="10" />
              <path strokeLinecap="round" d="M12 16v-4M12 8h.01" />
            </svg>
          </NavIcon>
          <span className="text-[10px] font-semibold">About</span>
        </button>
      </div>
    </nav>
  );
};

export default MobileBottomNav;
