"use client";
import Link from "next/link";
import { SEED_DOCTORS } from "../lib/constants";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col bg-white">
      {/* Hero Section */}
      <section className="relative px-20 pt-20 pb-32 medical-gradient">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="max-w-xl">
            <h1 className="text-6xl font-extrabold text-slate-900 leading-[1.1] mb-8">
              Your <span className="text-sky-500">Health</span>, Our Happiness
            </h1>
            <p className="text-slate-500 text-lg leading-relaxed mb-10 pr-10">
              In the new normal era like now, your health is very important.
              Stay home, track your turn digitally, and visit only when
              it&apos;s your turn.
            </p>
            <div className="flex items-center gap-6">
              <Link href="/patient" className="btn-primary py-4 px-10 text-lg">
                Get Appointment
              </Link>
            </div>

            <div className="mt-16 flex items-center gap-8">
              <div className="flex -space-x-4">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-12 h-12 rounded-full border-4 border-white bg-slate-200 overflow-hidden"
                  >
                    <div className="w-full h-full bg-slate-300 flex items-center justify-center text-xs">
                      👤
                    </div>
                  </div>
                ))}
              </div>
              <div>
                <p className="font-bold text-slate-900"></p>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">
                  Currently in development phase
                </p>
              </div>
            </div>
          </div>

          <div className="relative w-1/2 flex justify-end">
            <div className="relative z-10 w-125 h-150 rounded-[100px] bg-slate-100 shadow-2xl overflow-hidden border-8 border-white">
              {/* Visual Placeholder for Doctor as in Reference */}
              <div className="w-125 h-150 bg-sky-100 flex text-[25rem] opacity-80">
                <Image
                  src="/doctor1.jpg"
                  alt="Doctor"
                  width={600}
                  height={500}
                  className="rounded-3xl"
                />
              </div>
            </div>
            <div className="absolute -top-10 -right-10 w-48 h-48 bg-sky-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
            <div className="absolute top-20 -left-20 bg-white p-6 rounded-3xl shadow-2xl z-20 flex items-center gap-4">
              <div className="w-12 h-12 bg-teal-500 rounded-2xl flex items-center justify-center text-white">
                ✓
              </div>
              <div>
                <p className="font-extrabold text-slate-800">Consultation</p>
                <p className="text-xs text-slate-400">Available 24/7</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Services */}
      <section className="py-32 px-20">
        <div className="max-w-7xl mx-auto text-center mb-20">
          <span className="section-label">Our Services</span>
          <h2 className="text-4xl font-black text-slate-900">
            Medical Services We Provide
          </h2>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-4 gap-8">
          {[
            {
              icon: "💬",
              title: "Consultation",
              desc: "Get quick guidance from our specialized doctors.",
              color: "bg-teal-500",
            },
            {
              icon: "🩺",
              title: "Doctors",
              desc: "Hundreds of doctors with specific general expertise.",
              color: "bg-sky-500",
            },
            {
              icon: "🏥",
              title: "Hospital",
              desc: "Digital tokenization to manage facility crowds.",
              color: "bg-orange-500",
            },
            {
              icon: "💊",
              title: "Pharmacy",
              desc: "Track your prescription status in real-time.",
              color: "bg-purple-500",
            },
          ].map((s, i) => (
            <div
              key={i}
              className="sleek-card p-10 flex flex-col items-start group"
            >
              <div
                className={`w-14 h-14 ${s.color} rounded-2xl flex items-center justify-center text-2xl text-white mb-8 group-hover:scale-110 transition-transform`}
              >
                {s.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-4">
                {s.title}
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* About Us Split */}
      <section className="py-32 px-20 bg-slate-50">
        <div className="max-w-7xl mx-auto flex items-center gap-24">
          <div className="w-1/2">
            <div className="grid grid-cols-2 gap-6">
              <div className="w-full h-80 rounded-[40px] bg-white p-4 shadow-sm">
                <div className="w-full h-full bg-slate-100 rounded-[30px] flex items-center justify-center text-8xl">
                  👩‍⚕️
                </div>
              </div>
              <div className="w-full h-80 rounded-[40px] bg-white p-4 shadow-sm mt-12">
                <div className="w-full h-full bg-slate-100 rounded-[30px] flex items-center justify-center text-8xl">
                  🏥
                </div>
              </div>
            </div>
          </div>
          <div className="w-1/2">
            <span className="section-label">About Us</span>
            <h2 className="text-5xl font-extrabold text-slate-900 mb-8 leading-tight">
              We Provide The Best Quality Service For You
            </h2>
            <p className="text-slate-500 leading-relaxed mb-10">
              SmartOPD is a digital health platform providing services to the
              health sector. You can register your arrival, find a doctor
              according to your ailment, and get real-time updates on your turn
              without physical waiting.
            </p>
            <button className="btn-primary">Learn More</button>
          </div>
        </div>
      </section>

      {/* Our Doctors */}
      <section className="py-32 px-20">
        <div className="max-w-7xl mx-auto text-center mb-20">
          <span className="section-label">Our Doctors</span>
          <h2 className="text-4xl font-black text-slate-900">
            Highly Specialized Professionals
          </h2>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-3 gap-12">
          {SEED_DOCTORS.map((doc, i) => (
            <div key={i} className="text-center group">
              <div className="doctor-image-container w-full aspect-4/5 mb-8 group-hover:shadow-2xl transition-all">
                <div className="w-full h-full bg-slate-100 flex items-center justify-center text-[10rem] grayscale group-hover:grayscale-0 transition-all">
                  <Image
                    src={doc.url}
                    alt="Doctor"
                    width={400}
                    height={500}
                    className="rounded-3xl"
                  />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-1">
                {doc.name}
              </h3>
              <p className="text-sm font-bold text-sky-500 uppercase tracking-widest mb-4">
                {doc.department}
              </p>
              <div className="flex justify-center gap-4">
                {["fb", "tw", "ln"].map((s) => (
                  <div
                    key={s}
                    className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 hover:text-sky-500 cursor-pointer"
                  >
                    {s}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-20 text-center">
          <Link href="/patient" className="btn-outline px-12">
            View All Doctors
          </Link>
        </div>
      </section>

      {/* News & Updates */}
      <section className="py-32 px-20 bg-slate-50">
        <div className="max-w-7xl mx-auto text-center mb-20">
          <span className="section-label">Latest News</span>
          <h2 className="text-4xl font-black text-slate-900">
            Get To Know More Medical Updates
          </h2>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-3 gap-8">
          {[
            {
              tag: "Health",
              title: "How to Maintain Health During Lockdown",
              img: "🥬",
            },
            {
              tag: "Disease",
              title: "5 Foods That Contain High Protein for Kids",
              img: "🍳",
            },
            {
              tag: "Medical",
              title: "Get To Know The Newest Type Of Vaccines",
              img: "💉",
            },
          ].map((a, i) => (
            <div key={i} className="sleek-card group overflow-hidden">
              <div className="w-full h-64 bg-slate-200 flex items-center justify-center text-8xl group-hover:scale-105 transition-transform duration-500">
                {a.img}
              </div>
              <div className="p-8">
                <span className="text-[10px] font-black text-sky-500 uppercase tracking-widest mb-4 block">
                  {a.tag}
                </span>
                <h3 className="text-xl font-bold text-slate-800 mb-6 leading-tight group-hover:text-sky-600 transition-colors">
                  {a.title}
                </h3>
                <button className="text-sm font-bold text-slate-400 hover:text-sky-500">
                  Read More →
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32 px-20 bg-sky-500/5">
        <div className="max-w-5xl mx-auto text-center">
          <span className="section-label">Testimonials</span>
          <h2 className="text-4xl font-black text-slate-900 mb-16">
            What Our Patients Say
          </h2>

          <div className="bg-white p-16 rounded-[60px] shadow-2xl relative">
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-20 h-20 bg-sky-500 rounded-full flex items-center justify-center text-white text-4xl shadow-xl">
              &quot;
            </div>
            <p className="text-2xl font-medium text-slate-600 leading-relaxed mb-12 italic">
              SmartOPD saved me hours of sitting in a crowded hospital. I could
              stay at my home, watch my turn progress on my phone, and only left
              when there were 2 people ahead. Brilliant infrastructure!
            </p>
            <div>
              <div className="w-16 h-16 bg-slate-100 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl">
                👤
              </div>
              <p className="font-bold text-slate-900">Arjun Sharma</p>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                Patient since 2026
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
