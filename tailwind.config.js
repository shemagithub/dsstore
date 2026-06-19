module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      spacing: {
        header_height: "72px",
        minus_header_height: "calc(100vh - 72px)",
      },
      colors: {
        dark1: "#131B4C",
        dark2: "#0A0829",
        store: {
          yellow: "#FFE400",
          "yellow-dim": "#C9B400",
          black: "#050505",
          card: "#141414",
          border: "#2a2a2a",
          muted: "#9ca3af",
        },
      },
      boxShadow: {
        glow: "0 0 40px rgba(255, 228, 0, 0.15)",
        card: "0 8px 32px rgba(0, 0, 0, 0.4)",
      },
      backgroundImage: {
        "store-gradient":
          "radial-gradient(ellipse at 20% 20%, rgba(255,228,0,0.08) 0%, transparent 50%), radial-gradient(ellipse at 80% 80%, rgba(255,228,0,0.05) 0%, transparent 50%)",
      },
    },
  },
  plugins: [],
};
