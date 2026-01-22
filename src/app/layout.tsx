"use client";

import "./globals.css";
import type { ReactNode } from "react";
import Link from "next/link";
import { APP_NAME } from "../lib/constants";
import { usePathname } from "next/navigation";

const Header: React.FC = () => {
  const pathname = usePathname();
  const isDashboard = pathname.includes("/dashboard");

  if (isDashboard) return null;

  return (
    <header className="bg-white/80 backdrop-blur-md text-slate-900 px-20 py-6 sticky top-0 z-50 flex justify-between items-center border-b border-slate-50">
      <Link
        href="/"
        className="text-2xl font-black flex items-center gap-2 group"
      >
        <div className="w-10 h-10 bg-sky-500 rounded-lg flex items-center justify-center text-white shadow-lg shadow-sky-100 group-hover:rotate-12 transition-transform">
          <span className="text-xl">✚</span>
        </div>
        <span className="tracking-tighter text-slate-800 uppercase">
          {APP_NAME}
        </span>
      </Link>

      <nav className="flex items-center gap-10">
        <Link
          href="/"
          className="text-sm font-semibold text-slate-500 hover:text-sky-500 transition-colors"
        >
          Home
        </Link>
        <Link
          href="/about"
          className="text-sm font-semibold text-slate-500 hover:text-sky-500 transition-colors"
        >
          About Us
        </Link>
        <Link
          href="/news"
          className="text-sm font-semibold text-slate-500 hover:text-sky-500 transition-colors"
        >
          Services
        </Link>
        <Link
          href="/live-queue"
          className="text-sm font-semibold text-slate-500 hover:text-sky-500 transition-colors"
        >
          Live Status
        </Link>
        <Link href="/doctor/login" className="btn-primary py-2.5 px-8">
          Get Started
        </Link>
      </nav>
    </header>
  );
};

const Footer: React.FC = () => {
  const pathname = usePathname();
  const isDashboard = pathname.includes("/dashboard");

  if (isDashboard) return null;

  return (
    <footer className="bg-white border-t border-slate-100 pt-24 pb-12 px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
        <div className="col-span-1">
          <Link
            href="/"
            className="text-2xl font-black flex items-center gap-2 mb-8"
          >
            <div className="w-8 h-8 bg-sky-500 rounded flex items-center justify-center text-white">
              ✚
            </div>
            <span className="tracking-tighter uppercase">{APP_NAME}</span>
          </Link>
          <p className="text-slate-400 text-sm leading-relaxed mb-8">
            Pioneering digital health infrastructure with lightweight, reliable
            technology for growing healthcare centers.
          </p>
          <div className="flex gap-4">
            {["tw", "fb", "ig", "ln"].map((s) => (
              <div
                key={s}
                className="w-8 h-8 bg-slate-50 rounded-full flex items-center justify-center text-slate-400 hover:bg-sky-500 hover:text-white transition-all cursor-pointer"
              >
                {s}
              </div>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-bold text-slate-800 mb-8">Services</h4>
          <ul className="space-y-4 text-slate-500 text-sm">
            <li>OPD Registration</li>
            <li>Token Tracking</li>
            <li>Doctor Dashboard</li>
            <li>Queue Analytics</li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-slate-800 mb-8">Quick Links</h4>
          <ul className="space-y-4 text-slate-500 text-sm">
            <li>About Us</li>
            <li>Staff Login</li>
            <li>Join Queue</li>
            <li>Contact Support</li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-slate-800 mb-8">Contact</h4>
          <p className="text-slate-500 text-sm mb-4">support@smartopd.com</p>
          <p className="text-slate-500 text-sm">+91 1800 *** ***</p>
          <div className="mt-8">
            <input
              type="text"
              placeholder="Your Email"
              className="bg-slate-50 border-none p-4 rounded-xl text-sm w-full outline-none focus:ring-2 focus:ring-sky-200"
            />
          </div>
        </div>
      </div>
      <div className="text-center pt-12 border-t border-slate-50">
        <p className="text-slate-400 text-xs font-medium uppercase tracking-[0.2em]">
          ©2026 {APP_NAME} DIGITAL HEALTH INFRASTRUCTURE
        </p>
      </div>
    </footer>
  );
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col selection:bg-sky-100">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
