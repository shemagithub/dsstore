import React, { useRef, useState } from "react";
import { api } from "../../api/client";
import { resolveMediaUrl } from "../../utils/media";
import ImageLightbox from "../../Components/ImageLightbox";

const AdminImageGallery = ({ label, images = [], onChange }) => {
  const fileRef = useRef(null);
  const [urlInput, setUrlInput] = useState("");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const addImage = (url) => {
    const trimmed = url.trim();
    if (!trimmed || images.includes(trimmed)) return;
    onChange([...images, trimmed]);
  };

  const removeImage = (index) => {
    onChange(images.filter((_, i) => i !== index));
  };

  const setPrimary = (index) => {
    if (index === 0) return;
    const next = [...images];
    const [selected] = next.splice(index, 1);
    onChange([selected, ...next]);
  };

  const handlePaste = (e) => {
    const pasted = e.clipboardData.getData("text").trim();
    if (pasted.startsWith("http") || pasted.startsWith("/uploads")) {
      e.preventDefault();
      addImage(pasted);
      setUrlInput("");
    }
  };

  const handleAddUrl = () => {
    if (!urlInput.trim()) return;
    addImage(urlInput);
    setUrlInput("");
  };

  const handleUpload = async (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    setError("");
    setUploading(true);
    try {
      const uploaded = [];
      for (const file of files) {
        const { url } = await api.uploadImage(file);
        uploaded.push(url);
      }
      onChange([...images, ...uploaded.filter((url) => !images.includes(url))]);
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  return (
    <div className="sm:col-span-2">
      {label && <p className="text-sm text-store-muted mb-2">{label}</p>}

      <div className="flex flex-wrap gap-2 mb-3">
        <input
          type="text"
          placeholder="Paste image URL and click Add"
          value={urlInput}
          onChange={(e) => setUrlInput(e.target.value)}
          onPaste={handlePaste}
          onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddUrl())}
          className="admin-input flex-1 min-w-[200px]"
        />
        <button type="button" onClick={handleAddUrl} className="btn-store-outline px-4 py-3">
          Add URL
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleUpload}
          className="hidden"
        />
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          disabled={uploading}
          className="btn-store-outline whitespace-nowrap px-4 py-3"
        >
          {uploading ? "Uploading..." : "Upload images"}
        </button>
      </div>

      <p className="text-xs text-store-muted mb-3">
        Paste a link or upload files. First image is the main product photo. Click image to view full screen, or use ★ to set as main.
      </p>      {error && <p className="text-xs text-red-400 mb-2">{error}</p>}

      {images.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {images.map((url, index) => (
            <div
              key={`${url}-${index}`}
              className={`relative rounded-lg border overflow-hidden bg-black ${
                index === 0 ? "border-store-yellow ring-1 ring-store-yellow/40" : "border-store-border"
              }`}
            >
              <button
                type="button"
                onClick={() => setLightboxIndex(index)}
                className="block w-full image-lightbox-trigger"
              >
                <img
                  src={resolveMediaUrl(url)}
                  alt={`Product ${index + 1}`}
                  className="w-full h-28 object-contain p-2 pointer-events-none"
                />
              </button>
              {index !== 0 && (
                <button
                  type="button"
                  onClick={() => setPrimary(index)}
                  className="absolute bottom-1 left-1 text-[10px] font-bold bg-store-yellow text-black px-1.5 py-0.5 rounded hover:bg-yellow-300"
                  title="Set as main image"
                >
                  ★ Main
                </button>
              )}              {index === 0 && (
                <span className="absolute top-1 left-1 text-[10px] font-bold bg-store-yellow text-black px-1.5 py-0.5 rounded">
                  Main
                </span>
              )}
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-1 right-1 w-6 h-6 rounded-full bg-black/80 text-red-400 text-sm hover:bg-red-500/20"
                aria-label="Remove image"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-store-muted border border-dashed border-store-border rounded-lg p-6 text-center">
          No images yet — add at least one product photo
        </p>
      )}

      <ImageLightbox
        open={lightboxIndex !== null}
        images={images}
        index={lightboxIndex ?? 0}
        alt="Product image"
        onClose={() => setLightboxIndex(null)}
        onIndexChange={setLightboxIndex}
      />
    </div>
  );
};
export default AdminImageGallery;
