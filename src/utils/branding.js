import { resolveMediaUrl } from "./media";

export const DEFAULT_STORE_NAME = "Didier Shoes Store";
export const DEFAULT_PAGE_SUFFIX = "Shoe Promotions";

const setLinkIcon = (rel, href) => {
  if (!href) return;
  let link = document.querySelector(`link[rel="${rel}"]`);
  if (!link) {
    link = document.createElement("link");
    link.rel = rel;
    document.head.appendChild(link);
  }
  link.href = href;
};

export const applyStoreBranding = (company) => {
  if (!company) return;

  const name = (company.name || DEFAULT_STORE_NAME).trim();
  document.title = `${name} - ${DEFAULT_PAGE_SUFFIX}`;

  const description = company.tagline || company.description;
  if (description) {
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", String(description).slice(0, 160));
  }

  const logo = (company.logo || "").trim();
  if (logo) {
    const href = resolveMediaUrl(logo);
    setLinkIcon("icon", href);
    setLinkIcon("apple-touch-icon", href);
  }
};
