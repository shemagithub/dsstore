import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAdminAuth } from "../../context/AdminAuthContext";

const AdminLogin = () => {
  const { login, isAuthenticated, loading } = useAdminAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (loading) return null;
  if (isAuthenticated) return <Navigate to="/admin" replace />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await login(email, password);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-store-black flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="store-card w-full max-w-md p-8"
      >
        <p className="text-store-yellow font-bold text-xl mb-1">Didier Admin</p>
        <p className="text-store-muted text-sm mb-8">Sign in to manage your store</p>

        {error && (
          <p className="mb-4 text-sm text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg px-3 py-2">
            {error}
          </p>
        )}

        <label className="block text-sm text-store-muted mb-1">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 px-4 py-3 rounded-lg bg-black border border-store-border text-white focus:border-store-yellow outline-none"
          required
        />

        <label className="block text-sm text-store-muted mb-1">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-6 px-4 py-3 rounded-lg bg-black border border-store-border text-white focus:border-store-yellow outline-none"
          required
        />

        <button type="submit" disabled={submitting} className="btn-store-primary w-full">
          {submitting ? "Signing in..." : "Sign In"}
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
