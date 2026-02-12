/* eslint-disable prettier/prettier */
"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useStore } from "../../../lib/store";
import { TokenStatus } from "../../../lib/types";
import {
  Clock,
  ArrowLeft,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

const AVG_CONSULTATION_TIME = 10;

const PatientStatus = () => {
  const params = useParams();
  const tokenId = params?.tokenId as string;
  const { tokens } = useStore();

  const [lastRefreshed, setLastRefreshed] = useState(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);

  const token = tokens.find((t) => t.id === tokenId);

  const refreshStatus = () => {
    setIsRefreshing(true);
    // In a real app, this would be a fetch call to /api/queue/status/[tokenId]
    setTimeout(() => {
      setLastRefreshed(new Date());
      setIsRefreshing(false);
    }, 800);
  };

  useEffect(() => {
    const timer = setInterval(refreshStatus, 30000); // Auto refresh every 30s
    return () => clearInterval(timer);
  }, []);

  if (!token) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-[40px] shadow-xl border border-slate-100 p-12 text-center">
          <div className="w-20 h-20 bg-red-50 text-red-500 rounded-3xl flex items-center justify-center text-3xl mx-auto mb-6">
            ⚠️
          </div>
          <h2 className="text-3xl font-black text-slate-900 mb-4">
            Token Not Found
          </h2>
          <p className="text-slate-500 mb-10 leading-relaxed">
            We couldn&apos;t find the token session you&apos;re looking for. It
            might have expired or been removed.
          </p>
          <Link href="/" className="btn-primary w-full inline-block">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  // UI rendering logic follows...

  const departmentTokens = tokens.filter(
    (t) => t.department === token.department
  );

  const waitingAhead = departmentTokens.filter(
    (t) => t.status === TokenStatus.WAITING && t.createdAt < token.createdAt
  ).length;

  const currentServingToken = departmentTokens.find(
    (t) => t.status === TokenStatus.CALLED
  );

  const currentServing = currentServingToken?.tokenNumber ?? "None";

  let estWaitTime = waitingAhead * AVG_CONSULTATION_TIME;

  if (
    token.status === TokenStatus.WAITING &&
    waitingAhead === 0 &&
    currentServingToken
  ) {
    estWaitTime = Math.floor(AVG_CONSULTATION_TIME / 2);
  } else if (token.status !== TokenStatus.WAITING) {
    estWaitTime = 0;
  }

  const statusColors: Record<
    TokenStatus,
    { bg: string; text: string; icon: React.ReactNode; message: string }
  > = {
    [TokenStatus.WAITING]: {
      bg: "bg-yellow-100",
      text: "text-yellow-700",
      icon: <Clock className="w-5 h-5" />,
      message: "Please wait for your turn.",
    },
    [TokenStatus.CALLED]: {
      bg: "bg-blue-100",
      text: "text-blue-700",
      icon: <RefreshCw className="w-5 h-5 animate-spin" />,
      message: "Your turn! Please proceed to the cabin.",
    },
    [TokenStatus.COMPLETED]: {
      bg: "bg-green-100",
      text: "text-green-700",
      icon: <CheckCircle2 className="w-5 h-5" />,
      message: "Consultation completed. Thank you.",
    },
    [TokenStatus.MISSED]: {
      bg: "bg-red-100",
      text: "text-red-700",
      icon: <AlertCircle className="w-5 h-5" />,
      message: "You missed your turn.",
    },
  };

  const status = statusColors[token.status];

  return (
    <div className="max-w-xl mx-auto px-4 py-12">
      <Link
        href="/"
        className="flex items-center gap-1 text-gray-500 hover:text-blue-600 mb-8 font-medium transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Home
      </Link>

      <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
        <div className="p-8 text-center border-b border-gray-100">
          <div
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 font-bold ${status.bg} ${status.text}`}
          >
            {status.icon} {token.status}
          </div>

          <h1 className="text-gray-400 font-medium text-lg uppercase tracking-widest mb-2">
            Your Token Number
          </h1>

          <p className="text-7xl font-black text-blue-600 tracking-tighter">
            {token.tokenNumber}
          </p>

          <p className="mt-4 text-gray-500 font-medium">{status.message}</p>
        </div>

        <div className="p-8 space-y-8">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 p-6 rounded-2xl text-center border border-gray-100">
              <p className="text-gray-400 text-xs font-bold uppercase mb-1">
                Patients Ahead
              </p>
              <p className="text-3xl font-black text-gray-900">
                {token.status === TokenStatus.WAITING ? waitingAhead : "0"}
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-2xl text-center border border-gray-100">
              <p className="text-gray-400 text-xs font-bold uppercase mb-1">
                Now Serving
              </p>
              <p className="text-3xl font-black text-blue-600">
                {currentServing}
              </p>
            </div>
          </div>

          <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100 flex items-center gap-4">
            <Clock className="w-6 h-6 text-blue-600" />
            <div>
              <p className="text-blue-800 font-bold">Estimated Wait Time</p>
              <p className="text-blue-600 text-2xl font-black">
                {token.status === TokenStatus.WAITING
                  ? `~${estWaitTime} mins`
                  : "0 mins"}
              </p>
            </div>
          </div>

          <div className="pt-6 border-t border-gray-100 space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Patient Name:</span>
              <span className="font-semibold">{token.patientName}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">Department:</span>
              <span className="font-semibold">{token.department}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">Joined at:</span>
              <span className="font-semibold">
                {new Date(token.createdAt).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
          </div>

          <div className="text-center">
            <p className="text-xs text-gray-400 mb-3">
              Auto-refreshing every 15s • Last:{" "}
              {lastRefreshed.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              })}
            </p>

            <button
              onClick={() => setLastRefreshed(new Date())}
              className="inline-flex items-center gap-2 px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-full text-sm font-bold transition-all"
            >
              <RefreshCw className="w-3 h-3" /> Refresh Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientStatus;
