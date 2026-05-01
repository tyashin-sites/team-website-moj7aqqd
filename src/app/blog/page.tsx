import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import siteData from '@/../content/site.json';

export const metadata: Metadata = {
  title: 'Blog — Insights on 3D & AR Commerce',
  description:
    'Stories, playbooks, and research on building immersive 3D and AR product experiences that convert.',
};

export const revalidate = 60;

type Post = {
  _id?: string;
  slug: string;
  title: string;
  excerpt?: string;
  featuredImage?: string;
  coverImage?: string;
  image?: string;
  category?: string;
  publishedAt?: string;
  createdAt?: string;
  author?: { name?: string; avatar?: string } | string;
  readingTime?: number;
};

async function getPosts(page = 1): Promise<{ posts: Post[]; total: number; totalPages: number }> {
  const base = process.env.TYASHIN_API_URL;
  const key = process.env.TYASHIN_API_KEY;
  if (!base || !key) return { posts: [], total: 0, totalPages: 0 };

  try {
    const res = await fetch(`${base}/api/v1/public/blog/posts?page=${page}&limit=12`, {
      headers: { 'X-API-Key': key, 'Content-Type': 'application/json' },
      next: { revalidate: 60 },
    });
    if (!res.ok) return { posts: [], total: 0, totalPages: 0 };
    const json = await res.json();
    const posts: Post[] = json?.data?.posts || json?.data || [];
    const meta = json?.meta || {};
    return {
      posts,
      total: meta.total ?? posts.length,
      totalPages: meta.totalPages ?? 1,
    };
  } catch {
    return { posts: [], total: 0, totalPages: 0 };
  }
}

