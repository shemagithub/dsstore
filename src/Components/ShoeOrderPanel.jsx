import React, { useState, useMemo } from "react";
import { getColorOptions, getSizes, getWhatsAppOrderLink } from "../utils/whatsapp";
import { formatRFW } from "../utils/currency";
import { useStore } from "../context/StoreContext";
import WhatsAppIcon from "./WhatsAppIcon";

const MAX_QTY = 5;

const ShoeOrderPanel = ({ shoe, promoDateLabel }) => {
  const { companyInfo } = useStore();
  const whatsappNumber = companyInfo?.contact?.whatsapp;

  const sizes = getSizes(shoe);
  const colorOptions = getColorOptions(shoe);

  const [quantity, setQuantity] = useState(1);
  const [selections, setSelections] = useState([
    { size: sizes[0], colorIndex: 0 },
  ]);

  const showPerItemConfig = shoe.multiVariant && quantity > 1;

  const syncQuantity = (nextQty) => {
    const clamped = Math.max(1, Math.min(MAX_QTY, nextQty));
    setQuantity(clamped);

    if (shoe.multiVariant) {
      setSelections((prev) => {
        if (clamped > prev.length) {
          const template = prev[prev.length - 1] || { size: sizes[0], colorIndex: 0 };
          return [
            ...prev,
            ...Array(clamped - prev.length)
              .fill(null)
              .map(() => ({ ...template })),
          ];
        }
        return prev.slice(0, clamped);
      });
    }
  };

  const updateItem = (index, field, value) => {
    setSelections((prev) => {
      if (!shoe.multiVariant) {
        return [{ ...prev[0], [field]: value }];
      }
      return prev.map((item, i) => (i === index ? { ...item, [field]: value } : item));
    });
  };

  const previewColor = colorOptions[selections[0]?.colorIndex ?? 0]?.hex || shoe.accentColor;

  const whatsappHref = useMemo(
    () =>
      getWhatsAppOrderLink(shoe, promoDateLabel, selections, quantity, whatsappNumber),
    [shoe, promoDateLabel, selections, quantity, whatsappNumber]
  );

  const total = shoe.price * quantity;

  return (
    <div className="store-card p-5 sm:p-6 bg-store-black/40 mt-8">
      <h2 className="text-lg font-bold text-white mb-1">Configure your order</h2>
      <p className="text-store-muted text-sm mb-6">
        {shoe.multiVariant
          ? "Select size and color. For multiple pairs you can choose a different size and color for each item."
          : "Select your preferred size and color, then choose quantity."}
      </p>

      {!showPerItemConfig && (
        <>
          <div className="mb-5">
            <p className="text-xs text-store-muted uppercase tracking-wider mb-3">Size</p>
            <div className="flex flex-wrap gap-2">
              {sizes.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => updateItem(0, "size", s)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold border-2 transition-all ${
                    selections[0]?.size === s
                      ? "border-store-yellow bg-store-yellow text-black"
                      : "border-store-border text-gray-300 hover:border-store-yellow/50"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-5">
            <p className="text-xs text-store-muted uppercase tracking-wider mb-3">Color</p>
            <div className="flex flex-wrap gap-3">
              {colorOptions.map((c, i) => (
                <button
                  key={c.name}
                  type="button"
                  onClick={() => updateItem(0, "colorIndex", i)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-full border-2 transition-all ${
                    selections[0]?.colorIndex === i
                      ? "border-store-yellow bg-store-yellow/10"
                      : "border-store-border hover:border-store-yellow/40"
                  }`}
                >
                  <span
                    className="w-5 h-5 rounded-full border border-white/20"
                    style={{ backgroundColor: c.hex }}
                  />
                  <span className="text-sm text-white">{c.name}</span>
                </button>
              ))}
            </div>
          </div>
        </>
      )}

      <div className="mb-5">
        <p className="text-xs text-store-muted uppercase tracking-wider mb-3">Quantity</p>
        <div className="inline-flex items-center gap-4 bg-store-card border border-store-border rounded-full px-2 py-1">
          <button
            type="button"
            onClick={() => syncQuantity(quantity - 1)}
            disabled={quantity <= 1}
            className="w-9 h-9 rounded-full flex items-center justify-center text-lg font-bold text-white hover:bg-white/10 disabled:opacity-30"
          >
            −
          </button>
          <span className="text-xl font-bold text-store-yellow w-6 text-center">{quantity}</span>
          <button
            type="button"
            onClick={() => syncQuantity(quantity + 1)}
            disabled={quantity >= MAX_QTY}
            className="w-9 h-9 rounded-full flex items-center justify-center text-lg font-bold text-white hover:bg-white/10 disabled:opacity-30"
          >
            +
          </button>
        </div>
        {shoe.multiVariant && quantity > 1 && (
          <p className="text-xs text-store-yellow/80 mt-2">
            Multiple pairs — customize each item below
          </p>
        )}
      </div>

      {showPerItemConfig && (
        <div className="space-y-4 mb-5">
          {selections.map((sel, index) => (
            <div
              key={index}
              className="p-4 rounded-xl border border-store-border bg-store-card/60"
            >
              <p className="text-sm font-bold text-store-yellow mb-3">Item {index + 1}</p>
              <p className="text-[10px] text-store-muted uppercase tracking-wider mb-2">Size</p>
              <div className="flex flex-wrap gap-2 mb-3">
                {sizes.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => updateItem(index, "size", s)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold border-2 transition-all ${
                      sel.size === s
                        ? "border-store-yellow bg-store-yellow text-black"
                        : "border-store-border text-gray-300"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
              <p className="text-[10px] text-store-muted uppercase tracking-wider mb-2">Color</p>
              <div className="flex flex-wrap gap-2">
                {colorOptions.map((c, i) => (
                  <button
                    key={c.name}
                    type="button"
                    onClick={() => updateItem(index, "colorIndex", i)}
                    title={c.name}
                    className={`w-8 h-8 rounded-full border-2 transition-all ${
                      sel.colorIndex === i
                        ? "border-store-yellow ring-2 ring-store-yellow/30"
                        : "border-store-border"
                    }`}
                    style={{ backgroundColor: c.hex }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="p-4 rounded-xl bg-store-card border border-store-border mb-5">
        <p className="text-xs text-store-muted uppercase tracking-wider mb-2">Order summary</p>
        <ul className="space-y-1.5 text-sm text-gray-300">
          {shoe.multiVariant && quantity > 1
            ? selections.map((sel, i) => (
                <li key={i}>
                  {i + 1}. {sel.size} · {colorOptions[sel.colorIndex]?.name} —{" "}
                  {formatRFW(shoe.price)}
                </li>
              ))
            : (
                <li>
                  {selections[0]?.size} · {colorOptions[selections[0]?.colorIndex]?.name} ×{" "}
                  {quantity}
                </li>
              )}
        </ul>
        <p className="text-lg font-bold text-store-yellow mt-3 pt-3 border-t border-store-border">
          Total: {formatRFW(total)}
        </p>
      </div>

      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-whatsapp w-full py-4 text-base"
        style={{ boxShadow: `0 0 30px ${previewColor}33` }}
      >
        <WhatsAppIcon />
        Send order to WhatsApp
      </a>
    </div>
  );
};

export default ShoeOrderPanel;
