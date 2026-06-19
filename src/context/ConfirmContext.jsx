import React, { createContext, useCallback, useContext, useRef, useState } from "react";
import ConfirmModal from "../Components/ConfirmModal";

const ConfirmContext = createContext(null);

export const ConfirmProvider = ({ children }) => {
  const [state, setState] = useState({ open: false });
  const resolveRef = useRef(null);

  const confirm = useCallback(
    ({
      title = "Are you sure?",
      message = "",
      confirmText = "Confirm",
      cancelText = "Cancel",
      variant = "danger",
    } = {}) =>
      new Promise((resolve) => {
        resolveRef.current = resolve;
        setState({
          open: true,
          title,
          message,
          confirmText,
          cancelText,
          variant,
        });
      }),
    []
  );

  const close = (result) => {
    setState((prev) => ({ ...prev, open: false }));
    resolveRef.current?.(result);
    resolveRef.current = null;
  };

  return (
    <ConfirmContext.Provider value={{ confirm }}>
      {children}
      <ConfirmModal
        {...state}
        onConfirm={() => close(true)}
        onCancel={() => close(false)}
      />
    </ConfirmContext.Provider>
  );
};

export const useConfirm = () => {
  const ctx = useContext(ConfirmContext);
  if (!ctx) throw new Error("useConfirm must be used within ConfirmProvider");
  return ctx.confirm;
};

export default ConfirmContext;
