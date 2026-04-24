"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginForm() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        router.push("/admin/dashboard");
        router.refresh();
      } else {
        setError("Invalid credentials.");
      }
    } catch {
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-sm px-8">
      <div className="mb-12 text-center">
        <h1 className="font-headline-lg text-headline-lg text-on-background uppercase tracking-widest">
          Admin
        </h1>
        <p className="font-label-sm text-label-sm text-on-surface-variant mt-4 uppercase tracking-widest">
          Enter your credentials to continue
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-8">
        <div>
          <label
            className="font-label-sm text-label-sm text-on-surface uppercase tracking-widest block mb-2"
            htmlFor="admin-password"
          >
            Password
          </label>
          <input
            id="admin-password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full bg-transparent border-0 border-b border-outline-variant px-0 py-2 font-body-md text-body-md text-on-surface focus:ring-0 focus:border-primary transition-colors placeholder:text-on-surface-variant/40"
          />
        </div>

        {error && (
          <p className="font-label-sm text-label-sm text-error">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className={`w-full h-14 rounded-lg flex items-center justify-center gap-2 transition-opacity ${
            loading
              ? "bg-surface-dim text-on-surface cursor-not-allowed"
              : "bg-primary text-on-primary hover:opacity-90 active:scale-[0.98]"
          }`}
        >
          <span className="font-label-sm text-label-sm uppercase tracking-widest">
            {loading ? "Signing in..." : "Sign In"}
          </span>
        </button>
      </form>
    </div>
  );
}