function formatDate(d?: string) {
  if (!d) return '';
  try {
    return new Date(d).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch {
    return '';
  }
}

function authorName(a: Post['author']): string | undefined {
  if (!a) return undefined;
  return typeof a === 'string' ? a : a.name;
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const sp = await searchParams;
  const currentPage = Math.max(1, parseInt(sp.page || '1', 10) || 1);
  const { posts, totalPages } = await getPosts(currentPage);
  const blogContent = (siteData as any).pages?.blog || {};

  const heroTitle: string = blogContent.hero?.title || 'Field notes from the spatial commerce frontier';
  const heroSubtitle: string =
    blogContent.hero?.subtitle ||
    'Tactical guides, customer stories, and research on building 3D and AR experiences that move the needle.';

  const [featured, ...rest] = posts;

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden aurora grain section">
        <div className="container-x relative z-10">
          <p className="eyebrow reveal">The Thridify Journal</p>
          <h1 className="h-display mt-5 max-w-4xl reveal" style={{ animationDelay: '80ms' }}>
            {heroTitle}
          </h1>
          <p
            className="mt-7 text-lg md:text-xl text-foreground/70 max-w-2xl leading-relaxed reveal"
            style={{ animationDelay: '160ms' }}
          >
            {heroSubtitle}
          </p>
        </div>
      </section>

      {/* Posts */}
      <section className="section pt-0">
        <div className="container-x">
          {posts.length === 0 ? (
            <div className="card p-16 text-center">
              <h2 className="h-2">New stories landing soon</h2>
              <p className="mt-4 text-foreground/70 max-w-md mx-auto">
                We&apos;re polishing our first batch of essays on 3D commerce, AR strategy, and conversion design. Check back shortly.
              </p>
              <a href="/contact" className="btn btn-primary mt-8 inline-flex">
                Talk to us instead
              </a>
            </div>
          ) : (
            <>
              {/* Featured */}
              {featured && (
                <Link
                  href={`/blog/${featured.slug}`}
                  className="group block card overflow-hidden mb-16 reveal"
                >
                  <div className="grid md:grid-cols-2 gap-0">
                    <div className="relative aspect-[4/3] md:aspect-auto bg-foreground/5 overflow-hidden">
                      {(featured.featuredImage || featured.coverImage || featured.image) ? (
                        <Image
                          src={(featured.featuredImage || featured.coverImage || featured.image)!}
                          alt={featured.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                          sizes="(min-width: 768px) 50vw, 100vw"
                          priority
                        />
                      ) : (
                        <div className="absolute inset-0 aurora" aria-hidden />
                      )}
                    </div>
                    <div className="p-8 md:p-12 flex flex-col justify-center">
                      <div className="flex items-center gap-3 text-xs">
                        <span className="eyebrow !text-primary">Featured</span>
                        {featured.category && (
                          <span className="text-foreground/60">· {featured.category}</span>
                        )}
                      </div>
                      <h2 className="h-1 mt-5 group-hover:text-primary transition-colors">
                        {featured.title}
                      </h2>
                      {featured.excerpt && (
                        <p className="mt-5 text-lg text-foreground/70 leading-relaxed line-clamp-3">
                          {featured.excerpt}
                        </p>
                      )}
                      <div className="mt-8 flex items-center gap-4 text-sm text-foreground/60">
                        {authorName(featured.author) && <span>{authorName(featured.author)}</span>}
                        {(featured.publishedAt || featured.createdAt) && (
                          <>
                            <span aria-hidden>·</span>
                            <time>{formatDate(featured.publishedAt || featured.createdAt)}</time>
                          </>
                        )}
                        {featured.readingTime && (
                          <>
                            <span aria-hidden>·</span>
                            <span>{featured.readingTime} min read</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              )}

              {/* Grid */}
              {rest.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {rest.map((post, i) => {
                    const img = post.featuredImage || post.coverImage || post.image;
                    return (
                      <Link
                        key={post._id || post.slug}
                        href={`/blog/${post.slug}`}
                        className="group card overflow-hidden flex flex-col reveal"
                        style={{ animationDelay: `${i * 60}ms` }}
                      >
                        <div className="relative aspect-[16/10] bg-foreground/5 overflow-hidden">
                          {img ? (
                            <Image
                              src={img}
                              alt={post.title}
                              fill
                              className="object-cover transition-transform duration-700 group-hover:scale-105"
                              sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                            />
                          ) : (
                            <div className="absolute inset-0 aurora" aria-hidden />
                          )}
                          {post.category && (
                            <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-background/90 backdrop-blur text-[11px] font-semibold uppercase tracking-wider">
                              {post.category}
                            </span>
                          )}
                        </div>
                        <div className="p-7 flex-1 flex flex-col">
                          <h3 className="font-heading text-xl font-bold leading-snug tracking-tight group-hover:text-primary transition-colors">
                            {post.title}
                          </h3>
                          {post.excerpt && (
                            <p className="mt-3 text-foreground/70 leading-relaxed line-clamp-3">
                              {post.excerpt}
                            </p>
                          )}
                          <div className="mt-6 pt-5 border-t border-foreground/10 flex items-center justify-between text-xs text-foreground/60">
                            <span>{formatDate(post.publishedAt || post.createdAt)}</span>
                            <span className="inline-flex items-center gap-1 font-medium text-foreground/80 group-hover:text-primary transition-colors">
                              Read
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M5 12h14M13 5l7 7-7 7" />
                              </svg>
                            </span>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <nav className="mt-16 flex items-center justify-center gap-2" aria-label="Pagination">
                  {currentPage > 1 && (
                    <Link
                      href={`/blog?page=${currentPage - 1}`}
                      className="btn btn-ghost"
                    >
                      ← Previous
                    </Link>
                  )}
                  <span className="px-5 py-2 text-sm text-foreground/60">
                    Page {currentPage} of {totalPages}
                  </span>
                  {currentPage < totalPages && (
                    <Link
                      href={`/blog?page=${currentPage + 1}`}
                      className="btn btn-primary"
                    >
                      Next →
                    </Link>
                  )}
                </nav>
              )}
            </>
          )}
        </div>
      </section>

      {/* Newsletter */}
      <section className="section pt-0">
        <div className="container-x">
          <div className="relative overflow-hidden rounded-lg bg-foreground text-background p-10 md:p-16 aurora grain">
            <div className="relative z-10 max-w-2xl">
              <p className="eyebrow !text-background/60">The Dispatch</p>
              <h2 className="h-2 mt-4">
                One sharp read on 3D & AR commerce, every other Thursday.
              </h2>
              <p className="mt-5 text-background/70 text-lg leading-relaxed">
                Join operators and product teams from leading brands. No fluff, unsubscribe anytime.
              </p>
              <form data-aapas-newsletter className="mt-8 flex flex-col sm:flex-row gap-3 max-w-lg">
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="you@brand.com"
                  className="flex-1 px-5 py-4 rounded-full bg-background/10 border border-background/20 text-background placeholder:text-background/50 focus:outline-none focus:border-background/60"
                />
                <button
                  type="submit"
                  className="btn bg-background text-foreground hover:bg-background/90"
                >
                  Subscribe
                </button>
                <div data-aapas-message className="sr-only" />
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
