export default function Loading() {
  return (
    <>
      <section className="section">
        <div className="container-x animate-pulse">
          <div className="h-3 w-40 bg-foreground/10 rounded mb-6" />
          <div className="h-16 w-3/4 bg-foreground/10 rounded mb-5" />
          <div className="h-5 w-1/2 bg-foreground/10 rounded" />
        </div>
      </section>
      <section className="section pt-0">
        <div className="container-x">
          <div className="h-96 rounded-lg bg-foreground/10 animate-pulse mb-16" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="card overflow-hidden animate-pulse">
                <div className="aspect-[16/10] bg-foreground/10" />
                <div className="p-7 space-y-3">
                  <div className="h-5 bg-foreground/10 rounded w-3/4" />
                  <div className="h-4 bg-foreground/10 rounded" />
                  <div className="h-4 bg-foreground/10 rounded w-5/6" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
