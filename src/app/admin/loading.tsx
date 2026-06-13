export default function AdminLoading() {
  return (
    <div className="flex flex-col gap-6 animate-pulse">

      {/* Header skeleton */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <div className="h-7 w-40 bg-gray-800 rounded-lg" />
          <div className="h-4 w-56 bg-gray-800 rounded-lg" />
        </div>
        <div className="h-10 w-36 bg-gray-800 rounded-xl" />
      </div>

      {/* Table skeleton */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
        {/* Header row */}
        <div className="border-b border-gray-800 px-6 py-3 flex gap-8">
          {[140, 100, 80, 60].map(w => (
            <div key={w} className="h-3 bg-gray-800 rounded" style={{ width: w }} />
          ))}
        </div>
        {/* Data rows */}
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="border-b border-gray-800 last:border-0 px-6 py-4 flex items-center gap-4">
            <div className="w-9 h-9 rounded-full bg-gray-800 shrink-0" />
            <div className="flex flex-col gap-1.5 flex-1">
              <div className="h-3.5 bg-gray-800 rounded w-36" />
              <div className="h-3 bg-gray-800 rounded w-24" />
            </div>
            <div className="h-6 w-20 bg-gray-800 rounded-full ml-auto" />
            <div className="h-7 w-16 bg-gray-800 rounded-lg" />
          </div>
        ))}
      </div>
    </div>
  )
}
