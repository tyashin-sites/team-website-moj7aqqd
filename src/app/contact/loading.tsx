export default function Loading() {
  return (
    <div className="container-x section animate-pulse">
      <div className="h-4 w-24 bg-foreground/10 rounded mb-6" />
      <div className="h-16 w-3/4 bg-foreground/10 rounded mb-6" />
      <div className="h-5 w-1/2 bg-foreground/10 rounded mb-16" />
      <div className="grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-7 space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-14 bg-foreground/5 rounded-md" />
          ))}
        </div>
        <div className="lg:col-span-5 h-96 bg-foreground/5 rounded-lg" />
      </div>
    </div>
  );
}
