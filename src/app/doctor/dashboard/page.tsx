/* eslint-disable prettier/prettier */
"use client";

import { useStore } from "@/lib/store";
import { TokenStatus } from "@/lib/types";
import {
  Users,
  Play,
  CheckCircle,
  Pause,
  PlayCircle,
  Clock,
  Stethoscope,
  AlertCircle,
} from "lucide-react";

export default function DoctorDashboard() {
  const {
    currentUser,
    getDoctorByUserId,
    tokens,
    updateTokenStatus,
    pauseDoctorQueue,
  } = useStore();

  const doctor = currentUser ? getDoctorByUserId(currentUser.id) : null;

  if (!doctor) return null;

  const myTokens = tokens.filter((t) => t.department === doctor.department);

  const queue = myTokens
    .filter((t) => t.status === TokenStatus.WAITING)
    .sort((a, b) => a.createdAt - b.createdAt);

  const currentPatient = myTokens.find((t) => t.status === TokenStatus.CALLED);

  const completedCount = myTokens.filter(
    (t) => t.status === TokenStatus.COMPLETED
  ).length;

  const callNext = () => {
    if (currentPatient) {
      alert("Please complete the current consultation first.");
      return;
    }
    if (queue.length > 0) {
      updateTokenStatus(queue[0].id, TokenStatus.CALLED);
    }
  };

  const markComplete = (id: string) => {
    updateTokenStatus(id, TokenStatus.COMPLETED);
  };

  const skipPatient = (id: string) => {
    updateTokenStatus(id, TokenStatus.MISSED);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between gap-4 mb-10">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            OPD Desk: Dr. {doctor.name}
          </h1>
          <p className="text-gray-500">
            {doctor.department} • {doctor.experience} Years Experience
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => pauseDoctorQueue(doctor.id, !doctor.isQueuePaused)}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition ${
              doctor.isQueuePaused
                ? "bg-green-100 text-green-700"
                : "bg-orange-100 text-orange-700"
            }`}
          >
            {doctor.isQueuePaused ? (
              <PlayCircle className="w-5 h-5" />
            ) : (
              <Pause className="w-5 h-5" />
            )}
            {doctor.isQueuePaused ? "Resume Queue" : "Pause Queue"}
          </button>

          <button
            disabled={doctor.isQueuePaused || queue.length === 0}
            onClick={callNext}
            className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition disabled:opacity-50 shadow-lg"
          >
            <Play className="w-5 h-5" />
            Call Next Patient
          </button>
        </div>
      </header>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left */}
        <div className="lg:col-span-2 space-y-8">
          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-4">
            <Stat icon={<Users />} label="Waiting" value={queue.length} />
            <Stat
              icon={<CheckCircle />}
              label="Completed"
              value={completedCount}
            />
            <Stat icon={<Clock />} label="Avg. Time" value="12m" />
          </div>

          {/* Current Patient */}
          <div className="bg-white rounded-3xl border shadow-xl overflow-hidden">
            <div className="bg-indigo-600 p-6 text-white flex justify-between">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Stethoscope className="w-6 h-6" />
                Current Patient
              </h2>
              {currentPatient && (
                <span className="bg-indigo-400 px-3 py-1 rounded-full text-xs font-bold">
                  In Consultation
                </span>
              )}
            </div>

            <div className="p-8">
              {currentPatient ? (
                <>
                  <p className="text-6xl font-black text-indigo-600 mb-6">
                    {currentPatient.tokenNumber}
                  </p>

                  <div className="space-y-2 mb-6">
                    <p className="font-bold text-xl">
                      {currentPatient.patientName}
                    </p>
                    <p className="text-gray-500">
                      {currentPatient.age}Y • {currentPatient.gender}
                    </p>
                    <p className="bg-gray-50 p-4 rounded-xl border">
                      {currentPatient.symptoms}
                    </p>
                  </div>

                  <div className="flex gap-4">
                    <button
                      onClick={() => markComplete(currentPatient.id)}
                      className="flex-1 bg-green-600 text-white py-4 rounded-xl font-bold hover:bg-green-700"
                    >
                      Complete
                    </button>
                    <button
                      onClick={() => skipPatient(currentPatient.id)}
                      className="px-8 bg-gray-100 text-gray-600 py-4 rounded-xl font-bold"
                    >
                      Skip
                    </button>
                  </div>
                </>
              ) : (
                <div className="text-center py-16 text-gray-400">
                  No patient being served
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border shadow-sm overflow-hidden">
            <div className="p-6 border-b font-bold">
              Upcoming Queue ({queue.length})
            </div>

            <div className="divide-y max-h-[600px] overflow-y-auto">
              {queue.length ? (
                queue.map((p) => (
                  <div key={p.id} className="p-4">
                    <p className="font-black text-indigo-600">
                      {p.tokenNumber}
                    </p>
                    <p className="font-bold">{p.patientName}</p>
                    <p className="text-sm text-gray-500 line-clamp-1">
                      {p.symptoms}
                    </p>
                  </div>
                ))
              ) : (
                <div className="p-10 text-center text-gray-400">
                  Queue empty
                </div>
              )}
            </div>
          </div>

          {doctor.isQueuePaused && (
            <div className="bg-orange-50 border border-orange-100 p-6 rounded-3xl flex gap-3">
              <AlertCircle className="w-6 h-6 text-orange-600" />
              <p className="text-orange-700 text-sm">
                Queue is paused. Patients can join but won’t be called.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Stat({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}) {
  return (
    <div className="bg-white p-6 rounded-2xl border shadow-sm">
      <div className="text-indigo-500 mb-2">{icon}</div>
      <p className="text-xs uppercase text-gray-500 font-bold">{label}</p>
      <p className="text-3xl font-black">{value}</p>
    </div>
  );
}
