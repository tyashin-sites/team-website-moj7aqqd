export default function Loading() {
  return (
    <div className="container-x section animate-pulse">
      <div className="h-12 bg-foreground/10 rounded-lg w-2/3 mb-6" />
      <div className="h-12 bg-foreground/10 rounded-lg w-1/2 mb-10" />
      <div className="h-6 bg-foreground/10 rounded w-1/2 mb-3" />
      <div className="h-6 bg-foreground/10 rounded w-1/3 mb-12" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-56 rounded-lg bg-foreground/10" />
        ))}
      </div>
    </div>
  );
}
