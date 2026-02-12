"use client";
import { usePathname } from "next/navigation";
import { APP_NAME } from "@/lib/constants";

export default function Footer() {
  const pathname = usePathname();
  const isDashboard = pathname.includes("/dashboard");

  if (isDashboard) return null;

  return (
    <footer className="bg-white border-t border-slate-100 pt-24 pb-12 px-20">
      <div className="text-center pt-12">
        <p className="text-slate-400 text-xs font-medium uppercase tracking-[0.2em]">
          ©2026 {APP_NAME} DIGITAL HEALTH INFRASTRUCTURE
        </p>
      </div>
    </footer>
  );
}
