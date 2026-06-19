import React from "react";

const StoreLoader = ({ message = "Loading..." }) => (
  <div className="store-page py-20 flex items-center justify-center">
    <div className="text-center">
      <div className="w-10 h-10 border-2 border-store-yellow border-t-transparent rounded-full animate-spin mx-auto mb-4" />
      <p className="text-store-muted">{message}</p>
    </div>
  </div>
);

export default StoreLoader;
