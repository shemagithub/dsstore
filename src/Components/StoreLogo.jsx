import React from "react";
import { Link } from "react-router-dom";
import { resolveMediaUrl } from "../utils/media";

const StoreLogo = ({ companyInfo, loading = false, className = "" }) => {
  const name = companyInfo?.name?.trim() || "Didier Shoes Store";
  const logo = companyInfo?.logo?.trim();
  const [first = name, ...rest] = name.split(" ");
  const secondLine = rest.join(" ");

  if (loading && !companyInfo) {
    return (
      <div className={`flex items-center gap-2 ${className}`} aria-hidden="true">
        <div className="h-9 w-9 rounded-lg bg-store-border/40 animate-pulse" />
        <div className="space-y-1.5">
          <div className="h-3 w-20 rounded bg-store-border/40 animate-pulse" />
          <div className="h-2 w-16 rounded bg-store-border/30 animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <Link to="/" className={`flex items-center gap-2.5 sm:gap-3 shrink-0 min-w-0 ${className}`}>
      {logo && (
        <img
          src={resolveMediaUrl(logo)}
          alt=""
          className="h-9 sm:h-10 w-auto max-w-[100px] sm:max-w-[120px] object-contain shrink-0"
        />
      )}
      <div className="flex flex-col leading-tight min-w-0">
        <span
          className="text-store-yellow font-extrabold text-base sm:text-lg tracking-tight truncate"
          title={name}
        >
          {logo ? name : first}
        </span>
        {secondLine && (
          <span
            className={`text-white font-medium tracking-widest uppercase truncate ${
              logo ? "text-[9px] sm:text-[10px] text-white/80" : "text-[10px] sm:text-xs"
            }`}
          >
            {secondLine}
          </span>
        )}
      </div>
    </Link>
  );
};

export default StoreLogo;
