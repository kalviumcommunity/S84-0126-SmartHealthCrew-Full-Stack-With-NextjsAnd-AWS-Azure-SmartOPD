"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useStore } from "../../../lib/store";
import { LogIn, Lock, Mail, AlertTriangle, ShieldCheck } from "lucide-react";

export default function DoctorLogin() {
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

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      let data;
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      } else {
        const text = await response.text();
        console.error("Non-JSON response:", text);
        throw new Error(
          `Server error: ${response.status} ${response.statusText}`
        );
      }

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      // Set current user in store for UI purposes
      setCurrentUser({
        id: data.admin.id,
        email: data.admin.email,
        role: data.admin.role,
        name: data.admin.email.split("@")[0], // Fallback name
      });

      router.push("/doctor/dashboard");
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
      <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
        <div className="text-center mb-10">
          <div className="bg-indigo-100 text-indigo-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <LogIn className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Doctor Login</h2>
          <p className="text-gray-500 text-sm">
            Manage your OPD patients and queue
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-xl border border-red-100 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 shrink-0" />
            <p className="text-sm font-medium">{error}</p>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 flex items-center gap-1">
              <Mail className="w-4 h-4" /> Email
            </label>
            <input
              required
              type="email"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="doctor@hospital.com"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 flex items-center gap-1">
              <Lock className="w-4 h-4" /> Password
            </label>
            <input
              required
              type="password"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-indigo-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-indigo-700 transition shadow-lg flex items-center justify-center gap-2 ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Signing in...
              </>
            ) : (
              "Login"
            )}
          </button>

          <div className="pt-6 border-t border-gray-100 text-center">
            <p className="text-gray-500 text-sm">
              New to SmartOPD?{" "}
              <Link
                href="/doctor/signup"
                className="text-indigo-600 font-bold hover:underline"
              >
                Apply here
              </Link>
            </p>
          </div>
        </form>
      </div>

      <div className="mt-8 flex items-center justify-center gap-2 text-gray-400 text-sm">
        <ShieldCheck className="w-4 h-4" />
        Secure access for medical professionals only
      </div>
    </div>
  );
}
