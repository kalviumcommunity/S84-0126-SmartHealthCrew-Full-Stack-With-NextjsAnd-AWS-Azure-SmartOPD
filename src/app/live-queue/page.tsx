/* eslint-disable prettier/prettier */
"use client";

import { useState, useEffect } from "react";
import { TokenStatus, AppState, QueueToken } from "@/lib/types";
import { SEED_DOCTORS } from "@/lib/constants";
import Link from "next/link";

interface ApiPatient {
  id: number;
  name: string;
  phone: string;
  token: number;
  status: string;
  createdAt: string;
}

export default function LiveQueue() {
  const [db, setDb] = useState<AppState>({
    doctors: SEED_DOCTORS,
    tokens: [],
  });
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQueueData = async () => {
      try {
        const res = await fetch("/api/admin/patients");

        if (res.status === 401) {
          setError("Unauthorized. This display requires Admin access.");
          return;
        }

        if (!res.ok) throw new Error("Failed to fetch");

        const data = await res.json();

        if (data.success) {
          setError(null);
          const mappedTokens: QueueToken[] = data.patients.map(
            (p: ApiPatient) => ({
              id: String(p.id),
              // Distribute patients to doctors using token number for stability
              // Use token number to ensure consistent doctor assignment
              doctorId: SEED_DOCTORS[p.token % SEED_DOCTORS.length].id,
              tokenNumber: p.token,
              patientName: p.name,
              patientPhone: p.phone,
              status: (p.status as TokenStatus) || TokenStatus.WAITING,
              createdAt: p.createdAt
                ? new Date(p.createdAt).getTime()
                : Date.now(),
            })
          );

          setDb({
            doctors: SEED_DOCTORS,
            tokens: mappedTokens,
          });
          setLastUpdated(new Date());
        }
      } catch (error) {
        console.error("Error fetching live queue:", error);
      }
    };

    // Initial fetch
    fetchQueueData();

    const interval = setInterval(fetchQueueData, 3000);

    return () => clearInterval(interval);
  }, []);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50">
        <div className="text-center p-8 bg-white rounded-2xl shadow-xl border border-slate-100 max-w-md">
          <div className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
            🔒
          </div>
          <h1 className="text-2xl font-black text-slate-800 mb-2">
            Access Restricted
          </h1>
          <p className="text-slate-500 mb-6">{error}</p>
          <Link
            href="/doctor/login"
            className="inline-flex items-center justify-center px-6 py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-colors w-full"
          >
            Login as Doctor/Admin
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen py-16 px-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-end mb-16">
          <div>
            <span className="text-green-500 font-black text-xs uppercase tracking-widest mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              Live Broadcast
            </span>
            <h1 className="text-5xl font-black text-slate-900 tracking-tighter">
              Current Serving Status
            </h1>
          </div>
          <div className="text-right">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              Last Update
            </p>
            <p className="font-bold text-slate-800">
              {lastUpdated.toLocaleTimeString()}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-10">
          {db.doctors.map((doc) => {
            const serving = db.tokens.find(
              (t) => t.doctorId === doc.id && t.status === TokenStatus.SERVING
            );

            const waiting = db.tokens.filter(
              (t) => t.doctorId === doc.id && t.status === TokenStatus.WAITING
            ).length;

            return (
              <div
                key={doc.id}
                className="bg-white rounded-[50px] p-10 shadow-xl border border-slate-100 flex flex-col items-center text-center"
              >
                <div className="w-20 h-20 bg-blue-100 rounded-3xl flex items-center justify-center text-3xl mb-6 shadow-inner">
                  🩺
                </div>

                <h3 className="text-xl font-black text-slate-800 mb-1">
                  {doc.name}
                </h3>
                <p className="text-xs text-slate-400 font-black uppercase tracking-widest mb-10">
                  {doc.department}
                </p>

                <div className="w-full bg-slate-50 rounded-[40px] p-8 mb-8">
                  <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">
                    Now Serving
                  </p>
                  <p className="text-8xl font-black text-blue-600 token-font">
                    {serving?.tokenNumber || "--"}
                  </p>
                </div>

                <div className="flex justify-between w-full px-4">
                  <div>
                    <p className="text-2xl font-black text-slate-800">
                      {waiting}
                    </p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      In Queue
                    </p>
                  </div>

                  <div className="h-10 w-px bg-slate-100"></div>

                  <div>
                    <p className="text-2xl font-black text-slate-800">
                      ~{waiting * doc.avgTimePerPatient}m
                    </p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      Estimated Wait
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
