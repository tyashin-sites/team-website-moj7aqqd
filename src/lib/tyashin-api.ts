import { getCloudflareContext } from '@opennextjs/cloudflare';

/**
 * Server-only access to the Tyashin platform API for site API routes.
 *
 *   tyashinApi()          → { apiKey, apiUrl, waitUntil } from the Worker
 *                           bindings, falling back to process.env (next dev).
 *   visitorContext(req)   → the visitor's own IP, country and user agent.
 *
 * Why visitorContext exists: when this Worker calls the platform, the
 * platform sees the WORKER's connection, so its own `cf-connecting-ip` /
 * `cf-ipcountry` columns record Cloudflare's egress, not the visitor. Routes
 * forward the visitor's User-Agent and Referer as headers (the platform reads
 * those) and the IP + country inside `metadata.visitor`.
 */

export type TyashinApi = {
  apiKey?: string;
  apiUrl: string;
  waitUntil: (p: Promise<unknown>) => void;
};

export function tyashinApi(): TyashinApi {
  let env: Record<string, unknown> = {};
  let waitUntil: (p: Promise<unknown>) => void = (p) => {
    void p;
  };
  try {
    const cf = getCloudflareContext();
    env = cf.env as Record<string, unknown>;
    waitUntil = (p) => cf.ctx.waitUntil(p);
  } catch {
    // No Cloudflare context (plain next dev): process.env only.
  }
  const apiKey = (env.TYASHIN_API_KEY ?? process.env.TYASHIN_API_KEY) as string | undefined;
  const apiUrl = (env.TYASHIN_API_URL ?? process.env.TYASHIN_API_URL ?? 'https://website-api.tyashin.com') as string;
  return { apiKey: apiKey || undefined, apiUrl: apiUrl.replace(/\/+$/, ''), waitUntil };
}

export type VisitorContext = {
  ip?: string;
  country?: string;
  userAgent?: string;
};

export function visitorContext(request: Request): VisitorContext {
  const h = request.headers;
  const ip = h.get('cf-connecting-ip') || h.get('x-forwarded-for')?.split(',')[0]?.trim() || undefined;
  const country = h.get('cf-ipcountry') || undefined;
  const userAgent = h.get('user-agent')?.slice(0, 500) || undefined;
  return { ip, country: country && country !== 'XX' ? country : undefined, userAgent };
}
