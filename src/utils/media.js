import { API_BASE } from "../config/api";

/** Resolve uploaded image paths for display in dev and production */
export const resolveMediaUrl = (url) => {
  if (!url) return "";
  if (url.startsWith("http://") || url.startsWith("https://") || url.startsWith("data:")) {
    return url;
  }
  if (url.startsWith("/uploads")) {
    return `${API_BASE}${url}`;
  }
  return url;
};

export const getShoeImages = (shoe) => {
  if (!shoe) return [];
  if (shoe.images?.length) return shoe.images;
  if (shoe.image) return [shoe.image];
  return [];
};

export const getShoePrimaryImage = (shoe) => getShoeImages(shoe)[0] || "";
