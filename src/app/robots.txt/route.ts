import { SITE_URL } from '@/lib/schema';

/**
 * /robots.txt — CRAWL-ACCESS policy only.
 *
 * IMPORTANT SEPARATION OF CONCERNS: this file governs whether crawlers may
 * FETCH pages. It does NOT control indexing on the preview. The preview hosts
 * (*.workers.dev, *.sites.tyashin.com) additionally receive
 * `X-Robots-Tag: noindex, nofollow` from src/middleware.ts so the previews
 * stay out of search indexes while duplicating the live thridify.com. That
 * noindex header is a DIFFERENT mechanism and is intentionally NOT expressed
 * here.
 *
 * PHASE 7: at launch the middleware noindex header is removed (BUILD-PLAN
 * Phase 7) so the production domain is indexable — but THIS robots.txt, and
 * especially the AI-crawler allowlist below, STAYS.
 *
 * This route handler is served by the site's OWN Worker. The Tyashin platform
 * edge may intercept /robots.txt on the *.sites.tyashin.com host and serve its
 * own (see docs/ASSET-DEBT.md) — a Phase-7 custom-domain concern, not fixable
 * in this repo.
 */
export const dynamic = 'force-static';

// AI / LLM crawlers we explicitly welcome (content discoverability).
const AI_CRAWLERS = [
  'OAI-SearchBot',
  'ChatGPT-User',
  'GPTBot',
  'ClaudeBot',
  'Claude-Web',
  'Google-Extended',
  'PerplexityBot',
  'Applebot-Extended',
];

export function GET() {
  const aiBlocks = AI_CRAWLERS.map(
    (ua) => `User-agent: ${ua}\nAllow: /`,
  ).join('\n\n');

  const body = `# robots.txt for Thridify
# Crawl-access policy only. Preview indexing is controlled separately by the
# X-Robots-Tag: noindex header in middleware (removed at Phase-7 launch; this
# robots.txt and its AI-crawler allowlist stay).

User-agent: *
Allow: /
Disallow: /api/
Disallow: /gallery

# AI / LLM crawlers — explicitly allowed for content discoverability.
${aiBlocks}

Sitemap: ${SITE_URL}/sitemap.xml
`;

  return new Response(body, {
    headers: {
      'content-type': 'text/plain; charset=utf-8',
      'cache-control': 'public, max-age=3600',
    },
  });
}
