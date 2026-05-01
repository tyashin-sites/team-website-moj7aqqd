export default function Loading() {
  return (
    <div className="container-x section animate-pulse">
      <div className="h-4 w-32 bg-foreground/10 rounded mb-6" />
      <div className="h-16 w-3/4 bg-foreground/10 rounded mb-6" />
      <div className="h-6 w-1/2 bg-foreground/10 rounded mb-12" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-64 bg-foreground/10 rounded-lg" />
        ))}
      </div>
    </div>
  );
}
