import React from "react";
import { Link } from "react-router-dom";
import { getColorOptions } from "../utils/whatsapp";
import { formatRFW } from "../utils/currency";
import { getShoePrimaryImage, resolveMediaUrl } from "../utils/media";

const ShoeCard = ({ shoe, promoDateKey }) => {
  const colorOptions = getColorOptions(shoe);

  return (
    <Link
      to={`/shoe/${shoe.id}?promo=${promoDateKey}`}
      className="store-card store-card-hover block p-5 sm:p-6 group"
    >
      <div className="flex items-start justify-between gap-2">
        <p className="text-white font-bold text-lg sm:text-xl">{formatRFW(shoe.price)}</p>
        <span className="text-[10px] font-bold px-2 py-1 bg-red-500/20 text-red-400 rounded-full">
          {shoe.discount}
        </span>
      </div>

      <div className="relative flex justify-center py-8 my-1">
        <div
          className="absolute w-32 h-32 rounded-full opacity-60 blur-[2px] group-hover:scale-110 transition-transform duration-500"
          style={{ backgroundColor: shoe.accentColor }}
        />
        <img
          src={resolveMediaUrl(getShoePrimaryImage(shoe))}
          alt={shoe.name}
          className="relative z-10 w-40 h-40 object-contain drop-shadow-2xl group-hover:scale-110 group-hover:-rotate-3 transition-all duration-500"
        />
      </div>

      {colorOptions.length > 0 && (
        <div className="flex justify-center gap-2 mb-4">
          {colorOptions.map((c, i) => (
            <span
              key={c.name}
              title={c.name}
              className={`w-4 h-4 rounded-full border-2 ${
                i === 0 ? "border-store-yellow" : "border-transparent"
              }`}
              style={{ backgroundColor: c.hex }}
            />
          ))}
        </div>
      )}

      <h4 className="text-store-yellow font-bold text-lg sm:text-xl group-hover:text-yellow-300 transition-colors">
        {shoe.name}
      </h4>
      <p className="text-store-muted text-sm mt-1.5">
        {shoe.sizes?.length ? `${shoe.sizes.length} sizes` : shoe.size} · {shoe.rating} ★
      </p>

      <div className="mt-5 pt-4 border-t border-store-border">
        <span className="block w-full text-center btn-store-primary text-sm py-3 group-hover:bg-yellow-300">
          View Details →
        </span>
      </div>
    </Link>
  );
};

export default ShoeCard;
