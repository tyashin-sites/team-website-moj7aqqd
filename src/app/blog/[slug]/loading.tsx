export default function BlogPostLoading() {
  return (
    <div className="animate-pulse py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Back link skeleton */}
        <div className="h-6 bg-gray-200 rounded w-32 mb-8" />
        
        {/* Header skeleton */}
        <header className="mb-12">
          <div className="flex gap-4 mb-6">
            <div className="h-6 bg-gray-200 rounded w-20" />
            <div className="h-6 bg-gray-200 rounded w-24" />
            <div className="h-6 bg-gray-200 rounded w-28" />
          </div>
          <div className="h-12 bg-gray-200 rounded w-3/4 mb-6" />
          <div className="h-6 bg-gray-200 rounded w-full mb-2" />
          <div className="h-6 bg-gray-200 rounded w-2/3" />
        </header>
        
        {/* Featured image skeleton */}
        <div className="h-96 bg-gray-200 rounded-lg mb-12" />
        
        {/* Content skeleton */}
        <div className="space-y-4 mb-12">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="h-4 bg-gray-200 rounded w-full" />
          ))}
          <div className="h-4 bg-gray-200 rounded w-2/3" />
        </div>
        
        {/* Share section skeleton */}
        <div className="border-t pt-8">
          <div className="h-6 bg-gray-200 rounded w-32 mb-4" />
          <div className="flex gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-10 w-10 bg-gray-200 rounded" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}