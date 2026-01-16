import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Navigation Header */}
      <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-lg">
                S
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">SmartOPD</h1>
                <p className="text-xs text-gray-500">Digital Queue System</p>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-6">
              <Link href="/about" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">About</Link>
              <Link href="/live-queue" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">Live Queue</Link>
              <Link href="/news" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">Updates</Link>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            Next.js Rendering Strategies Demo
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            End Long Hospital
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"> Waiting Queues</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Lightweight web-based digital queue management for Tier-2/3 city hospitals.
            No hardware. No expensive software. Just efficient queue management.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/live-queue"
              className="px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
            >
              View Live Queue →
            </Link>
            <Link
              href="/about"
              className="px-8 py-4 bg-white text-gray-900 rounded-lg font-semibold hover:bg-gray-50 transition-colors border-2 border-gray-200"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Rendering Strategy Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {/* SSG Card */}
          <Link href="/about" className="group">
            <div className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all border border-gray-100 h-full">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <span className="text-2xl">⚡</span>
              </div>
              <div className="flex items-center gap-2 mb-3">
                <h3 className="text-xl font-bold text-gray-900">Static Rendering</h3>
                <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded">SSG</span>
              </div>
              <p className="text-gray-600 mb-4 text-sm">
                Pre-rendered at build time. Lightning fast, perfect for content that doesn't change often.
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-gray-500">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                  <span>Instant page loads</span>
                </div>
                <div className="flex items-center gap-2 text-gray-500">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                  <span>Minimal server cost</span>
                </div>
              </div>
            </div>
          </Link>

          {/* SSR Card */}
          <Link href="/live-queue" className="group">
            <div className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all border border-gray-100 h-full">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <span className="text-2xl">🔄</span>
              </div>
              <div className="flex items-center gap-2 mb-3">
                <h3 className="text-xl font-bold text-gray-900">Dynamic Rendering</h3>
                <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded">SSR</span>
              </div>
              <p className="text-gray-600 mb-4 text-sm">
                Generated on every request. Always fresh, ideal for real-time data like queue status.
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-gray-500">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                  <span>Real-time accuracy</span>
                </div>
                <div className="flex items-center gap-2 text-gray-500">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                  <span>Always fresh data</span>
                </div>
              </div>
            </div>
          </Link>

          {/* ISR Card */}
          <Link href="/news" className="group">
            <div className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all border border-gray-100 h-full">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <span className="text-2xl">🔀</span>
              </div>
              <div className="flex items-center gap-2 mb-3">
                <h3 className="text-xl font-bold text-gray-900">Hybrid Rendering</h3>
                <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs font-semibold rounded">ISR</span>
              </div>
              <p className="text-gray-600 mb-4 text-sm">
                Static with periodic updates. Best of both worlds - fast and fresh.
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-gray-500">
                  <span className="w-1.5 h-1.5 bg-purple-500 rounded-full"></span>
                  <span>Balanced performance</span>
                </div>
                <div className="flex items-center gap-2 text-gray-500">
                  <span className="w-1.5 h-1.5 bg-purple-500 rounded-full"></span>
                  <span>Auto-regenerates</span>
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Stats Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Why SmartOPD Works</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">0</div>
              <p className="text-gray-600 text-sm">Hardware Required</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">&lt;200ms</div>
              <p className="text-gray-600 text-sm">Real-time Updates</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">100%</div>
              <p className="text-gray-600 text-sm">Cloud-Based</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">∞</div>
              <p className="text-gray-600 text-sm">Scalable</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400 mb-2">SmartOPD - Digital Queue Management System</p>
          <p className="text-gray-500 text-sm">Built with Next.js, TypeScript, and modern web technologies</p>
        </div>
      </footer>
    </div>
  );
}
