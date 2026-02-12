"use client";

import { useStore } from "../../../lib/store";
import { TokenStatus } from "../../../lib/types";
import {
  Users,
  Play,
  CheckCircle,
  Pause,
  PlayCircle,
  Clock,
  Stethoscope,
  AlertCircle,
  TrendingUp,
  Activity,
  Calendar,
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

  // Analytics Data (Mocked for UI)
  const analytics = [
    {
      label: "Today's Revenue",
      value: `$${completedCount * 500}`,
      trend: "+12%",
      color: "emerald",
    },
    { label: "Satisfaction", value: "98%", trend: "+2.4%", color: "blue" },
    {
      label: "Consultation Rate",
      value: "4.2/hr",
      trend: "-5%",
      color: "orange",
    },
  ];

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
    <div className="min-h-screen bg-slate-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="px-3 py-1 bg-sky-100 text-sky-700 text-xs font-black uppercase tracking-widest rounded-full">
                {doctor.department}
              </span>
              <span className="text-slate-400">•</span>
              <span className="text-slate-500 text-sm font-medium flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {new Date().toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">
              Welcome, Dr. {doctor.name.split(" ")[0]}
            </h1>
          </div>

          <div className="flex gap-4 w-full md:w-auto">
            <button
              onClick={() => pauseDoctorQueue(doctor.id, !doctor.isQueuePaused)}
              className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-4 rounded-2xl font-black transition-all duration-300 shadow-sm border ${
                doctor.isQueuePaused
                  ? "bg-emerald-50 text-emerald-700 border-emerald-100 hover:bg-emerald-100"
                  : "bg-orange-50 text-orange-700 border-orange-100 hover:bg-orange-100"
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
              className="flex-1 md:flex-none flex items-center justify-center gap-2 px-8 py-4 bg-slate-900 text-white rounded-2xl font-black hover:bg-slate-800 transition-all duration-300 disabled:opacity-30 shadow-xl shadow-slate-200"
            >
              <Play className="w-5 h-5 fill-current" />
              Call Next
            </button>
          </div>
        </header>

        {/* Analytics Widgets */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm">
            <div className="w-12 h-12 bg-sky-50 text-sky-600 rounded-2xl flex items-center justify-center mb-6">
              <Users className="w-6 h-6" />
            </div>
            <p className="text-slate-500 text-sm font-bold uppercase tracking-wider mb-1">
              Waiting
            </p>
            <div className="flex items-end gap-3">
              <p className="text-4xl font-black text-slate-900">
                {queue.length}
              </p>
              <span className="text-emerald-500 text-sm font-bold mb-1 flex items-center gap-0.5">
                <TrendingUp className="w-4 h-4" /> 5%
              </span>
            </div>
          </div>

          {analytics.map((item, idx) => (
            <div
              key={idx}
              className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm"
            >
              <div
                className={`w-12 h-12 bg-${item.color}-50 text-${item.color}-600 rounded-2xl flex items-center justify-center mb-6`}
              >
                <Activity className="w-6 h-6" />
              </div>
              <p className="text-slate-500 text-sm font-bold uppercase tracking-wider mb-1">
                {item.label}
              </p>
              <div className="flex items-end gap-3">
                <p className="text-4xl font-black text-slate-900">
                  {item.value}
                </p>
                <span
                  className={`${item.trend.startsWith("+") ? "text-emerald-500" : "text-rose-500"} text-sm font-bold mb-1`}
                >
                  {item.trend}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-10">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-10">
            {/* Current Patient Card */}
            <div className="relative bg-white rounded-[40px] border border-slate-100 shadow-xl shadow-slate-100/50 overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-sky-50 rounded-full -mr-32 -mt-32 -z-0"></div>

              <div className="relative p-10 z-10">
                <div className="flex justify-between items-center mb-10">
                  <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
                    <div className="w-10 h-10 bg-slate-900 text-white rounded-xl flex items-center justify-center">
                      <Stethoscope className="w-5 h-5" />
                    </div>
                    Active Session
                  </h2>
                  {currentPatient && (
                    <span className="px-4 py-2 bg-emerald-50 text-emerald-700 text-xs font-black uppercase tracking-widest rounded-full animate-pulse">
                      Live Now
                    </span>
                  )}
                </div>

                {currentPatient ? (
                  <div className="grid md:grid-cols-2 gap-12">
                    <div>
                      <span className="text-slate-400 text-xs font-black uppercase tracking-[0.2em] block mb-2">
                        Token ID
                      </span>
                      <p className="text-8xl font-black text-slate-900 tracking-tighter mb-8">
                        {currentPatient.tokenNumber}
                      </p>

                      <div className="space-y-1">
                        <p className="text-2xl font-black text-slate-900">
                          {currentPatient.patientName}
                        </p>
                        <p className="text-slate-500 font-bold">
                          {currentPatient.age} Years • {currentPatient.gender}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col justify-between">
                      <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 mb-8">
                        <span className="text-slate-400 text-xs font-black uppercase tracking-widest block mb-3">
                          Reported Symptoms
                        </span>
                        <p className="text-slate-700 font-medium leading-relaxed italic">
                          &quot;{currentPatient.symptoms}&quot;
                        </p>
                      </div>

                      <div className="flex gap-4">
                        <button
                          onClick={() => markComplete(currentPatient.id)}
                          className="flex-[2] bg-emerald-500 text-white py-5 rounded-2xl font-black hover:bg-emerald-600 transition-all duration-300 shadow-lg shadow-emerald-100"
                        >
                          Complete Session
                        </button>
                        <button
                          onClick={() => skipPatient(currentPatient.id)}
                          className="flex-1 bg-slate-50 text-slate-400 py-5 rounded-2xl font-black hover:bg-slate-100 transition-all duration-300"
                        >
                          Skip
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-24">
                    <div className="w-20 h-20 bg-slate-50 text-slate-200 rounded-3xl flex items-center justify-center mx-auto mb-6">
                      <Users className="w-10 h-10" />
                    </div>
                    <p className="text-slate-400 font-bold text-lg">
                      No active patient at the moment
                    </p>
                    <p className="text-slate-300 text-sm">
                      Click &quot;Call Next&quot; to begin consultation
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar Queue */}
          <div className="space-y-8">
            <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden">
              <div className="p-8 border-b border-slate-50 flex justify-between items-center">
                <h3 className="font-black text-slate-900 uppercase tracking-widest text-sm">
                  Waiting List
                </h3>
                <span className="w-8 h-8 bg-slate-50 text-slate-900 rounded-lg flex items-center justify-center text-xs font-black">
                  {queue.length}
                </span>
              </div>

              <div className="divide-y divide-slate-50 max-h-[500px] overflow-y-auto custom-scrollbar">
                {queue.length ? (
                  queue.map((p, idx) => (
                    <div
                      key={p.id}
                      className="p-6 hover:bg-slate-50/50 transition-colors group"
                    >
                      <div className="flex justify-between items-start mb-1">
                        <p className="font-black text-sky-600 text-xl tracking-tighter">
                          #{p.tokenNumber}
                        </p>
                        <span className="text-[10px] font-black text-slate-300 uppercase">
                          {idx === 0 ? "Next Up" : `${idx * 12}m wait`}
                        </span>
                      </div>
                      <p className="font-black text-slate-900 mb-1">
                        {p.patientName}
                      </p>
                      <p className="text-xs text-slate-400 font-bold uppercase tracking-wider line-clamp-1">
                        {p.symptoms}
                      </p>
                    </div>
                  ))
                ) : (
                  <div className="p-16 text-center">
                    <p className="text-slate-300 font-black uppercase tracking-widest text-xs">
                      Empty Queue
                    </p>
                  </div>
                )}
              </div>
            </div>

            {doctor.isQueuePaused && (
              <div className="bg-orange-50 border border-orange-100 p-8 rounded-[32px] flex gap-4">
                <div className="w-10 h-10 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center shrink-0">
                  <AlertCircle className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-orange-900 font-black text-sm uppercase tracking-wider mb-1">
                    Queue Paused
                  </p>
                  <p className="text-orange-700/70 text-sm font-medium leading-tight">
                    New patients are still being registered but will not be
                    notified until you resume.
                  </p>
                </div>
              </div>
            )}
          </div>
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
