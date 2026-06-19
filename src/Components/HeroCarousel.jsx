import React, { useEffect, useState } from "react";
import { resolveMediaUrl } from "../utils/media";
import ImageLightbox from "./ImageLightbox";

const DEFAULT_HERO_IMAGES = [
  "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=500&h=500&fit=crop",
];

const HeroCarousel = ({
  images = [],
  badgeTitle = "New Arrival",
  badgeSubtitle = "Daily promotions",
  intervalMs = 4000,
  alt = "Featured shoe",
}) => {
  const slides = images.length ? images : DEFAULT_HERO_IMAGES;
  const slidesKey = slides.join("|");
  const [index, setIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  useEffect(() => {
    setIndex(0);
  }, [slidesKey]);

  useEffect(() => {
    if (slides.length <= 1) return undefined;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, intervalMs);
    return () => clearInterval(timer);
  }, [slides.length, intervalMs]);

  const goTo = (i) => setIndex(i);

  return (
    <>
      <div className="relative flex justify-center lg:justify-end hero-carousel-wrap">
        <div className="hero-carousel-rings" aria-hidden="true">
          <span className="hero-ring hero-ring-1" />
          <span className="hero-ring hero-ring-2" />
          <span className="hero-ring hero-ring-3" />
        </div>

        <div className="hero-carousel-stage">
          <div className="hero-carousel-orbit">
            {slides.map((src, i) => (
              <button
                key={`${src}-${i}`}
                type="button"
                onClick={() => {
                  setIndex(i);
                  setLightboxOpen(true);
                }}
                className={`hero-carousel-slide ${i === index ? "hero-carousel-slide-active" : ""}`}
                aria-label={`View hero image ${i + 1}`}
                aria-hidden={i !== index}
              >
                <img
                  src={resolveMediaUrl(src)}
                  alt={alt}
                  className="hero-carousel-img"
                  draggable={false}
                />
              </button>
            ))}
          </div>

          {slides.length > 1 && (
            <div className="hero-carousel-dots">
              {slides.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => goTo(i)}
                  className={`hero-carousel-dot ${i === index ? "hero-carousel-dot-active" : ""}`}
                  aria-label={`Show image ${i + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        <div className="hero-carousel-badge store-card px-4 py-3 shadow-glow">
          <p className="text-store-yellow font-bold text-sm">{badgeTitle}</p>
          <p className="text-white text-xs mt-0.5">{badgeSubtitle}</p>
        </div>
      </div>

      <ImageLightbox
        open={lightboxOpen}
        images={slides}
        index={index}
        alt={alt}
        onClose={() => setLightboxOpen(false)}
        onIndexChange={setIndex}
      />
    </>
  );
};

export default HeroCarousel;
