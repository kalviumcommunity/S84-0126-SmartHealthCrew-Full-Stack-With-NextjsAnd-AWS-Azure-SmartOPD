"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { APP_NAME } from "@/lib/constants";
import { Stethoscope, ShieldCheck } from "lucide-react";

export default function Header() {
  const pathname = usePathname();
  const isDashboard = pathname.includes("/dashboard");

  if (isDashboard) return null;

  return (
    <header className="bg-white/80 backdrop-blur-md text-slate-900 px-20 py-4 sticky top-0 z-50 flex justify-between items-center border-b border-slate-50">
      <Link href="/" className="text-2xl font-black flex items-center gap-2">
        <div className="w-10 h-10 bg-sky-500 rounded-lg flex items-center justify-center text-white shadow-lg">
          ✚
        </div>
        <span className="tracking-tighter uppercase">{APP_NAME}</span>
      </Link>

      <nav className="flex items-center gap-10">
        <Link href="/" className="nav-link">
          Home
        </Link>
        <Link href="/about" className="nav-link">
          About Us
        </Link>
        <Link href="/news" className="nav-link">
          News
        </Link>

        <Link
          href="/doctor/login"
          className="px-6 py-2.5 bg-slate-900 text-white text-xs font-bold rounded-full"
        >
          <Stethoscope className="w-4 h-4 inline-flex" /> Doctor
        </Link>

        <Link
          href="/admin/login"
          className="px-6 py-2.5 bg-slate-900 text-white text-xs font-bold rounded-full"
        >
          <ShieldCheck className="w-4 h-4 inline-flex" /> Admin
        </Link>

        <Link
          href="/getToken"
          className="px-6 py-2.5 bg-blue-600 text-white text-xs font-bold rounded-full shadow-lg"
        >
          Get Token
        </Link>
      </nav>
    </header>
  );
}
