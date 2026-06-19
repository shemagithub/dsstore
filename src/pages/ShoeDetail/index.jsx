import React, { useEffect, useState } from "react";
import { Link, useParams, useSearchParams, Navigate } from "react-router-dom";
import { formatDateLabel, getShoeById } from "../../utils/dates";
import { useStore } from "../../context/StoreContext";
import { formatRFW } from "../../utils/currency";
import { getShoeImages, resolveMediaUrl } from "../../utils/media";
import ShoeOrderPanel from "../../Components/ShoeOrderPanel";
import StoreLoader from "../../Components/StoreLoader";
import ImageLightbox from "../../Components/ImageLightbox";

const ShoeDetail = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const promoDateKey = searchParams.get("promo");
  const { promotionShoes, loading, error, reloadStore } = useStore();
  const [activeImage, setActiveImage] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setActiveImage(0);
    setLightboxOpen(false);
  }, [id]);

  if (loading) {
    return (
      <div className="store-page">
        <StoreLoader message="Loading shoe details..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="store-page py-16 x_container text-center">
        <p className="text-red-400 mb-4">{error}</p>
        <button onClick={reloadStore} className="btn-store-primary">Retry</button>
      </div>
    );
  }

  const result = getShoeById(promotionShoes, id, promoDateKey);

  if (!result) {
    return <Navigate to="/" replace />;
  }

  const { shoe, dateKey } = result;
  const promoDateLabel = formatDateLabel(dateKey);
  const images = getShoeImages(shoe);
  const currentImage = images[activeImage] || images[0];

  const openLightbox = (index = activeImage) => {
    setActiveImage(index);
    setLightboxOpen(true);
  };

  return (
    <div className="store-page py-8 sm:py-12 lg:py-16">
      <div className="x_container">
        <Link
          to="/#promotions"
          className="inline-flex items-center gap-2 text-store-muted hover:text-store-yellow text-sm font-medium mb-8 transition-colors group"
        >
          <span className="group-hover:-translate-x-1 transition-transform">←</span>
          Back to promotions
        </Link>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          <div className="store-card p-8 sm:p-12 flex flex-col items-center justify-center relative overflow-hidden lg:sticky lg:top-24">
            <div
              className="absolute inset-0 opacity-20"
              style={{
                background: `radial-gradient(circle at 50% 60%, ${shoe.accentColor} 0%, transparent 70%)`,
              }}
            />
            <button
              type="button"
              onClick={() => openLightbox(activeImage)}
              className="relative z-10 image-lightbox-trigger bg-transparent border-0 p-0"
              aria-label="View full screen image"
            >
              <img
                src={resolveMediaUrl(currentImage)}
                alt={shoe.name}
                className="w-full max-w-sm object-contain drop-shadow-2xl"
              />
            </button>
            <p className="relative z-10 text-xs text-store-muted mt-3">Tap image to view full screen</p>
            {images.length > 1 && (
              <div className="relative z-10 flex flex-wrap justify-center gap-2 mt-4 w-full">
                {images.map((img, index) => (
                  <button
                    key={`${img}-${index}`}
                    type="button"
                    onClick={() => openLightbox(index)}
                    className={`w-16 h-16 rounded-lg border bg-black/50 p-1 transition-all image-lightbox-trigger ${
                      activeImage === index
                        ? "border-store-yellow ring-1 ring-store-yellow/50"
                        : "border-store-border hover:border-store-yellow/40"
                    }`}
                  >
                    <img
                      src={resolveMediaUrl(img)}
                      alt=""
                      className="w-full h-full object-contain pointer-events-none"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-col">
            <p className="section-label mb-2">{shoe.brand}</p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-store-yellow leading-tight">
              {shoe.name}
            </h1>

            <div className="flex flex-wrap items-center gap-4 mt-5">
              <p className="text-3xl sm:text-4xl font-bold text-white">{formatRFW(shoe.price)}</p>
              <p className="text-lg text-gray-500 line-through">{formatRFW(shoe.originalPrice)}</p>
              <span className="px-3 py-1 bg-red-500/20 text-red-400 text-sm font-bold rounded-full">
                {shoe.discount}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-store-muted">
              <span><span className="text-store-yellow">★</span> {shoe.rating} rating</span>
              <span>{shoe.sizes?.length || 0} sizes available</span>
              <span>{shoe.colorOptions?.length || 0} colors</span>
            </div>

            {shoe.multiVariant && (
              <p className="mt-3 text-xs text-store-yellow bg-store-yellow/10 border border-store-yellow/20 rounded-full px-3 py-1 w-fit">
                Multi-pair orders — pick different size & color per item
              </p>
            )}

            <div className="mt-6 p-4 store-card bg-store-black/50">
              <p className="text-xs text-store-muted uppercase tracking-wider mb-1">Promotion date</p>
              <p className="text-white font-semibold">{promoDateLabel}</p>
            </div>

            <div className="mt-8">
              <h2 className="text-xl font-bold text-white mb-3">Description</h2>
              <p className="text-store-muted leading-relaxed text-base sm:text-lg">{shoe.description}</p>
            </div>

            <ShoeOrderPanel shoe={shoe} promoDateLabel={promoDateLabel} />

            <Link to="/#promotions" className="btn-store-outline w-full py-4 text-base mt-4 text-center">
              Browse more shoes
            </Link>
          </div>
        </div>
      </div>

      <ImageLightbox
        open={lightboxOpen}
        images={images}
        index={activeImage}
        alt={shoe.name}
        onClose={() => setLightboxOpen(false)}
        onIndexChange={setActiveImage}
      />
    </div>
  );
};

export default ShoeDetail;
