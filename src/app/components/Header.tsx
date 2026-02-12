"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { APP_NAME } from "@/lib/constants";
import { Stethoscope, ShieldCheck, LayoutGrid, Menu, X } from "lucide-react";
import { useState } from "react";
import { DEPARTMENTS } from "@/lib/types";

export default function Header() {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const isDashboard = pathname.includes("/dashboard");

  if (isDashboard) return null;

  return (
    <>
      <header className="bg-white/80 backdrop-blur-md text-slate-900 px-6 md:px-20 py-4 sticky top-0 z-50 flex justify-between items-center border-b border-slate-50">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 hover:bg-slate-50 rounded-lg transition-colors group"
          >
            <Menu className="w-6 h-6 text-slate-600 group-hover:text-sky-500" />
          </button>

          <Link
            href="/"
            className="text-2xl font-black flex items-center gap-2"
          >
            <div className="w-10 h-10 bg-sky-500 rounded-lg flex items-center justify-center text-white shadow-lg">
              ✚
            </div>
            <span className="tracking-tighter uppercase hidden sm:inline">
              {APP_NAME}
            </span>
          </Link>
        </div>

        <nav className="hidden lg:flex items-center gap-8">
          <Link
            href="/"
            className="nav-link font-bold text-slate-600 hover:text-sky-500 transition-colors"
          >
            Home
          </Link>
          <Link
            href="/about"
            className="nav-link font-bold text-slate-600 hover:text-sky-500 transition-colors"
          >
            About
          </Link>
          <Link
            href="/news"
            className="nav-link font-bold text-slate-600 hover:text-sky-500 transition-colors"
          >
            News
          </Link>

          <div className="h-6 w-[1px] bg-slate-100 mx-2"></div>

          <Link
            href="/doctor/login"
            className="px-5 py-2.5 bg-slate-900 text-white text-xs font-bold rounded-xl hover:bg-slate-800 transition-all flex items-center gap-2"
          >
            <Stethoscope className="w-4 h-4" /> Doctor
          </Link>

          <Link
            href="/getToken"
            className="px-6 py-2.5 bg-sky-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-sky-100 hover:bg-sky-600 transition-all"
          >
            Get Token
          </Link>
        </nav>

        <button className="lg:hidden p-2 hover:bg-slate-50 rounded-lg">
          <LayoutGrid className="w-6 h-6 text-slate-600" />
        </button>
      </header>

      {/* Hospital Department Navigation Sidebar */}
      <div
        className={`fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[60] transition-opacity duration-300 ${
          isSidebarOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsSidebarOpen(false)}
      >
        <aside
          className={`fixed left-0 top-0 h-full w-[320px] bg-white shadow-2xl z-[70] transition-transform duration-500 ease-out flex flex-col ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-8 border-b border-slate-50 flex justify-between items-center">
            <div>
              <p className="text-[10px] font-black text-sky-500 uppercase tracking-widest mb-1">
                Navigation
              </p>
              <h3 className="text-xl font-black text-slate-900 tracking-tight">
                Departments
              </h3>
            </div>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="p-2 hover:bg-slate-50 rounded-xl transition-colors"
            >
              <X className="w-6 h-6 text-slate-400" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto py-6 px-4 space-y-2 custom-scrollbar">
            {DEPARTMENTS.map((dept) => (
              <Link
                key={dept}
                href={`/getToken?dept=${encodeURIComponent(dept)}`}
                onClick={() => setIsSidebarOpen(false)}
                className="flex items-center justify-between p-4 rounded-2xl hover:bg-sky-50 group transition-all duration-200"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 group-hover:bg-white group-hover:text-sky-500 transition-colors">
                    <LayoutGrid className="w-5 h-5" />
                  </div>
                  <span className="font-bold text-slate-600 group-hover:text-slate-900 transition-colors">
                    {dept}
                  </span>
                </div>
                <div className="w-6 h-6 rounded-lg bg-slate-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-sky-500 text-xs">→</span>
                </div>
              </Link>
            ))}
          </div>

          <div className="p-8 border-t border-slate-50 bg-slate-50/30">
            <Link
              href="/admin/login"
              className="flex items-center gap-3 p-4 rounded-2xl bg-white border border-slate-100 text-slate-600 hover:text-slate-900 transition-all hover:shadow-sm"
            >
              <ShieldCheck className="w-5 h-5" />
              <span className="text-sm font-bold">Admin Portal</span>
            </Link>
          </div>
        </aside>
      </div>
    </>
  );
}
