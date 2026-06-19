import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { StoreProvider } from "./context/StoreContext";
import { AdminAuthProvider } from "./context/AdminAuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <StoreProvider>
        <AdminAuthProvider>
          <App />
        </AdminAuthProvider>
      </StoreProvider>
    </BrowserRouter>
  </React.StrictMode>
);
