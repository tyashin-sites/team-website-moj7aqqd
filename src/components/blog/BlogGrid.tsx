import Link from 'next/link';
import Image from 'next/image';
import { Calendar, User, Tag } from 'lucide-react';
import { Card, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { formatDate, truncateText } from '@/lib/format';
import type { BlogPost, PaginationMeta } from '@/lib/tyashin';

interface BlogGridProps {
  posts: BlogPost[];
  meta: PaginationMeta;
}

export function BlogGrid({ posts, meta }: BlogGridProps) {
  if (posts.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-foreground mb-4">No posts found</h2>
        <p className="text-muted">Check back later for new content.</p>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {/* Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <Card key={post._id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
            {post.featuredImage && (
              <div className="aspect-video relative bg-gray-100">
                <Image
                  src={post.featuredImage}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            
            <CardContent className="p-6">
              <div className="flex flex-wrap items-center gap-3 text-sm text-muted mb-3">
                {post.category && (
                  <div className="flex items-center gap-1">
                    <Tag className="w-3 h-3" />
                    <span className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs font-medium">
                      {post.category}
                    </span>
                  </div>
                )}
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  <span>{formatDate(post.publishedAt)}</span>
                </div>
                {post.author && (
                  <div className="flex items-center gap-1">
                    <User className="w-3 h-3" />
                    <span>{post.author}</span>
                  </div>
                )}
              </div>
              
              <h3 className="text-xl font-heading font-bold text-foreground mb-3 line-clamp-2">
                <Link href={`/blog/${post.slug}`} className="hover:text-primary transition-colors">
                  {post.title}
                </Link>
              </h3>
              
              {post.excerpt && (
                <p className="text-muted mb-4 line-clamp-3">
                  {truncateText(post.excerpt, 120)}
                </p>
              )}
              
              <Link href={`/blog/${post.slug}`} className="text-primary hover:text-primary/80 transition-colors font-medium">
                Read more →
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      {meta.totalPages > 1 && (
        <div className="flex justify-center items-center gap-4">
          {meta.page > 1 && (
            <Link href={`/blog?page=${meta.page - 1}`}>
              <Button variant="outline">Previous</Button>
            </Link>
          )}
          
          <span className="text-muted">
            Page {meta.page} of {meta.totalPages}
          </span>
          
          {meta.page < meta.totalPages && (
            <Link href={`/blog?page=${meta.page + 1}`}>
              <Button variant="outline">Next</Button>
            </Link>
          )}
        </div>
      )}
    </div>
  );
}