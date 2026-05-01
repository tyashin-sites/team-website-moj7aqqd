export default function Loading() {
  return (
    <div className="container-x section animate-pulse">
      <div className="h-4 w-32 bg-foreground/10 rounded mb-6" />
      <div className="h-16 w-3/4 bg-foreground/10 rounded mb-4" />
      <div className="h-16 w-1/2 bg-foreground/10 rounded mb-10" />
      <div className="h-80 w-full bg-foreground/10 rounded-lg mb-16" />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-24 bg-foreground/10 rounded" />
        ))}
      </div>
    </div>
  );
}
