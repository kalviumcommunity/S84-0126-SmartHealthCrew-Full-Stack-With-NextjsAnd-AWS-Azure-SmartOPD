import Link from "next/link";

/* eslint-disable prettier/prettier */
const About = () => {
  return (
    <div className="py-24 px-20 max-w-5xl mx-auto">
      <div className="text-center mb-20">
        <span className="text-blue-600 font-bold tracking-[0.3em] uppercase text-xs mb-4 block">
          Our Mission
        </span>
        <h1 className="text-6xl font-black text-slate-900 mb-8">
          Revolutionizing Hospital Efficiency.
        </h1>
        <p className="text-xl text-slate-500 leading-relaxed">
          SmartOPD was born out of a simple problem: the physical wait at
          hospitals in growing cities is an outdated barrier to care.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-20 items-center mb-32">
        <div className="aspect-square bg-slate-100 rounded-[60px] flex items-center justify-center text-9xl shadow-inner">
          🏥
        </div>

        <div>
          <h2 className="text-3xl font-black mb-6">
            Zero Infrastructure. Full Control.
          </h2>
          <p className="text-slate-500 leading-relaxed mb-6">
            Unlike traditional Hospital Information Systems (HIS) that cost
            millions, SmartOPD runs on the cloud and requires only a basic
            smartphone or tablet for staff.
          </p>

          <ul className="space-y-4">
            {[
              "Lightweight SaaS Architecture",
              "Instant Doctor Onboarding",
              "Patient-First Experience",
              "Data-Driven Clinic Analytics",
            ].map((feat, i) => (
              <li
                key={i}
                className="flex items-center gap-4 text-sm font-bold text-slate-700"
              >
                <span className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-[10px]">
                  ✓
                </span>
                {feat}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="bg-blue-600 p-20 rounded-[80px] text-white text-center">
        <h3 className="text-4xl font-black mb-8">
          Ready to modernize your clinic?
        </h3>
        <p className="text-blue-100 mb-12 max-w-xl mx-auto">
          Contact our deployment team for a 24-hour setup and training session
          at your facility.
        </p>
        <button className="px-12 py-5 bg-white text-blue-600 font-black rounded-full shadow-2xl">
          <Link href="/contact" className="btn-primary py-4 px-10 text-lg">
            Get in touch
          </Link>
        </button>
      </div>
    </div>
  );
};

export default About;
