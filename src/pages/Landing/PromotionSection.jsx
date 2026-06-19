import React, { useState, useEffect } from "react";
import { formatDateKey, formatDateLabel } from "../../utils/dates";
import { useStore } from "../../context/StoreContext";
import ShoeCard from "../../Components/ShoeCard";
import StoreLoader from "../../Components/StoreLoader";

const PromotionSection = () => {
  const { promotionShoes, promotionDateKeys, loading, error, reloadStore } = useStore();
  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    if (promotionDateKeys.length && !selectedDate) {
      setSelectedDate(promotionDateKeys[0]);
    }
  }, [promotionDateKeys, selectedDate]);

  if (loading) return <StoreLoader message="Loading promotions..." />;
  if (error) {
    return (
      <section id="promotions" className="store-page py-16">
        <div className="x_container text-center">
          <p className="text-red-400 mb-4">{error}</p>
          <button onClick={reloadStore} className="btn-store-primary">
            Retry
          </button>
        </div>
      </section>
    );
  }

  const selectedShoes = promotionShoes[selectedDate] || [];
  const promoDateLabel = formatDateLabel(selectedDate);

  return (
    <section id="promotions" className="store-page py-16 lg:py-24">
      <div className="x_container">
        <div className="mb-12">
          <p className="section-label mb-3">Daily Deals</p>
          <h2 className="section-title">
            Popular <span className="text-store-yellow">Products</span>
          </h2>
          <p className="mt-4 text-store-muted max-w-lg text-base sm:text-lg">
            Pick a promotion date, then tap any shoe to view its full description
            on a dedicated page. Order directly via WhatsApp.
          </p>
        </div>

        <p className="text-store-muted text-sm font-medium mb-4 tracking-wide">
          Select promotion date
        </p>

        {promotionDateKeys.length === 0 ? (
          <p className="text-store-muted">No promotions scheduled yet.</p>
        ) : (
          <div className="date-picker-track">
            {promotionDateKeys.map((dateKey) => {
              const [year, month, day] = dateKey.split("-").map(Number);
              const date = new Date(year, month - 1, day);
              const isSelected = selectedDate === dateKey;
              const isToday = dateKey === formatDateKey(new Date());
              const shoeCount = promotionShoes[dateKey]?.length || 0;
              const weekday = date.toLocaleDateString("en-US", { weekday: "short" }).toUpperCase();
              const monthLabel = date.toLocaleDateString("en-US", { month: "short" });

              return (
                <button
                  key={dateKey}
                  type="button"
                  onClick={() => setSelectedDate(dateKey)}
                  aria-pressed={isSelected}
                  className={`date-card ${isSelected ? "date-card-active" : "date-card-inactive"}`}
                >
                  <span className={`date-card-weekday ${isSelected ? "text-black/70" : "text-gray-500"}`}>
                    {weekday}
                  </span>
                  <span className={`date-card-day ${isSelected ? "text-black" : "text-white"}`}>{day}</span>
                  <span className={`date-card-month ${isSelected ? "text-black/60" : "text-gray-500"}`}>
                    {monthLabel}
                  </span>
                  {isToday && (
                    <span
                      className={`date-card-badge ${
                        isSelected ? "bg-[#C9A800] text-black" : "bg-store-yellow/15 text-store-yellow border border-store-yellow/25"
                      }`}
                    >
                      Today
                    </span>
                  )}
                  <span className={`date-card-deals ${isSelected ? "text-black/65" : "text-gray-500"}`}>
                    {shoeCount} deal{shoeCount !== 1 ? "s" : ""}
                  </span>
                </button>
              );
            })}
          </div>
        )}

        <div className="mt-12">
          <div className="flex flex-wrap items-center gap-3 mb-8">
            <span className="w-1 h-8 bg-store-yellow rounded-full" />
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Promotions for <span className="text-store-yellow">{promoDateLabel}</span>
            </h3>
            <span className="text-sm text-store-muted bg-store-card px-3 py-1 rounded-full border border-store-border">
              {selectedShoes.length} item{selectedShoes.length !== 1 ? "s" : ""}
            </span>
          </div>

          {selectedShoes.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
              {selectedShoes.map((shoe) => (
                <ShoeCard key={shoe.id} shoe={shoe} promoDateKey={selectedDate} />
              ))}
            </div>
          ) : (
            <div className="store-card text-center py-20 border-dashed">
              <p className="text-store-muted text-lg">No shoe promotions scheduled for this date.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PromotionSection;
