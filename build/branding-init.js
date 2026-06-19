(function () {
  var DEFAULT_NAME = "Didier Shoes Store";
  var hostname = window.location.hostname;
  var API_BASE =
    hostname === "localhost" || hostname === "127.0.0.1"
      ? "http://dss.finverra.co"
      : "";

  function resolveMediaUrl(url) {
    if (!url) return "";
    if (/^https?:\/\//.test(url) || url.indexOf("data:") === 0) return url;
    if (url.indexOf("/uploads") === 0) return API_BASE + url;
    return url;
  }

  function setIcon(rel, href) {
    if (!href) return;
    var link = document.querySelector('link[rel="' + rel + '"]');
    if (!link) {
      link = document.createElement("link");
      link.rel = rel;
      document.head.appendChild(link);
    }
    link.href = href;
  }

  function applyBranding(company) {
    if (!company) return;

    var name = (company.name || DEFAULT_NAME).trim();
    document.title = name + " - Shoe Promotions";

    var tagline = company.tagline || company.description;
    if (tagline) {
      var meta = document.querySelector('meta[name="description"]');
      if (meta) meta.setAttribute("content", String(tagline).slice(0, 160));
    }

    var logo = (company.logo || "").trim();
    if (logo) {
      var href = resolveMediaUrl(logo);
      setIcon("icon", href);
      setIcon("apple-touch-icon", href);
    }
  }

  fetch(API_BASE + "/api/store")
    .then(function (res) {
      return res.ok ? res.json() : null;
    })
    .then(function (data) {
      if (data && data.company) applyBranding(data.company);
    })
    .catch(function () {});
})();
