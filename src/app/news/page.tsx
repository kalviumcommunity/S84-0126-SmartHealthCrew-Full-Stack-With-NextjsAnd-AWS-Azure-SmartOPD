"use client";
import Image from "next/image";

const articles = [
  {
    tag: "Development Update",
    title: "SmartOPD Dashboard UI Redesigned for Faster Front Desk Workflow",
    date: "Jan 18, 2026",
    img: "https://www.moviik.com/dashboard_queue_management_retail.png",
  },
  {
    tag: "Feature Progress",
    title: "Queue Management Logic Updated to Handle Multi-Doctor Scheduling",
    date: "Jan 15, 2026",
    img: "https://cdn.dayschedule.com/img/solutions/doctor-scheduling-software.png",
  },
  {
    tag: "Prototype Milestone",
    title: "Patient Token Display System Integrated with Live Status Updates",
    date: "Jan 14, 2026",
    img: "https://www.emedhealthtech.com/wp-content/uploads/2022/08/All-in-One-Guide-for-Custom-Healthcare-Software-Development-1024x680.jpg",
  },
  {
    tag: "Research",
    // eslint-disable-next-line prettier/prettier
    title:
      "Studying OPD Waiting Time Patterns to Improve Future AI Predictions",
    date: "Dec 12, 2025",
    img: "https://www.quytech.com/blog/wp-content/uploads/2019/11/ai-predictive.jpg",
  },
];

export default function News() {
  return (
    <div className="py-24 px-20 max-w-7xl mx-auto">
      <div className="mb-20">
        <h1 className="text-5xl font-black text-slate-900 mb-4">
          Latest Updates
        </h1>
        <p className="text-slate-500 font-medium">
          Keep track of how SmartOPD is evolving to serve you better.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-12">
        {articles.map((a, i) => (
          <div
            key={i}
            className="flex gap-8 p-8 bg-white rounded-[40px] border border-slate-100 hover:shadow-2xl transition-all cursor-pointer group"
          >
            <div className="w-48 h-48 bg-slate-50 rounded-[30px] shrink-0 flex items-center justify-center text-7xl group-hover:scale-105 transition-transform">
              <Image src={a.img} alt="img" />
            </div>

            <div className="flex flex-col justify-center">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 mb-2">
                {a.tag}
              </span>
              <h3 className="text-xl font-black text-slate-800 mb-4 leading-tight">
                {a.title}
              </h3>
              <p className="text-xs text-slate-400 font-bold">{a.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
