import { formatRFW } from "./currency";

export const WHATSAPP_NUMBER = "250788123456";

export const getColorOptions = (shoe) => {
  if (Array.isArray(shoe.colorOptions)) return shoe.colorOptions;
  return (shoe.colors || []).map((hex, i) => ({ name: `Color ${i + 1}`, hex }));
};

export const getSizes = (shoe) => shoe.sizes || (shoe.size ? [shoe.size] : []);

export const getWhatsAppOrderLink = (
  shoe,
  promoDate,
  selections,
  quantity,
  whatsappNumber = WHATSAPP_NUMBER
) => {
  const colors = getColorOptions(shoe);
  const lines = [];

  lines.push(`Hi! I'd like to order from Didier Shoes Store:`);
  lines.push("");
  lines.push(`*${shoe.name}*`);
  lines.push(`Promotion: ${promoDate}`);
  lines.push(`Unit price: ${formatRFW(shoe.price)}`);
  lines.push("");

  if (shoe.multiVariant && quantity > 1) {
    lines.push("*Items:*");
    selections.forEach((sel, i) => {
      const colorPart = colors.length > 0 ? `, Color ${colors[sel.colorIndex]?.name || "—"}` : "";
      lines.push(`${i + 1}. Size ${sel.size}${colorPart}`);
    });
  } else {
    const sel = selections[0];
    lines.push(`Size: ${sel.size}`);
    if (colors.length > 0) {
      lines.push(`Color: ${colors[sel.colorIndex]?.name || "—"}`);
    }
    lines.push(`Quantity: ${quantity}`);
  }

  lines.push("");
  lines.push(`*Total: ${formatRFW(shoe.price * quantity)}*`);
  lines.push("");
  lines.push("Please confirm availability. Thank you!");

  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(lines.join("\n"))}`;
};

export const getWhatsAppLink = (shoe, promoDate, whatsappNumber) =>
  getWhatsAppOrderLink(
    shoe,
    promoDate,
    [{ size: getSizes(shoe)[0], colorIndex: 0 }],
    1,
    whatsappNumber
  );
