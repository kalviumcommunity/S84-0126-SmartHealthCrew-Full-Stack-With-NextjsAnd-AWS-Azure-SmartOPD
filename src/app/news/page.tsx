import Link from "next/link";

// HYBRID RENDERING (ISR) — Regenerates every 60s
export const revalidate = 60;

export default async function News() {
  const res = await fetch("https://dummyjson.com/posts", {
    next: { revalidate: 60 },
  });
  const data = await res.json();
  const lastUpdated = new Date();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50">
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
                href="/about"
                className="text-gray-600 hover:text-blue-600 font-medium transition-colors"
              >
                About
              </Link>
              <Link
                href="/live-queue"
                className="text-gray-600 hover:text-blue-600 font-medium transition-colors"
              >
                Live Queue
              </Link>
            </div>
          </div>
        </nav>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <span className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></span>
            Hybrid Rendering (ISR) - Revalidates every 60s
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            SmartOPD Updates
          </h1>
          <p className="text-xl text-gray-600">
            Latest announcements and feature releases - Balanced speed and
            freshness
          </p>
        </div>

        {/* ISR Explanation */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8 border border-purple-200 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            🎯 DailyEdge Case Study Solution
          </h2>
          <p className="text-gray-700 mb-4">
            This page demonstrates the solution to the &quot;outdated vs
            slow&quot; problem:
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg p-4">
              <div className="text-2xl mb-2">⚡</div>
              <h3 className="font-semibold text-gray-900 mb-1">
                Fast Like SSG
              </h3>
              <p className="text-sm text-gray-600">
                Served from cache instantly
              </p>
            </div>
            <div className="bg-white rounded-lg p-4">
              <div className="text-2xl mb-2">🔄</div>
              <h3 className="font-semibold text-gray-900 mb-1">
                Fresh Like SSR
              </h3>
              <p className="text-sm text-gray-600">
                Auto-updates every 60 seconds
              </p>
            </div>
            <div className="bg-white rounded-lg p-4">
              <div className="text-2xl mb-2">📈</div>
              <h3 className="font-semibold text-gray-900 mb-1">Scalable</h3>
              <p className="text-sm text-gray-600">Low server load</p>
            </div>
          </div>
        </div>

        {/* Updates Grid */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Recent Updates
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {data.posts
              .slice(0, 6)
              .map(
                (
                  post: { id: number; title: string; body: string },
                  index: number
                ) => (
                  <div
                    key={post.id}
                    className={`bg-white rounded-2xl p-6 shadow-md border transition-all hover:shadow-xl ${
                      index === 0
                        ? "border-purple-200 bg-gradient-to-br from-purple-50 to-white"
                        : "border-gray-100"
                    }`}
                  >
                    {index === 0 && (
                      <span className="inline-block bg-purple-100 text-purple-700 text-xs font-semibold px-3 py-1 rounded-full mb-3">
                        Latest
                      </span>
                    )}
                    <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {post.body}
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>👤 User {post.userId}</span>
                      <span>❤️ {post.reactions?.likes || 0} reactions</span>
                    </div>
                  </div>
                )
              )}
          </div>
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Showing {data.posts.length} total updates • Fetched posts:{" "}
              <strong>{data.posts.length}</strong>
            </p>
          </div>
        </div>

        {/* How ISR Works */}
        <div className="bg-white rounded-2xl p-8 shadow-md border border-gray-100 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            How ISR Works
          </h2>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="font-bold text-purple-600">1</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  Initial Build
                </h3>
                <p className="text-sm text-gray-600">
                  Page is pre-rendered at build time (like SSG)
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="font-bold text-purple-600">2</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  Serve Cached
                </h3>
                <p className="text-sm text-gray-600">
                  Users get instant response from cache
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="font-bold text-purple-600">3</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Revalidate</h3>
                <p className="text-sm text-gray-600">
                  After 60 seconds, next request triggers regeneration
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="font-bold text-purple-600">4</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  Update Cache
                </h3>
                <p className="text-sm text-gray-600">
                  New version replaces old cache for subsequent users
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="bg-green-50 rounded-2xl p-8 border border-green-200 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            📊 Rendering Strategy Comparison
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-green-300">
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">
                    Metric
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">
                    SSG
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">
                    SSR
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900 bg-green-100">
                    ISR ✓
                  </th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                <tr className="border-b border-green-100">
                  <td className="py-3 px-4 font-medium">Speed</td>
                  <td className="py-3 px-4">⚡⚡⚡⚡⚡</td>
                  <td className="py-3 px-4">⚡⚡</td>
                  <td className="py-3 px-4 bg-green-50">⚡⚡⚡⚡</td>
                </tr>
                <tr className="border-b border-green-100">
                  <td className="py-3 px-4 font-medium">Freshness</td>
                  <td className="py-3 px-4">❌ Stale</td>
                  <td className="py-3 px-4">✅ Always Fresh</td>
                  <td className="py-3 px-4 bg-green-50">✅ Fresh (60s)</td>
                </tr>
                <tr className="border-b border-green-100">
                  <td className="py-3 px-4 font-medium">Server Load</td>
                  <td className="py-3 px-4">✅ Zero</td>
                  <td className="py-3 px-4">❌ High</td>
                  <td className="py-3 px-4 bg-green-50">✅ Low</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium">Cost at Scale</td>
                  <td className="py-3 px-4">✅ Lowest</td>
                  <td className="py-3 px-4">❌ Highest</td>
                  <td className="py-3 px-4 bg-green-50">✅ Low</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Technical Details */}
        <div className="bg-purple-50 rounded-2xl p-8 border border-purple-200 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Technical Details
          </h2>
          <div className="bg-white rounded-lg p-4 space-y-3">
            <div>
              <p className="text-xs text-gray-500 mb-1">
                Page last regenerated at:
              </p>
              <code className="text-sm font-mono text-gray-700">
                {lastUpdated.toISOString()}
              </code>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">
                Revalidation interval:
              </p>
              <code className="text-sm font-mono text-gray-700">
                60 seconds
              </code>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Strategy:</p>
              <code className="text-sm font-mono text-gray-700">
                Stale-While-Revalidate
              </code>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-4">
            💡 Refresh immediately - same timestamp (cached). Wait 60 seconds
            and refresh - new timestamp!
          </p>
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
            href="/live-queue"
            className="px-6 py-3 bg-white text-gray-900 border-2 border-gray-200 rounded-lg hover:border-gray-300 transition-colors font-medium"
          >
            Live Queue (SSR)
          </Link>
        </div>
      </main>
    </div>
  );
}
