export default function ProductLoading() {
  return (
    <div className="py-20 animate-pulse">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images skeleton */}
          <div className="space-y-4">
            <div className="aspect-square bg-gray-200 rounded-lg" />
            <div className="grid grid-cols-4 gap-2">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="aspect-square bg-gray-200 rounded" />
              ))}
            </div>
          </div>

          {/* Product Details skeleton */}
          <div className="space-y-6">
            <div className="h-8 bg-gray-200 rounded w-3/4" />
            <div className="h-6 bg-gray-200 rounded w-1/2" />
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-full" />
              <div className="h-4 bg-gray-200 rounded w-full" />
              <div className="h-4 bg-gray-200 rounded w-2/3" />
            </div>
            <div className="h-12 bg-gray-200 rounded w-1/3" />
            <div className="space-y-3">
              <div className="h-10 bg-gray-200 rounded" />
              <div className="h-12 bg-gray-200 rounded" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}