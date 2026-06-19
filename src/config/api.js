const DEFAULT_API_URL = "http://dss.finverra.co";

export const API_BASE = (
  process.env.REACT_APP_API_URL || DEFAULT_API_URL
).replace(/\/$/, "");

export const apiUrl = (path) => `${API_BASE}${path.startsWith("/") ? path : `/${path}`}`;
