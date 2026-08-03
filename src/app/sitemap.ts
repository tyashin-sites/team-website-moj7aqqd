import type { MetadataRoute } from 'next';
import { INDUSTRY_SLUGS } from '@/lib/industries';
import { INTEGRATION_SLUGS } from '@/lib/integrations';
import { COMPETITOR_SLUGS } from '@/lib/comparisons';

// Absolute host for sitemap entries. On the Phase 7 cutover set
// SITE_URL=https://www.thridify.com in the deploy environment.
const SITE_URL =
  process.env.SITE_URL ?? 'https://site-thridify.snowy-cherry-cd2c.workers.dev';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes: Array<{ path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] }> = [
    { path: '/', priority: 1.0, changeFrequency: 'weekly' },
    { path: '/platform', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/what-is-thridify', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/services/3d-modelling', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/industries', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/integrations', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/about', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/blog', priority: 0.7, changeFrequency: 'weekly' },
    { path: '/contact', priority: 0.6, changeFrequency: 'monthly' },
    { path: '/security', priority: 0.3, changeFrequency: 'yearly' },
    { path: '/privacy', priority: 0.3, changeFrequency: 'yearly' },
    { path: '/terms', priority: 0.3, changeFrequency: 'yearly' },
  ];

  const industryRoutes = INDUSTRY_SLUGS.map((slug) => ({
    path: `/industries/${slug}`,
    priority: 0.8,
    changeFrequency: 'monthly' as const,
  }));

  const integrationRoutes = INTEGRATION_SLUGS.map((slug) => ({
    path: `/integrations/${slug}`,
    priority: 0.8,
    changeFrequency: 'monthly' as const,
  }));

  const compareRoutes = COMPETITOR_SLUGS.map((slug) => ({
    path: `/compare/${slug}`,
    priority: 0.7,
    changeFrequency: 'monthly' as const,
  }));

  return [...staticRoutes, ...industryRoutes, ...integrationRoutes, ...compareRoutes].map((r) => ({
    url: `${SITE_URL}${r.path}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
