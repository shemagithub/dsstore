import { useLocation, useNavigate } from "react-router-dom";

export const useStoreNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const goHome = () => {
    if (location.pathname === "/") {
      window.history.replaceState(null, "", "/");
      scrollToSection("home");
    } else {
      navigate("/");
    }
  };

  const goPromotions = () => {
    if (location.pathname === "/") {
      window.history.replaceState(null, "", "/#promotions");
      scrollToSection("promotions");
    } else {
      navigate("/#promotions");
      setTimeout(() => scrollToSection("promotions"), 150);
    }
  };

  const goAbout = () => {
    if (location.pathname === "/") {
      window.history.replaceState(null, "", "/#about");
      scrollToSection("about");
    } else {
      navigate("/#about");
      setTimeout(() => scrollToSection("about"), 150);
    }
  };

  return { goHome, goPromotions, goAbout, location };
};
