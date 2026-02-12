"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useStore } from "../../../lib/store";
import { Role, DoctorStatus } from "../../../lib/types";
import {
  LogIn,
  Lock,
  Mail,
  AlertTriangle,
  ShieldCheck,
  Clock,
} from "lucide-react";

export default function DoctorLogin() {
  const router = useRouter();
  const { setCurrentUser, users, getDoctorByUserId } = useStore();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<DoctorStatus | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setStatus(null);

    // Simulation of network delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    try {
      const normalizedEmail = email.toLowerCase().trim();

      // 1. Check Hardcoded Doctor (Dr. Emily)
      if (
        (normalizedEmail === "emily@hospital" ||
          normalizedEmail === "emily@hospital.com") &&
        password === "1234567890"
      ) {
        setCurrentUser({
          id: "doctor-1",
          email: normalizedEmail,
          role: Role.DOCTOR,
          name: "Dr. Emily",
        });
        router.push("/doctor/dashboard");
        return;
      }

      // 2. Check Dynamic Users from Store
      const foundUser = users.find(
        (u) =>
          u.email.toLowerCase() === normalizedEmail && u.role === Role.DOCTOR
      );

      if (foundUser) {
        // Check password (for simplicity, we assume password matches if it exists in user object)
        // or validate against what was stored during signup
        if (foundUser.password && foundUser.password !== password) {
          throw new Error("Invalid password");
        }

        const doctorProfile = getDoctorByUserId(foundUser.id);

        if (!doctorProfile) {
          throw new Error("Doctor profile not found");
        }

        if (doctorProfile.status === DoctorStatus.PENDING) {
          setStatus(DoctorStatus.PENDING);
          throw new Error("Your registration is still pending approval.");
        }

        if (doctorProfile.status === DoctorStatus.REJECTED) {
          setStatus(DoctorStatus.REJECTED);
          throw new Error("Your registration request has been declined.");
        }

        if (doctorProfile.status === DoctorStatus.APPROVED) {
          setCurrentUser(foundUser);
          router.push("/doctor/dashboard");
          return;
        }
      }

      throw new Error("Invalid doctor credentials");
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
          <div
            className={`mb-6 p-4 rounded-xl border flex items-start gap-3 ${
              status === DoctorStatus.PENDING
                ? "bg-amber-50 text-amber-700 border-amber-100"
                : "bg-red-50 text-red-700 border-red-100"
            }`}
          >
            {status === DoctorStatus.PENDING ? (
              <Clock className="w-5 h-5 shrink-0" />
            ) : (
              <AlertTriangle className="w-5 h-5 shrink-0" />
            )}
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
              type="text"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="emily@hospital"
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
