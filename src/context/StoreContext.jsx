import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { api } from "../api/client";
import { applyStoreBranding } from "../utils/branding";

const StoreContext = createContext(null);

export const StoreProvider = ({ children }) => {
  const [promotionShoes, setPromotionShoes] = useState({});
  const [promotionDateKeys, setPromotionDateKeys] = useState([]);
  const [companyInfo, setCompanyInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadStore = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await api.getStore();
      setPromotionShoes(data.promotionShoes || {});
      setPromotionDateKeys(data.promotionDateKeys || []);
      const company = data.company || {};
      setCompanyInfo(company);
      applyStoreBranding(company);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadStore();
  }, [loadStore]);

  return (
    <StoreContext.Provider
      value={{
        promotionShoes,
        promotionDateKeys,
        companyInfo,
        loading,
        error,
        reloadStore: loadStore,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
};

export default StoreContext;
