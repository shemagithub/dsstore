const { createProxyMiddleware } = require("http-proxy-middleware");

// Only used when REACT_APP_API_URL is unset/empty (local backend via relative /api paths)
const proxyTarget = process.env.REACT_APP_API_URL || "http://localhost:5000";

module.exports = function (app) {
  if (process.env.REACT_APP_API_URL) {
    return;
  }

  app.use(
    ["/api", "/uploads"],
    createProxyMiddleware({
      target: proxyTarget,
      changeOrigin: true,
    })
  );
};
