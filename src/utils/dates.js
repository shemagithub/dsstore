export const formatDateKey = (date) => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
};

export const formatDateLabel = (dateKeyOrDate) => {
  const date =
    typeof dateKeyOrDate === "string"
      ? (() => {
          const [year, month, day] = dateKeyOrDate.split("-").map(Number);
          return new Date(year, month - 1, day);
        })()
      : dateKeyOrDate;

  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};

export const getShoeById = (promotionShoes, id, promoDateKey) => {
  if (promoDateKey && promotionShoes[promoDateKey]) {
    const shoe = promotionShoes[promoDateKey].find((s) => s.id === id);
    if (shoe) return { shoe, dateKey: promoDateKey };
  }

  for (const [dateKey, shoes] of Object.entries(promotionShoes)) {
    const shoe = shoes.find((s) => s.id === id);
    if (shoe) return { shoe, dateKey };
  }

  return null;
};
