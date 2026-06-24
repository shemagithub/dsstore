import React, { useEffect, useState } from "react";
import { api } from "../../api/client";
import { formatRFW } from "../../utils/currency";
import { AVAILABLE_SIZES, PRESET_COLORS } from "../../constants/shoeOptions";
import AdminImageGallery from "./AdminImageGallery";
import { getShoeImages, resolveMediaUrl } from "../../utils/media";
import { useConfirm } from "../../context/ConfirmContext";

const emptyShoe = {
  name: "",
  brand: "Didier Shoes Store",
  price: 0,
  originalPrice: 0,
  discount: "",
  rating: 4.5,
  accentColor: "#FFE400",
  sizes: ["9 UK", "10 UK"],
  colorOptions: [],
  multiVariant: false,
  images: [],
  description: "",
  active: true,
};

const colorKey = (c) => `${c.name}-${c.hex}`;

const AdminShoes = () => {
  const confirm = useConfirm();
  const [shoes, setShoes] = useState([]);
  const [form, setForm] = useState(emptyShoe);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [customColor, setCustomColor] = useState({ name: "", hex: "#FFE400" });

  const load = () => {
    setLoading(true);
    api
      .getAllShoes()
      .then(setShoes)
      .catch((e) => setMessage(e.message))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const resetForm = () => {
    setForm(emptyShoe);
    setEditingId(null);
    setCustomColor({ name: "", hex: "#FFE400" });
  };

  const handleEdit = (shoe) => {
    setEditingId(shoe.id);
    setForm({
      ...shoe,
      images: getShoeImages(shoe),
      sizes: shoe.sizes || [],
      colorOptions: shoe.colorOptions || [],
    });
  };

  const toggleSize = (size) => {
    setForm((prev) => {
      const has = prev.sizes.includes(size);
      const sizes = has ? prev.sizes.filter((s) => s !== size) : [...prev.sizes, size];
      return { ...prev, sizes: AVAILABLE_SIZES.filter((s) => sizes.includes(s)) };
    });
  };

  const isColorSelected = (color) =>
    form.colorOptions.some((c) => c.hex.toLowerCase() === color.hex.toLowerCase());

  const toggleColor = (color) => {
    setForm((prev) => {
      const selected = prev.colorOptions.some(
        (c) => c.hex.toLowerCase() === color.hex.toLowerCase()
      );
      const colorOptions = selected
        ? prev.colorOptions.filter((c) => c.hex.toLowerCase() !== color.hex.toLowerCase())
        : [...prev.colorOptions, color];
      return {
        ...prev,
        colorOptions,
        accentColor: colorOptions[0]?.hex || prev.accentColor,
      };
    });
  };

  const removeColor = (color) => {
    setForm((prev) => {
      const colorOptions = prev.colorOptions.filter(
        (c) => colorKey(c) !== colorKey(color)
      );
      return {
        ...prev,
        colorOptions,
        accentColor: colorOptions[0].hex,
      };
    });
  };

  const addCustomColor = () => {
    const name = customColor.name.trim();
    if (!name) {
      setMessage("Enter a color name");
      return;
    }
    const color = { name, hex: customColor.hex };
    if (isColorSelected(color)) {
      setMessage("This color is already selected");
      return;
    }
    setForm((prev) => ({
      ...prev,
      colorOptions: [...prev.colorOptions, color],
      accentColor: prev.colorOptions.length === 0 ? color.hex : prev.accentColor,
    }));
    setCustomColor({ name: "", hex: "#FFE400" });
    setMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!form.sizes.length) {
      setMessage("Select at least one size");
      return;
    }
    if (!form.images?.length) {
      setMessage("Add at least one product image");
      return;
    }

    try {
      const payload = {
        ...form,
        price: Number(form.price),
        originalPrice: Number(form.originalPrice),
        rating: Number(form.rating),
        sizes: form.sizes,
        colorOptions: form.colorOptions,
        images: form.images,
        image: form.images[0],
        accentColor: form.colorOptions[0]?.hex || form.accentColor,
      };
      if (editingId) {
        await api.updateShoe(editingId, payload);
        setMessage("Shoe updated");
      } else {
        await api.createShoe(payload);
        setMessage("Shoe created");
      }
      resetForm();
      load();
    } catch (err) {
      setMessage(err.message);
    }
  };

  const handleDelete = async (id, name) => {
    const ok = await confirm({
      title: "Delete shoe",
      message: name
        ? `Remove "${name}" from the store? This cannot be undone.`
        : "Delete this shoe from the store? This cannot be undone.",
      confirmText: "Delete",
      cancelText: "Cancel",
      variant: "danger",
    });
    if (!ok) return;
    await api.deleteShoe(id);
    load();
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Manage Shoes</h1>
      {message && <p className="mb-4 text-sm text-store-yellow">{message}</p>}

      <form onSubmit={handleSubmit} className="store-card p-6 mb-8 grid sm:grid-cols-2 gap-4">
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="admin-input"
          required
        />
        <input
          placeholder="Discount (e.g. 20% OFF)"
          value={form.discount}
          onChange={(e) => setForm({ ...form, discount: e.target.value })}
          className="admin-input"
        />
        <label className="flex items-center gap-2 text-sm text-store-muted">
          <input
            type="checkbox"
            checked={form.multiVariant}
            onChange={(e) => setForm({ ...form, multiVariant: e.target.checked })}
          />
          Allow different size/color per item
        </label>
        <input
          type="number"
          placeholder="Price (RFW)"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          className="admin-input"
          required
        />
        <input
          type="number"
          placeholder="Original Price (RFW)"
          value={form.originalPrice}
          onChange={(e) => setForm({ ...form, originalPrice: e.target.value })}
          className="admin-input"
          required
        />

        <AdminImageGallery
          label="Product images"
          images={form.images || []}
          onChange={(images) => setForm({ ...form, images })}
        />

        <div className="sm:col-span-2">
          <p className="text-sm text-store-muted mb-2">Available sizes — pick all that apply</p>
          <div className="flex flex-wrap gap-2">
            {AVAILABLE_SIZES.map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => toggleSize(size)}
                className={`admin-chip ${
                  form.sizes.includes(size) ? "admin-chip-active" : "admin-chip-inactive"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <div className="sm:col-span-2">
          <p className="text-sm text-store-muted mb-2">
            Available colors (optional) — pick from presets or add custom, or leave empty
          </p>
          <div className="flex flex-wrap gap-3 mb-4">
            {PRESET_COLORS.map((color) => {
              const selected = isColorSelected(color);
              return (
                <button
                  key={color.hex}
                  type="button"
                  title={color.name}
                  onClick={() => toggleColor(color)}
                  className={`admin-color-swatch ${
                    selected ? "admin-color-swatch-active" : "admin-color-swatch-inactive"
                  }`}
                  style={{ backgroundColor: color.hex }}
                />
              );
            })}
          </div>

          {form.colorOptions.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {form.colorOptions.map((color) => (
                <span
                  key={colorKey(color)}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-store-border text-sm text-white"
                >
                  <span
                    className="w-4 h-4 rounded-full border border-white/20"
                    style={{ backgroundColor: color.hex }}
                  />
                  {color.name}
                  <button
                    type="button"
                    onClick={() => removeColor(color)}
                    className="text-store-muted hover:text-red-400 ml-1"
                    aria-label={`Remove ${color.name}`}
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}

          <div className="flex flex-wrap items-end gap-3">
            <div className="flex-1 min-w-[140px]">
              <label className="block text-xs text-store-muted mb-1">Custom color name</label>
              <input
                placeholder="e.g. Burgundy"
                value={customColor.name}
                onChange={(e) => setCustomColor({ ...customColor, name: e.target.value })}
                className="admin-input"
              />
            </div>
            <div>
              <label className="block text-xs text-store-muted mb-1">Pick color</label>
              <input
                type="color"
                value={customColor.hex}
                onChange={(e) => setCustomColor({ ...customColor, hex: e.target.value })}
                className="w-14 h-11 rounded-lg cursor-pointer bg-black border border-store-border p-1"
              />
            </div>
            <button type="button" onClick={addCustomColor} className="btn-store-outline py-3 px-4">
              Add color
            </button>
          </div>
        </div>

        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="admin-input sm:col-span-2 min-h-[80px]"
        />
        <div className="sm:col-span-2 flex gap-3">
          <button type="submit" className="btn-store-primary">
            {editingId ? "Update Shoe" : "Add Shoe"}
          </button>
          {editingId && (
            <button type="button" onClick={resetForm} className="btn-store-outline">
              Cancel
            </button>
          )}
        </div>
      </form>

      {loading ? (
        <p className="text-store-muted">Loading...</p>
      ) : (
        <div className="space-y-3">
          {shoes.map((shoe) => (
            <div key={shoe.id} className="store-card p-4 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-4">
                <img
                  src={resolveMediaUrl(getShoeImages(shoe)[0])}
                  alt=""
                  className="w-14 h-14 object-contain rounded bg-black"
                />
                <div>
                  <p className="font-bold text-white">{shoe.name}</p>
                  <p className="text-sm text-store-muted">{formatRFW(shoe.price)}</p>
                  <p className="text-xs text-store-muted mt-1">
                    {(shoe.sizes || []).join(", ")}
                    {(shoe.colorOptions || []).length > 0 &&
                      ` · ${(shoe.colorOptions || []).map((c) => c.name).join(", ")}`}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleEdit(shoe)} className="btn-store-outline text-sm py-2 px-4">
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(shoe.id, shoe.name)}
                  className="text-sm py-2 px-4 text-red-400 border border-red-400/30 rounded-full hover:bg-red-400/10"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminShoes;
