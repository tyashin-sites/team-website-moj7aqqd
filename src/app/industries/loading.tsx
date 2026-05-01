export default function Loading() {
  return (
    <div className="container-x section animate-pulse">
      <div className="h-4 w-24 bg-foreground/10 rounded mb-6" />
      <div className="h-16 md:h-24 w-3/4 bg-foreground/10 rounded-lg mb-6" />
      <div className="h-5 w-2/3 bg-foreground/10 rounded mb-16" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-72 rounded-lg bg-foreground/10" />
        ))}
      </div>
    </div>
  );
}
