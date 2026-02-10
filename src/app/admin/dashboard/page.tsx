/* eslint-disable prettier/prettier */
"use client";

import { useState } from "react";
import { useStore } from "@/lib/store";
import { DoctorStatus, TokenStatus } from "@/lib/types";
import { Check, X, Activity, Users, Stethoscope, Clock } from "lucide-react";

export default function AdminDashboard() {
  const { doctors, tokens, approveDoctor, rejectDoctor, toggleDoctorActive } =
    useStore();

  const [activeTab, setActiveTab] = useState<
    "approvals" | "doctors" | "queues"
  >("approvals");

  const pendingDoctors = doctors.filter(
    (d) => d.status === DoctorStatus.PENDING
  );

  const totalPatients = tokens.length;
  const waitingPatients = tokens.filter(
    (t) => t.status === TokenStatus.WAITING
  ).length;

  const servingPatients = tokens.filter(
    (t) => t.status === TokenStatus.CALLED
  ).length;

  const activeDoctors = doctors.filter(
    (d) => d.status === DoctorStatus.APPROVED && !d.isQueuePaused
  ).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <header className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900">
          Hospital Administration
        </h1>
        <p className="text-gray-500">
          System oversight, doctor approvals, and live hospital stats.
        </p>
      </header>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {[
          {
            icon: <Users className="w-6 h-6" />,
            label: "Total Tokens",
            val: totalPatients,
            color: "text-blue-600",
            bg: "bg-blue-50",
          },
          {
            icon: <Clock className="w-6 h-6" />,
            label: "Waiting",
            val: waitingPatients,
            color: "text-yellow-600",
            bg: "bg-yellow-50",
          },
          {
            icon: <Activity className="w-6 h-6" />,
            label: "Being Served",
            val: servingPatients,
            color: "text-green-600",
            bg: "bg-green-50",
          },
          {
            icon: <Stethoscope className="w-6 h-6" />,
            label: "Active Doctors",
            val: activeDoctors,
            color: "text-purple-600",
            bg: "bg-purple-50",
          },
        ].map((stat, i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
          >
            <div
              className={`${stat.bg} ${stat.color} w-10 h-10 rounded-lg flex items-center justify-center mb-4`}
            >
              {stat.icon}
            </div>
            <p className="text-gray-500 text-xs font-bold uppercase mb-1">
              {stat.label}
            </p>
            <p className="text-2xl font-black text-gray-900">{stat.val}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-8 overflow-x-auto">
        {[
          { key: "approvals", label: "Doctor Approvals" },
          { key: "doctors", label: "Doctor Management" },
          { key: "queues", label: "Live Queues" },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() =>
              setActiveTab(tab.key as "approvals" | "doctors" | "queues")
            }
            className={`px-6 py-4 font-bold text-sm border-b-2 transition ${
              activeTab === tab.key
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-400"
            }`}
          >
            {tab.label}
            {tab.key === "approvals" && pendingDoctors.length > 0 && (
              <span className="ml-2 bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full">
                {pendingDoctors.length}
              </span>
            )}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Approvals */}
        {activeTab === "approvals" && (
          <table className="w-full">
            <thead className="bg-gray-50 text-xs uppercase text-gray-500 font-bold">
              <tr>
                <th className="px-6 py-4">Doctor</th>
                <th className="px-6 py-4">Department</th>
                <th className="px-6 py-4">License / Exp</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {pendingDoctors.length ? (
                pendingDoctors.map((doc) => (
                  <tr key={doc.id}>
                    <td className="px-6 py-4">
                      <p className="font-bold">Dr. {doc.name}</p>
                      <p className="text-xs text-gray-500">{doc.email}</p>
                    </td>
                    <td className="px-6 py-4">{doc.department}</td>
                    <td className="px-6 py-4">
                      <p>{doc.licenseNo}</p>
                      <p className="text-xs text-gray-500">
                        {doc.experience} years
                      </p>
                    </td>
                    <td className="px-6 py-4 text-right flex gap-2 justify-end">
                      <button
                        onClick={() => approveDoctor(doc.id)}
                        className="p-2 bg-green-100 text-green-700 rounded-lg"
                      >
                        <Check className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => rejectDoctor(doc.id)}
                        className="p-2 bg-red-100 text-red-700 rounded-lg"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="py-12 text-center text-gray-400">
                    No pending approvals
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}

        {/* Doctor Management */}
        {activeTab === "doctors" && (
          <table className="w-full">
            <thead className="bg-gray-50 text-xs uppercase text-gray-500 font-bold">
              <tr>
                <th className="px-6 py-4">Doctor</th>
                <th className="px-6 py-4">Department</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Queue</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {doctors
                .filter((d) => d.status !== DoctorStatus.PENDING)
                .map((doc) => (
                  <tr key={doc.id}>
                    <td className="px-6 py-4">
                      <p className="font-bold">Dr. {doc.name}</p>
                      <p className="text-xs text-gray-500">{doc.email}</p>
                    </td>
                    <td className="px-6 py-4">{doc.department}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 text-[10px] rounded-full font-bold ${
                          doc.status === DoctorStatus.APPROVED
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {doc.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => toggleDoctorActive(doc.id)}
                        className={`px-4 py-2 rounded-lg font-bold text-sm ${
                          doc.isQueuePaused
                            ? "bg-orange-100 text-orange-600"
                            : "bg-green-100 text-green-600"
                        }`}
                      >
                        {doc.isQueuePaused ? "Paused" : "Active"}
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}

        {/* Live Queues */}
        {activeTab === "queues" && (
          <div className="p-8 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {doctors
              .filter((d) => d.status === DoctorStatus.APPROVED)
              .map((doc) => {
                const deptTokens = tokens.filter(
                  (t) => t.department === doc.department
                );
                const current = deptTokens.find(
                  (t) => t.status === TokenStatus.CALLED
                );
                const waiting = deptTokens.filter(
                  (t) => t.status === TokenStatus.WAITING
                ).length;

                return (
                  <div
                    key={doc.id}
                    className="bg-gray-50 p-6 rounded-2xl border"
                  >
                    <p className="font-bold">Dr. {doc.name}</p>
                    <p className="text-xs uppercase text-gray-500 mb-4">
                      {doc.department}
                    </p>

                    <div className="flex justify-between mb-2">
                      <span className="text-xs text-gray-400">Now Serving</span>
                      <span className="font-black text-blue-600">
                        {current?.tokenNumber || "---"}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-xs text-gray-400">Waiting</span>
                      <span className="font-black">{waiting}</span>
                    </div>
                  </div>
                );
              })}
          </div>
        )}
      </div>
    </div>
  );
}
