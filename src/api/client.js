import { API_BASE, apiUrl } from "../config/api";

const request = async (path, options = {}) => {
  const token = localStorage.getItem("admin_token");
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(apiUrl(path), { ...options, headers });
  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.message || "Request failed");
  }
  return data;
};

export const api = {
  getStore: () => request("/api/store"),
  login: (email, password) =>
    request("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),
  getMe: () => request("/api/auth/me"),

  getAllShoes: () => request("/api/shoes/all"),
  createShoe: (body) => request("/api/shoes", { method: "POST", body: JSON.stringify(body) }),
  updateShoe: (id, body) =>
    request(`/api/shoes/${id}`, { method: "PUT", body: JSON.stringify(body) }),
  deleteShoe: (id) => request(`/api/shoes/${id}`, { method: "DELETE" }),

  getAllPromotions: () => request("/api/promotions/all"),
  createPromotion: (body) =>
    request("/api/promotions", { method: "POST", body: JSON.stringify(body) }),
  updatePromotion: (id, body) =>
    request(`/api/promotions/${id}`, { method: "PUT", body: JSON.stringify(body) }),
  deletePromotion: (id) => request(`/api/promotions/${id}`, { method: "DELETE" }),

  getCompany: () => request("/api/company"),
  updateCompany: (body) =>
    request("/api/company", { method: "PUT", body: JSON.stringify(body) }),

  uploadImage: async (file) => {
    const token = localStorage.getItem("admin_token");
    const formData = new FormData();
    formData.append("image", file);

    const res = await fetch(apiUrl("/api/upload"), {
      method: "POST",
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      body: formData,
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.message || "Upload failed");
    return data;
  },
};

export default api;
