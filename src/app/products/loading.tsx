export default function ProductsLoading() {
  return (
    <div className="py-20 animate-pulse">
      <div className="container mx-auto px-4">
        {/* Header skeleton */}
        <div className="text-center mb-12">
          <div className="h-12 bg-gray-200 rounded w-1/3 mx-auto mb-4" />
          <div className="h-6 bg-gray-200 rounded w-1/2 mx-auto" />
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar skeleton */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="space-y-6">
              <div className="h-10 bg-gray-200 rounded" />
              <div className="space-y-2">
                <div className="h-6 bg-gray-200 rounded w-1/2" />
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-8 bg-gray-200 rounded" />
                ))}
              </div>
            </div>
          </aside>

          {/* Main content skeleton */}
          <main className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <div className="h-64 bg-gray-200" />
                  <div className="p-4">
                    <div className="h-6 bg-gray-200 rounded mb-2" />
                    <div className="h-4 bg-gray-200 rounded w-2/3 mb-4" />
                    <div className="h-8 bg-gray-200 rounded" />
                  </div>
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}