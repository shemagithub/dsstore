import React, { useEffect, useState } from "react";
import { api } from "../../api/client";
import { formatDateKey, formatDateLabel } from "../../utils/dates";
import { useConfirm } from "../../context/ConfirmContext";

const AdminPromotions = () => {
  const confirm = useConfirm();
  const [promotions, setPromotions] = useState([]);
  const [shoes, setShoes] = useState([]);
  const [dateKey, setDateKey] = useState(formatDateKey(new Date()));
  const [selectedShoeIds, setSelectedShoeIds] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");

  const load = async () => {
    const [promoData, shoeData] = await Promise.all([
      api.getAllPromotions(),
      api.getAllShoes(),
    ]);
    setPromotions(promoData);
    setShoes(shoeData);
  };

  useEffect(() => {
    load().catch((e) => setMessage(e.message));
  }, []);

  const toggleShoe = (id) => {
    setSelectedShoeIds((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const resetForm = () => {
    setDateKey(formatDateKey(new Date()));
    setSelectedShoeIds([]);
    setEditingId(null);
  };

  const handleEdit = (promo) => {
    setEditingId(promo.id);
    setDateKey(promo.dateKey);
    setSelectedShoeIds(promo.shoeIds);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const payload = { dateKey, shoeIds: selectedShoeIds, active: true };
      if (editingId) {
        await api.updatePromotion(editingId, payload);
        setMessage("Promotion updated");
      } else {
        await api.createPromotion(payload);
        setMessage("Promotion created");
      }
      resetForm();
      load();
    } catch (err) {
      setMessage(err.message);
    }
  };

  const handleDelete = async (id) => {
    const promo = promotions.find((p) => p.id === id);
    const ok = await confirm({
      title: "Delete promotion",
      message: promo
        ? `Remove the promotion for ${formatDateLabel(promo.dateKey)}? This cannot be undone.`
        : "Delete this promotion date? This cannot be undone.",
      confirmText: "Delete",
      cancelText: "Cancel",
      variant: "danger",
    });
    if (!ok) return;
    await api.deletePromotion(id);
    load();
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Manage Promotions</h1>
      {message && <p className="mb-4 text-sm text-store-yellow">{message}</p>}

      <form onSubmit={handleSubmit} className="store-card p-6 mb-8">
        <div className="mb-5 max-w-sm">
          <label htmlFor="promo-date" className="block text-sm text-store-muted mb-1">
            Pick promotion date
          </label>
          <input
            id="promo-date"
            type="date"
            value={dateKey}
            onChange={(e) => setDateKey(e.target.value)}
            className="admin-input"
            required
          />
          {dateKey && (
            <p className="text-sm text-store-yellow mt-2">
              Selected: {formatDateLabel(dateKey)}
            </p>
          )}
        </div>

        <p className="text-sm text-store-muted mb-2">Select shoes for this date</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2 mb-4 max-h-60 overflow-y-auto">
          {shoes.map((shoe) => (
            <label
              key={shoe.id}
              className={`flex items-center gap-2 p-3 rounded-lg border cursor-pointer text-sm ${
                selectedShoeIds.includes(shoe.id)
                  ? "border-store-yellow bg-store-yellow/10"
                  : "border-store-border"
              }`}
            >
              <input
                type="checkbox"
                checked={selectedShoeIds.includes(shoe.id)}
                onChange={() => toggleShoe(shoe.id)}
              />
              <span className="text-white truncate">{shoe.name}</span>
            </label>
          ))}
        </div>

        <div className="flex gap-3">
          <button type="submit" className="btn-store-primary">
            {editingId ? "Update Promotion" : "Add Promotion"}
          </button>
          {editingId && (
            <button type="button" onClick={resetForm} className="btn-store-outline">
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="space-y-3">
        {promotions.map((promo) => (
          <div key={promo.id} className="store-card p-4 flex flex-wrap justify-between gap-3">
            <div>
              <p className="font-bold text-store-yellow">{formatDateLabel(promo.dateKey)}</p>
              <p className="text-xs text-store-muted">{promo.dateKey}</p>
              <p className="text-sm text-store-muted mt-1">
                {promo.shoes.map((s) => s.name).join(", ") || "No shoes"}
              </p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => handleEdit(promo)} className="btn-store-outline text-sm py-2 px-4">
                Edit
              </button>
              <button
                onClick={() => handleDelete(promo.id)}
                className="text-sm py-2 px-4 text-red-400 border border-red-400/30 rounded-full"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPromotions;
