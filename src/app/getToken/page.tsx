/* eslint-disable prettier/prettier */
"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useStore } from "../../lib/store";
import { DEPARTMENTS } from "../../lib/types";
import {
  UserPlus,
  User,
  Phone,
  MapPin,
  Activity,
  ChevronRight,
} from "lucide-react";

const PatientJoinForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { addToken, doctors } = useStore();

  const initialDept = searchParams.get("dept");
  const defaultDept =
    initialDept && (DEPARTMENTS as readonly string[]).includes(initialDept)
      ? initialDept
      : DEPARTMENTS[0];

  const [formData, setFormData] = useState({
    patientName: "",
    age: "",
    gender: "Male",
    phone: "",
    symptoms: "",
    department: defaultDept,
    preferredDoctorId: "",
  });

  useEffect(() => {
    const dept = searchParams.get("dept");
    if (dept && (DEPARTMENTS as readonly string[]).includes(dept)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFormData((prev) => {
        if (prev.department === dept) return prev;
        return { ...prev, department: dept };
      });
    }
  }, [searchParams]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const tokenId = addToken({
      patientName: formData.patientName,
      age: parseInt(formData.age),
      gender: formData.gender,
      phone: formData.phone,
      symptoms: formData.symptoms,
      department: formData.department,
      preferredDoctorId: formData.preferredDoctorId || undefined,
    });

    router.push(`/status/${tokenId}`);
  };

  const filteredDoctors = doctors.filter(
    (d: { department: unknown; status: string }) =>
      d.department === formData.department && d.status === "APPROVED"
  );

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
        <div className="bg-blue-600 p-8 text-white">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <UserPlus className="w-7 h-7" />
            Join the OPD Queue
          </h2>
          <p className="text-blue-100 mt-2">
            Enter your details to generate a digital token
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
                placeholder="John Doe"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
                value={formData.patientName}
                onChange={(e) =>
                  setFormData({ ...formData, patientName: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-1">
                <Activity className="w-4 h-4" /> Age
              </label>
              <input
                required
                type="number"
                placeholder="25"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
                value={formData.age}
                onChange={(e) =>
                  setFormData({ ...formData, age: e.target.value })
                }
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">
                Gender
              </label>
              <select
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
                value={formData.gender}
                onChange={(e) =>
                  setFormData({ ...formData, gender: e.target.value })
                }
              >
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-1">
                <Phone className="w-4 h-4" /> Phone Number
              </label>
              <input
                required
                type="tel"
                placeholder="10-digit number"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 flex items-center gap-1">
              <MapPin className="w-4 h-4" /> Department
            </label>
            <select
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
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

          {filteredDoctors.length > 0 && (
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">
                Preferred Doctor (Optional)
              </label>
              <select
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
                value={formData.preferredDoctorId}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    preferredDoctorId: e.target.value,
                  })
                }
              >
                <option value="">Any Available Doctor</option>
                {filteredDoctors.map((doc) => (
                  <option key={doc.id} value={doc.id}>
                    Dr. {doc.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">
              Symptoms / Reason for Visit
            </label>
            <textarea
              required
              placeholder="Tell us briefly why you're visiting today..."
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none h-32"
              value={formData.symptoms}
              onChange={(e) =>
                setFormData({ ...formData, symptoms: e.target.value })
              }
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition flex items-center justify-center gap-2 shadow-lg shadow-blue-100"
          >
            Generate Token <ChevronRight className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
};

const PatientJoin = () => {
  return (
    <Suspense fallback={<div className="p-20 text-center">Loading...</div>}>
      <PatientJoinForm />
    </Suspense>
  );
};

export default PatientJoin;
