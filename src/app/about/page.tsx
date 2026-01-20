import Link from "next/link";

// STATIC RENDERING (SSG) — Pre-rendered at build time
export const revalidate = false; // No re-rendering after build

export default function About() {
  const buildTime = new Date().toISOString();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      {/* Navigation */}
      <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link
              href="/"
              className="flex items-center gap-3 hover:opacity-80 transition-opacity"
            >
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-lg">
                S
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">SmartOPD</h1>
                <p className="text-xs text-gray-500">Digital Queue System</p>
              </div>
            </Link>
            <div className="flex items-center gap-6">
              <Link
                href="/"
                className="text-gray-600 hover:text-blue-600 font-medium transition-colors"
              >
                Home
              </Link>
              <Link
                href="/live-queue"
                className="text-gray-600 hover:text-blue-600 font-medium transition-colors"
              >
                Live Queue
              </Link>
              <Link
                href="/news"
                className="text-gray-600 hover:text-blue-600 font-medium transition-colors"
              >
                Updates
              </Link>
            </div>
          </div>
        </nav>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            Static Rendering (SSG)
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            About SmartOPD
          </h1>
          <p className="text-xl text-gray-600">
            A lightweight, web-based digital queue management system for
            Tier-2/3 city hospitals
          </p>
        </div>

        {/* Content Cards */}
        <div className="space-y-6">
          {/* Problem Statement */}
          <div className="bg-white rounded-2xl p-8 shadow-md border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              The Problem We&apos;re Solving
            </h2>
            <p className="text-gray-700 mb-4">
              Hospitals in Tier-2 and Tier-3 cities still rely on physical
              queues for OPD appointments, leading to:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-red-600 text-sm">✕</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    Long Waiting Times
                  </h3>
                  <p className="text-sm text-gray-600">
                    Patient frustration and poor experience
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-red-600 text-sm">✕</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Overcrowding</h3>
                  <p className="text-sm text-gray-600">Chaotic waiting areas</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-red-600 text-sm">✕</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Inefficiency</h3>
                  <p className="text-sm text-gray-600">
                    Poor resource utilization
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-red-600 text-sm">✕</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">High Costs</h3>
                  <p className="text-sm text-gray-600">
                    Expensive systems unaffordable
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Solution */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Our Solution
            </h2>
            <p className="text-gray-700 mb-6">
              SmartOPD provides a lightweight digital queue system with zero
              hardware requirements:
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <span className="text-blue-600">💻</span> For Patients
                </h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>Register and get queue number</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>Check current number being served</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>Track position from anywhere</span>
                  </li>
                </ul>
              </div>
              <div className="bg-white rounded-xl p-6">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <span className="text-blue-600">⚙️</span> For Admins
                </h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>View entire queue in real-time</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>Call next patient efficiently</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>Mark consultations complete</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Tech Stack */}
          <div className="bg-white rounded-2xl p-8 shadow-md border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Technology Stack
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <div className="text-3xl mb-2">⚙️</div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  Frontend & Backend
                </h3>
                <p className="text-sm text-gray-600">Next.js with TypeScript</p>
              </div>
              <div>
                <div className="text-3xl mb-2">💾</div>
                <h3 className="font-semibold text-gray-900 mb-1">Database</h3>
                <p className="text-sm text-gray-600">PostgreSQL + Prisma ORM</p>
              </div>
              <div>
                <div className="text-3xl mb-2">⚡</div>
                <h3 className="font-semibold text-gray-900 mb-1">Caching</h3>
                <p className="text-sm text-gray-600">
                  Redis for real-time updates
                </p>
              </div>
            </div>
          </div>

          {/* Why SSG */}
          <div className="bg-green-50 rounded-2xl p-8 border border-green-200">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Why This Page Uses Static Rendering (SSG)
            </h2>
            <p className="text-gray-700 mb-4">
              The About page content doesn&apos;t change frequently. By using
              Static Site Generation:
            </p>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="text-green-600 text-xl">⚡</span>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    Lightning Fast
                  </h3>
                  <p className="text-sm text-gray-600">
                    Pre-rendered HTML loads instantly from CDN
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-green-600 text-xl">💰</span>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    Cost Efficient
                  </h3>
                  <p className="text-sm text-gray-600">
                    No server computation on each visit
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-green-600 text-xl">📈</span>
                <div>
                  <h3 className="font-semibold text-gray-900">Scales Easily</h3>
                  <p className="text-sm text-gray-600">
                    Handles thousands of visitors simultaneously
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-6 bg-white rounded-lg p-4">
              <p className="text-xs text-gray-500 mb-1">Page built at:</p>
              <code className="text-sm font-mono text-gray-700">
                {buildTime}
              </code>
              <p className="text-xs text-gray-500 mt-2">
                💡 Refresh the page - this timestamp won&apos;t change until the
                app is rebuilt
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Footer */}
        <div className="mt-12 flex flex-wrap gap-4">
          <Link
            href="/"
            className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
          >
            ← Home
          </Link>
          <Link
            href="/live-queue"
            className="px-6 py-3 bg-white text-gray-900 border-2 border-gray-200 rounded-lg hover:border-gray-300 transition-colors font-medium"
          >
            Live Queue (SSR) →
          </Link>
          <Link
            href="/news"
            className="px-6 py-3 bg-white text-gray-900 border-2 border-gray-200 rounded-lg hover:border-gray-300 transition-colors font-medium"
          >
            Updates (ISR) →
          </Link>
        </div>
      </main>
    </div>
  );
}
