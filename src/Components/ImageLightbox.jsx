import React, { useEffect } from "react";
import { resolveMediaUrl } from "../utils/media";

const ImageLightbox = ({
  open,
  images = [],
  index = 0,
  alt = "Image preview",
  onClose,
  onIndexChange,
}) => {
  const list = images.filter(Boolean);
  const current = list[index] ?? list[0];

  useEffect(() => {
    if (!open) return undefined;

    document.body.style.overflow = "hidden";

    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && onIndexChange && index > 0) {
        onIndexChange(index - 1);
      }
      if (e.key === "ArrowRight" && onIndexChange && index < list.length - 1) {
        onIndexChange(index + 1);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, index, list.length, onClose, onIndexChange]);

  if (!open || !current) return null;

  return (
    <div
      className="image-lightbox"
      role="dialog"
      aria-modal="true"
      aria-label="Full screen image"
      onClick={onClose}
    >
      <button type="button" className="image-lightbox-cancel" onClick={onClose}>
        Cancel
      </button>

      {list.length > 1 && onIndexChange && (
        <>
          <button
            type="button"
            className="image-lightbox-nav image-lightbox-nav-prev"
            onClick={(e) => {
              e.stopPropagation();
              if (index > 0) onIndexChange(index - 1);
            }}
            disabled={index === 0}
            aria-label="Previous image"
          >
            ‹
          </button>
          <button
            type="button"
            className="image-lightbox-nav image-lightbox-nav-next"
            onClick={(e) => {
              e.stopPropagation();
              if (index < list.length - 1) onIndexChange(index + 1);
            }}
            disabled={index === list.length - 1}
            aria-label="Next image"
          >
            ›
          </button>
          <p className="image-lightbox-counter">
            {index + 1} / {list.length}
          </p>
        </>
      )}

      <div className="image-lightbox-stage" onClick={(e) => e.stopPropagation()}>
        <img
          src={resolveMediaUrl(current)}
          alt={alt}
          className="image-lightbox-img"
        />
      </div>
    </div>
  );
};

export default ImageLightbox;
