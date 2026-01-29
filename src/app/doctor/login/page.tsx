/* eslint-disable prettier/prettier */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const DoctorLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        localStorage.setItem("logged_doctor_id", data.admin.id.toString());
        router.push("/doctor/dashboard");
      } else {
        alert(data.message || "Invalid credentials");
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-slate-50/50 flex items-center justify-center py-20 px-6">
      <div className="max-w-md w-full">
        <div className="premium-card p-10 md:p-14 bg-white">
          <div className="mb-10">
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
              Staff Access
            </h1>
            <p className="text-sm text-slate-400 font-medium">
              Internal Hospital Information System Login
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-8">
            <div className="space-y-2">
              <label className="section-label">Institutional Email</label>
              <div className="premium-input flex items-center gap-3 px-4">
                <span className="text-slate-300 text-lg">✉</span>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@hospital.com"
                  className="bg-transparent outline-none w-full font-semibold"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="section-label">Security Credentials</label>
                <button
                  type="button"
                  className="text-[10px] font-bold text-sky-500 uppercase tracking-widest hover:underline"
                >
                  Reset
                </button>
              </div>
              <div className="premium-input flex items-center gap-3 px-4">
                <span className="text-slate-300 text-lg">🔒</span>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="bg-transparent outline-none w-full font-semibold"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="btn-premium w-full"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>VERIFYING...</span>
                  </>
                ) : (
                  <>
                    <span>SIGN IN TO PORTAL</span>
                    <span className="text-xl">→</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Helper for demo users */}
          <div className="mt-10 pt-8 border-t border-slate-50">
            <div className="bg-slate-50/80 rounded-2xl p-4 border border-slate-100">
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-2 text-center">
                Development Sandbox Credentials
              </p>
              <div className="flex justify-between items-center text-[11px]">
                <span className="text-slate-500">ramesh@hospital.com</span>
                <span className="bg-white px-2 py-0.5 rounded border border-slate-100 font-mono text-slate-400">
                  password
                </span>
              </div>
            </div>
          </div>
        </div>

        <p className="text-center text-[10px] text-slate-400 mt-10 font-bold uppercase tracking-[0.2em]">
          Authorized Personnel Only • Secure 256-Bit Encryption
        </p>
      </div>
    </div>
  );
};

export default DoctorLogin;
