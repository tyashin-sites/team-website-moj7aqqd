export default function BlogLoading() {
  return (
    <div className="animate-pulse">
      {/* Hero skeleton */}
      <div className="bg-gradient-to-br from-primary/10 to-secondary/10 py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="h-12 bg-gray-200 rounded w-2/3 mx-auto mb-6" />
          <div className="h-6 bg-gray-200 rounded w-1/2 mx-auto" />
        </div>
      </div>
      
      {/* Blog grid skeleton */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(9)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="h-48 bg-gray-200" />
                <div className="p-6">
                  <div className="h-4 bg-gray-200 rounded w-1/3 mb-3" />
                  <div className="h-6 bg-gray-200 rounded w-full mb-3" />
                  <div className="h-4 bg-gray-200 rounded w-2/3 mb-4" />
                  <div className="h-4 bg-gray-200 rounded w-1/4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}