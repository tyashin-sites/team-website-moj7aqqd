import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Calendar, User, Tag } from 'lucide-react';
import { getBlogPost, getBlogPosts } from '@/lib/tyashin';
import { formatDate } from '@/lib/format';
import { ShareButtons } from '@/components/blog/ShareButtons';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  try {
    const { posts } = await getBlogPosts({ limit: 100 });
    return posts.map((post) => ({
      slug: post.slug,
    }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const post = await getBlogPost(slug);
    return {
      title: post.title,
      description: post.excerpt || post.title,
      openGraph: {
        title: post.title,
        description: post.excerpt || post.title,
        images: post.featuredImage ? [post.featuredImage] : [],
        type: 'article',
        publishedTime: post.publishedAt,
      },
      twitter: {
        card: 'summary_large_image',
        title: post.title,
        description: post.excerpt || post.title,
        images: post.featuredImage ? [post.featuredImage] : [],
      },
    };
  } catch {
    return {
      title: 'Post Not Found',
      description: 'The requested blog post could not be found.',
    };
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  try {
    const post = await getBlogPost(slug);

    return (
      <article className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>

          <header className="mb-12">
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted mb-6">
              {post.category && (
                <div className="flex items-center gap-1">
                  <Tag className="w-4 h-4" />
                  <span className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs font-medium">
                    {post.category}
                  </span>
                </div>
              )}
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(post.publishedAt)}</span>
              </div>
              {post.author && (
                <div className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  <span>{post.author}</span>
                </div>
              )}
            </div>
            
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-6">
              {post.title}
            </h1>
            
            {post.excerpt && (
              <p className="text-xl text-muted leading-relaxed">
                {post.excerpt}
              </p>
            )}
          </header>

          {post.featuredImage && (
            <div className="mb-12">
              <Image
                src={post.featuredImage}
                alt={post.title}
                width={800}
                height={400}
                className="w-full h-auto rounded-lg shadow-lg"
                priority
              />
            </div>
          )}

          <div
            className="prose prose-lg max-w-none mb-12"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <div className="border-t pt-8">
            <h3 className="text-lg font-semibold mb-4">Share this post</h3>
            <ShareButtons title={post.title} url={`/blog/${slug}`} />
          </div>
        </div>
      </article>
    );
  } catch {
    notFound();
  }
}