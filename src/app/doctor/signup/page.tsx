"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useStore } from "@/lib/store";
import { DEPARTMENTS } from "@/lib/types";
import {
  Stethoscope,
  FileText,
  Award,
  Lock,
  Mail,
  User,
  ChevronRight,
} from "lucide-react";

export default function DoctorSignup() {
  const router = useRouter();
  const { registerDoctor } = useStore();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    department: DEPARTMENTS[0],
    licenseNo: "",
    experience: "",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    registerDoctor({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      department: formData.department,
      licenseNo: formData.licenseNo,
      experience: parseInt(formData.experience, 10),
      url: "",
    });

    alert(
      "Signup request submitted! Your account is under review by the administrator."
    );

    router.push("/doctor/login");
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
        <div className="bg-indigo-600 p-8 text-white">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Stethoscope className="w-7 h-7" />
            Doctor Onboarding
          </h2>
          <p className="text-indigo-100 mt-2">
            Join our digital OPD network and manage your patient queue
            efficiently
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-1">
                <User className="w-4 h-4" /> Full Name
              </label>
              <input
                required
                type="text"
                placeholder="Dr. Emily Smith"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-1">
                <Mail className="w-4 h-4" /> Email Address
              </label>
              <input
                required
                type="email"
                placeholder="emily@hospital.com"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">
                Department
              </label>
              <select
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none"
                value={formData.department}
                onChange={(e) =>
                  setFormData({ ...formData, department: e.target.value })
                }
              >
                {DEPARTMENTS.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-1">
                <FileText className="w-4 h-4" /> License Number
              </label>
              <input
                required
                type="text"
                placeholder="MED-123456"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none"
                value={formData.licenseNo}
                onChange={(e) =>
                  setFormData({ ...formData, licenseNo: e.target.value })
                }
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-1">
                <Award className="w-4 h-4" /> Years of Experience
              </label>
              <input
                required
                type="number"
                placeholder="5"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none"
                value={formData.experience}
                onChange={(e) =>
                  setFormData({ ...formData, experience: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-1">
                <Lock className="w-4 h-4" /> Create Password
              </label>
              <input
                required
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-indigo-700 transition shadow-lg flex items-center justify-center gap-2"
          >
            Submit for Approval <ChevronRight className="w-5 h-5" />
          </button>

          <p className="text-center text-gray-500 text-sm">
            Already have an account?{" "}
            <Link
              href="/doctor/login"
              className="text-indigo-600 font-bold hover:underline"
            >
              Login here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
