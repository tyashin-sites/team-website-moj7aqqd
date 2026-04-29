import type { Metadata } from 'next';
import { Hero } from '@/components/sections/Hero';
import { BlogGrid } from '@/components/blog/BlogGrid';
import { getBlogPosts } from '@/lib/tyashin';

export const metadata: Metadata = {
  title: 'Blog - Latest Insights & Updates',
  description: 'Stay updated with the latest trends in 3D commerce, AR technology, and e-commerce innovation.',
};

interface BlogPageProps {
  searchParams: { page?: string };
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const page = parseInt(searchParams.page || '1', 10);
  const { posts, meta } = await getBlogPosts({ page, limit: 12 });

  const heroData = {
    title: 'Latest Insights & Updates',
    subtitle: 'Stay updated with the latest trends in 3D commerce, AR technology, and e-commerce innovation.',
    variant: 'minimal' as const,
  };

  return (
    <div className="overflow-hidden">
      <Hero data={heroData} />
      <section className="py-20">
        <div className="container mx-auto px-4">
          <BlogGrid posts={posts} meta={meta} />
        </div>
      </section>
    </div>
  );
}