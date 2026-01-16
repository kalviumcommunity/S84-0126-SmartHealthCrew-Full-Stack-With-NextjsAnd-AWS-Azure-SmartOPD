import Link from "next/link";

// DYNAMIC RENDERING (SSR) — Always fresh data
export const dynamic = 'force-dynamic';

export default async function LiveQueue() {
  const res = await fetch("https://dummyjson.com/posts/1", { cache: "no-store" });
  const data = await res.json();
  const requestTime = new Date();

  // Simulate queue data
  const queueData = {
    currentNumber: Math.floor(Math.random() * 50) + 1,
    waitingPatients: Math.floor(Math.random() * 30) + 5,
    avgWaitTime: Math.floor(Math.random() * 20) + 10,
    doctorsAvailable: Math.floor(Math.random() * 3) + 2,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Navigation */}
      <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-lg">
                S
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">SmartOPD</h1>
                <p className="text-xs text-gray-500">Digital Queue System</p>
              </div>
            </Link>
            <div className="flex items-center gap-6">
              <Link href="/" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">Home</Link>
              <Link href="/about" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">About</Link>
              <Link href="/news" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">Updates</Link>
            </div>
          </div>
        </nav>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
            Dynamic Rendering (SSR)
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Live Queue Status</h1>
          <p className="text-xl text-gray-600">
            Real-time patient queue monitoring - Generated fresh on every request
          </p>
        </div>

        {/* Current Number Display */}
        <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-3xl p-12 text-white text-center mb-8 shadow-2xl">
          <p className="text-lg font-semibold mb-2 opacity-90">Now Serving</p>
          <div className="text-7xl md:text-8xl font-bold mb-4">{queueData.currentNumber}</div>
          <p className="text-blue-100">
            Last updated: {requestTime.toLocaleTimeString()}
          </p>
        </div>

        {/* Queue Metrics */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                <span className="text-2xl">👥</span>
              </div>
              <span className="text-xs font-semibold text-orange-600 bg-orange-100 px-2 py-1 rounded">LIVE</span>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">{queueData.waitingPatients}</div>
            <p className="text-gray-600 text-sm">Patients Waiting</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <span className="text-2xl">⏱️</span>
              </div>
              <span className="text-xs font-semibold text-green-600 bg-green-100 px-2 py-1 rounded">AVG</span>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">{queueData.avgWaitTime} min</div>
            <p className="text-gray-600 text-sm">Average Wait Time</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <span className="text-2xl">👩‍⚕️</span>
              </div>
              <span className="text-xs font-semibold text-purple-600 bg-purple-100 px-2 py-1 rounded">ACTIVE</span>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">{queueData.doctorsAvailable}</div>
            <p className="text-gray-600 text-sm">Doctors Available</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center">
                <span className="text-2xl">🏋️</span>
              </div>
              <span className="text-xs font-semibold text-teal-600 bg-teal-100 px-2 py-1 rounded">TODAY</span>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">{Math.floor(Math.random() * 50) + 50}</div>
            <p className="text-gray-600 text-sm">Total Consultations</p>
          </div>
        </div>

        {/* API Data Display */}
        <div className="bg-white rounded-2xl p-8 shadow-md border border-gray-100 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Live API Data</h2>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-2">Data fetched at request time:</p>
            <p className="text-lg font-semibold text-gray-900">{data.title}</p>
          </div>
        </div>

        {/* Why SSR Section */}
        <div className="bg-blue-50 rounded-2xl p-8 border border-blue-200 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Why This Page Uses Dynamic Rendering (SSR)</h2>
          <p className="text-gray-700 mb-4">
            Queue data changes constantly and must be accurate for hospital operations:
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg p-4">
              <div className="text-2xl mb-2">🔄</div>
              <h3 className="font-semibold text-gray-900 mb-1">Always Fresh</h3>
              <p className="text-sm text-gray-600">Data fetched on every request</p>
            </div>
            <div className="bg-white rounded-lg p-4">
              <div className="text-2xl mb-2">⏱️</div>
              <h3 className="font-semibold text-gray-900 mb-1">Real-time</h3>
              <p className="text-sm text-gray-600">Critical for patient safety</p>
            </div>
            <div className="bg-white rounded-lg p-4">
              <div className="text-2xl mb-2">🎯</div>
              <h3 className="font-semibold text-gray-900 mb-1">Accurate</h3>
              <p className="text-sm text-gray-600">No stale data ever served</p>
            </div>
          </div>
          <div className="mt-6 bg-white rounded-lg p-4">
            <p className="text-xs text-gray-500 mb-1">Request processed at:</p>
            <code className="text-sm font-mono text-gray-700">{requestTime.toISOString()}</code>
            <p className="text-xs text-gray-500 mt-2">
              💡 Refresh the page - you'll see different numbers and a new timestamp
            </p>
          </div>
        </div>

        {/* Trade-offs */}
        <div className="bg-yellow-50 rounded-2xl p-8 border border-yellow-200 mb-8">
          <h3 className="text-lg font-bold text-gray-900 mb-4">⚠️ Performance Trade-offs</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-green-800 mb-3">Advantages:</h4>
              <ul className="space-y-2 text-sm text-green-700">
                <li className="flex items-start gap-2">
                  <span className="mt-1">✓</span>
                  <span>Always shows current queue status</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1">✓</span>
                  <span>Critical for hospital operations</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1">✓</span>
                  <span>Patient safety depends on accuracy</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-red-800 mb-3">Considerations:</h4>
              <ul className="space-y-2 text-sm text-red-700">
                <li className="flex items-start gap-2">
                  <span className="mt-1">•</span>
                  <span>Slower than static pages (on-demand)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1">•</span>
                  <span>Higher server costs at scale</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1">•</span>
                  <span>Requires more infrastructure</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Navigation Footer */}
        <div className="flex flex-wrap gap-4">
          <Link
            href="/"
            className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
          >
            ← Home
          </Link>
          <Link
            href="/about"
            className="px-6 py-3 bg-white text-gray-900 border-2 border-gray-200 rounded-lg hover:border-gray-300 transition-colors font-medium"
          >
            About (SSG)
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
