import React, { useEffect, useState } from "react";
import { api } from "../../api/client";
import { applyStoreBranding } from "../../utils/branding";
import AdminImageField from "./AdminImageField";
import AdminImageGallery from "./AdminImageGallery";

const defaultHero = {
  label: "Summer Collection 2026",
  badgeTitle: "New Arrival",
  badgeSubtitle: "Daily promotions",
  images: [],
  intervalMs: 4000,
};

const AdminCompany = () => {
  const [form, setForm] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    api.getCompany().then((data) => {
      setForm({
        ...data,
        hero: { ...defaultHero, ...(data.hero || {}) },
      });
    }).catch((e) => setMessage(e.message));
  }, []);

  if (!form) {
    return <p className="text-store-muted">Loading company info...</p>;
  }

  const hero = form.hero || defaultHero;

  const update = (path, value) => {
    setForm((prev) => {
      const next = { ...prev };
      if (path.includes(".")) {
        const [a, b] = path.split(".");
        next[a] = { ...next[a], [b]: value };
      } else {
        next[path] = value;
      }
      return next;
    });
  };

  const updateHero = (field, value) => {
    setForm((prev) => ({
      ...prev,
      hero: { ...defaultHero, ...(prev.hero || {}), [field]: value },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const payload = {
        name: form.name,
        tagline: form.tagline,
        description: form.description,
        logo: form.logo || "",
        founded: form.founded,
        location: form.location,
        contact: form.contact,
        hours: form.hours,
        highlights: form.highlights,
        hero: {
          label: hero.label || "",
          badgeTitle: hero.badgeTitle || "",
          badgeSubtitle: hero.badgeSubtitle || "",
          images: hero.images || [],
          intervalMs: Number(hero.intervalMs) || 4000,
        },
      };
      await api.updateCompany(payload);
      applyStoreBranding(payload);
      setMessage("Company info saved successfully");
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Company Information</h1>
      {message && <p className="mb-4 text-sm text-store-yellow">{message}</p>}

      <form onSubmit={handleSubmit} className="space-y-8 max-w-3xl">
        <div className="store-card p-6 space-y-4">
          <h2 className="text-lg font-bold text-store-yellow">Branding</h2>
          <AdminImageField
            label="Store Logo"
            value={form.logo || ""}
            onChange={(logo) => update("logo", logo)}
            hint="Shown in the navbar and footer. Paste a URL or upload a PNG/SVG."
          />
          <input
            placeholder="Store Name"
            value={form.name || ""}
            onChange={(e) => update("name", e.target.value)}
            className="admin-input"
          />
          <input
            placeholder="Tagline"
            value={form.tagline || ""}
            onChange={(e) => update("tagline", e.target.value)}
            className="admin-input"
          />
          <textarea
            placeholder="Description (also shown in hero)"
            value={form.description || ""}
            onChange={(e) => update("description", e.target.value)}
            className="admin-input min-h-[100px]"
          />
        </div>

        <div className="store-card p-6 space-y-4">
          <h2 className="text-lg font-bold text-store-yellow">Homepage Hero</h2>
          <p className="text-sm text-store-muted">
            Control the animated shoe carousel on the homepage. Add multiple images — they rotate automatically.
          </p>
          <input
            placeholder="Hero label (e.g. Summer Collection 2026)"
            value={hero.label || ""}
            onChange={(e) => updateHero("label", e.target.value)}
            className="admin-input"
          />
          <div className="grid sm:grid-cols-2 gap-4">
            <input
              placeholder="Badge title (e.g. New Arrival)"
              value={hero.badgeTitle || ""}
              onChange={(e) => updateHero("badgeTitle", e.target.value)}
              className="admin-input"
            />
            <input
              placeholder="Badge subtitle (e.g. Daily promotions)"
              value={hero.badgeSubtitle || ""}
              onChange={(e) => updateHero("badgeSubtitle", e.target.value)}
              className="admin-input"
            />
          </div>
          <div>
            <label className="block text-sm text-store-muted mb-1">
              Slide speed: {Math.round((hero.intervalMs || 4000) / 1000)}s
            </label>
            <input
              type="range"
              min={2000}
              max={8000}
              step={500}
              value={hero.intervalMs || 4000}
              onChange={(e) => updateHero("intervalMs", Number(e.target.value))}
              className="w-full accent-store-yellow"
            />
          </div>
          <AdminImageGallery
            label="Hero carousel images"
            images={hero.images || []}
            onChange={(images) => updateHero("images", images)}
          />
        </div>

        <div className="store-card p-6 space-y-4">
          <h2 className="text-lg font-bold text-store-yellow">Contact & Location</h2>
          <input
            placeholder="Address"
            value={form.location?.address || ""}
            onChange={(e) => update("location.address", e.target.value)}
            className="admin-input"
          />
          <div className="grid sm:grid-cols-2 gap-4">
            <input
              placeholder="City"
              value={form.location?.city || ""}
              onChange={(e) => update("location.city", e.target.value)}
              className="admin-input"
            />
            <input
              placeholder="Country"
              value={form.location?.country || ""}
              onChange={(e) => update("location.country", e.target.value)}
              className="admin-input"
            />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <input
              placeholder="Phone"
              value={form.contact?.phone || ""}
              onChange={(e) => update("contact.phone", e.target.value)}
              className="admin-input"
            />
            <input
              placeholder="WhatsApp number (no +)"
              value={form.contact?.whatsapp || ""}
              onChange={(e) => update("contact.whatsapp", e.target.value)}
              className="admin-input"
            />
          </div>
          <input
            placeholder="Email"
            value={form.contact?.email || ""}
            onChange={(e) => update("contact.email", e.target.value)}
            className="admin-input"
          />
          <textarea
            placeholder="Highlights (one per line)"
            value={(form.highlights || []).join("\n")}
            onChange={(e) => update("highlights", e.target.value.split("\n").filter(Boolean))}
            className="admin-input min-h-[80px]"
          />
        </div>

        <button type="submit" className="btn-store-primary">
          Save Company Info
        </button>
      </form>
    </div>
  );
};

export default AdminCompany;
