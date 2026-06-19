import React, { useRef, useState } from "react";
import { api } from "../../api/client";
import { resolveMediaUrl } from "../../utils/media";
import ImageLightbox from "../../Components/ImageLightbox";

const AdminImageField = ({ label, value, onChange, hint }) => {
  const fileRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const addUrl = (url) => {
    const trimmed = url.trim();
    if (trimmed) onChange(trimmed);
  };

  const handlePaste = (e) => {
    const pasted = e.clipboardData.getData("text").trim();
    if (pasted.startsWith("http") || pasted.startsWith("/uploads")) {
      e.preventDefault();
      addUrl(pasted);
    }
  };

  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setError("");
    setUploading(true);
    try {
      const { url } = await api.uploadImage(file);
      onChange(url);
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  return (
    <div>
      {label && <label className="block text-sm text-store-muted mb-1">{label}</label>}
      <div className="flex flex-wrap gap-2 mb-2">
        <input
          type="text"
          placeholder="Paste image URL or type address"
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          onPaste={handlePaste}
          className="admin-input flex-1 min-w-[200px]"
        />
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          onChange={handleUpload}
          className="hidden"
        />
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          disabled={uploading}
          className="btn-store-outline whitespace-nowrap px-4 py-3"
        >
          {uploading ? "Uploading..." : "Upload image"}
        </button>
      </div>
      {hint && <p className="text-xs text-store-muted mb-2">{hint}</p>}
      {error && <p className="text-xs text-red-400 mb-2">{error}</p>}
      {value && (
        <button
          type="button"
          onClick={() => setLightboxOpen(true)}
          className="p-3 rounded-lg bg-black border border-store-border inline-block image-lightbox-trigger"
        >
          <img
            src={resolveMediaUrl(value)}
            alt="Preview"
            className="h-16 max-w-[200px] object-contain pointer-events-none"
            onError={(e) => {
              e.currentTarget.style.opacity = "0.3";
            }}
          />
        </button>
      )}

      <ImageLightbox
        open={lightboxOpen && !!value}
        images={value ? [value] : []}
        alt={label || "Image preview"}
        onClose={() => setLightboxOpen(false)}
      />
    </div>
  );
};
export default AdminImageField;
