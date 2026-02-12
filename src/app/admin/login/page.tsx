/* eslint-disable prettier/prettier */
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "../../../lib/store";
import { Role } from "../../../lib/types";
import { ShieldCheck, Lock, Mail, AlertTriangle } from "lucide-react";

export default function AdminLogin() {
  const router = useRouter();
  const { setCurrentUser } = useStore();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Simulation of network delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    try {
      // Hardcoded Admin Credentials Check
      const normalizedEmail = email.toLowerCase().trim();
      if (normalizedEmail === "admin@hospital.com" && password === "admin123") {
        setCurrentUser({
          id: "admin-1",
          email: "admin@hospital.com",
          role: Role.ADMIN,
          name: "Super Admin",
        });
        router.push("/admin/dashboard");
        return;
      }

      throw new Error("Invalid admin credentials");
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-20">
      <div className="bg-slate-100 rounded-3xl shadow-2xl p-8 text-slate-900">
        <div className="text-center mb-10">
          <div className="bg-blue-600/20 text-blue-400 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border border-blue-600/30">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold">Administrator Login</h2>
          <p className="text-slate-400 text-sm mt-1">
            System oversight & access control
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 text-red-400 rounded-xl border border-red-500/20 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 shrink-0" />
            <p className="text-sm font-medium">{error}</p>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-300 flex items-center gap-1">
              <Mail className="w-4 h-4" /> Admin Email
            </label>
            <input
              required
              type="text"
              className="w-full px-4 py-3 bg-slate-100 rounded-xl border border-slate-700 focus:ring-2 focus:ring-blue-500 outline-none text-slate-900 placeholder-slate-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@hospital.com"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-300 flex items-center gap-1">
              <Lock className="w-4 h-4" /> Password
            </label>
            <input
              required
              type="password"
              className="w-full px-4 py-3 bg-slate-100 rounded-xl border border-slate-700 focus:ring-2 focus:ring-blue-500 outline-none text-slate-900 placeholder-slate-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
            <p className="text-[10px] text-slate-500">
              Hint: Use <code>admin123</code> for MVP testing
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Authenticating..." : "Access Dashboard"}
          </button>
        </form>
      </div>
    </div>
  );
}
