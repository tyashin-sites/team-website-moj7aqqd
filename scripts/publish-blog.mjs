#!/usr/bin/env node
/**
 * Publish `content/blog/*.md` to the Tyashin blog API.
 *
 * The posts live in this repo as Markdown with front matter so they are
 * reviewable in a diff before they are anywhere public, and so a re-run is
 * idempotent: a slug that already exists is PUT, never duplicated.
 *
 * The platform blog page inserts `post.content` as raw HTML and does NOT
 * convert Markdown, so we convert here. A small purpose-built converter rather
 * than a dependency — the output HTML is exactly the tag set the blog CSS
 * styles (h2/h3/p/ul/ol/blockquote/a/strong/em/code), and nothing else can
 * sneak in.
 *
 * Usage:
 *   node scripts/publish-blog.mjs --jwt "<token>" [--dry-run] [--only <slug>]
 *
 * JWTs last ~15 minutes. Get a fresh one at the moment of use:
 *   admin.tyashin.com -> devtools -> localStorage['auth-storage'].state.accessToken
 */

import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join, basename } from 'node:path';

const API = process.env.TYASHIN_API_URL || 'https://website-api.tyashin.com';
const PROJECT_ID = process.env.THRIDIFY_PROJECT_ID || '69f1354e7766b41fbc101ded';
const SITE_ORIGIN = process.env.THRIDIFY_SITE_ORIGIN || 'https://thridify.com';
const DIR = join(process.cwd(), 'content', 'blog');

const args = process.argv.slice(2);
const flag = (n) => args.includes(n);
const val = (n) => {
  const i = args.indexOf(n);
  return i >= 0 ? args[i + 1] : undefined;
};

const JWT = val('--jwt') || process.env.TYASHIN_JWT;
const DRY = flag('--dry-run');
const ONLY = val('--only');

if (!JWT && !DRY) {
  console.error('Missing --jwt (or TYASHIN_JWT). Use --dry-run to validate without publishing.');
  process.exit(1);
}

// -- front matter ---------------------------------------------------------
function parseFrontMatter(raw) {
  const m = /^---\n([\s\S]*?)\n---\n?([\s\S]*)$/.exec(raw);
  if (!m) throw new Error('missing front matter');
  const meta = {};
  for (const line of m[1].split('\n')) {
    const mm = /^([A-Za-z][A-Za-z0-9_]*):\s*(.*)$/.exec(line);
    if (!mm) continue;
    let v = mm[2].trim();
    if (v.startsWith('[') && v.endsWith(']')) {
      v = v
        .slice(1, -1)
        .split(',')
        .map((s) => s.trim().replace(/^["']|["']$/g, ''))
        .filter(Boolean);
    } else {
      v = v.replace(/^["']|["']$/g, '');
    }
    meta[mm[1]] = v;
  }
  return { meta, body: m[2].trim() };
}

// -- markdown -> html -----------------------------------------------------
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/**
 * Inline: code, links, bold, italic.
 *
 * Code spans are lifted out FIRST and put back LAST, so their contents can
 * never be re-read as markup or double-escaped. The placeholder is a token
 * that cannot occur in prose.
 */
function inline(text) {
  const codes = [];
  let s = text.replace(/`([^`]+)`/g, (_, c) => {
    codes.push(c);
    return `@@CODE${codes.length - 1}@@`;
  });
  s = esc(s);
  s = s.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_, label, href) => {
    const external = /^https?:\/\//.test(href) && !href.includes('thridify.com');
    const rel = external ? ' target="_blank" rel="noopener noreferrer"' : '';
    return `<a href="${href}"${rel}>${label}</a>`;
  });
  s = s.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  s = s.replace(/(^|[\s(])\*([^*\n]+)\*/g, '$1<em>$2</em>');
  return s.replace(/@@CODE(\d+)@@/g, (_, i) => `<code>${esc(codes[Number(i)])}</code>`);
}

function toHtml(md) {
  const out = [];
  const lines = md.split('\n');
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (!line.trim()) {
      i++;
      continue;
    }
    const heading = /^(#{2,4})\s+(.*)$/.exec(line);
    if (heading) {
      const level = heading[1].length;
      out.push(`<h${level}>${inline(heading[2].trim())}</h${level}>`);
      i++;
    } else if (/^[-*]\s+/.test(line)) {
      const items = [];
      while (i < lines.length && /^[-*]\s+/.test(lines[i])) {
        items.push(`<li>${inline(lines[i].replace(/^[-*]\s+/, ''))}</li>`);
        i++;
      }
      out.push(`<ul>${items.join('')}</ul>`);
    } else if (/^\d+\.\s+/.test(line)) {
      const items = [];
      while (i < lines.length && /^\d+\.\s+/.test(lines[i])) {
        items.push(`<li>${inline(lines[i].replace(/^\d+\.\s+/, ''))}</li>`);
        i++;
      }
      out.push(`<ol>${items.join('')}</ol>`);
    } else if (/^\|.*\|\s*$/.test(line) && /^\|[\s:|-]+\|\s*$/.test(lines[i + 1] || '')) {
      // Pipe table: header row, separator row, then body rows. Wrapped in a
      // scroll container because the blog CSS has no table styling and a wide
      // table is the classic way to make a post scroll sideways on a phone.
      const cells = (row) =>
        row
          .trim()
          .replace(/^\||\|$/g, '')
          .split('|')
          .map((c) => c.trim());
      const head = cells(lines[i]);
      i += 2;
      const body = [];
      while (i < lines.length && /^\|.*\|\s*$/.test(lines[i])) {
        body.push(cells(lines[i]));
        i++;
      }
      const th = head.map((c) => `<th>${inline(c)}</th>`).join('');
      const tr = body
        .map((r) => `<tr>${r.map((c) => `<td>${inline(c)}</td>`).join('')}</tr>`)
        .join('');
      out.push(
        `<div style="overflow-x:auto"><table style="width:100%;border-collapse:collapse">` +
          `<thead><tr>${th}</tr></thead><tbody>${tr}</tbody></table></div>`
      );
    } else if (/^>\s?/.test(line)) {
      const buf = [];
      while (i < lines.length && /^>\s?/.test(lines[i])) {
        buf.push(lines[i].replace(/^>\s?/, ''));
        i++;
      }
      out.push(`<blockquote><p>${inline(buf.join(' '))}</p></blockquote>`);
    } else {
      const buf = [];
      while (
        i < lines.length &&
        lines[i].trim() &&
        !/^(#{2,4}\s|[-*]\s|\d+\.\s|>\s?|\|)/.test(lines[i])
      ) {
        buf.push(lines[i].trim());
        i++;
      }
      out.push(`<p>${inline(buf.join(' '))}</p>`);
    }
  }
  return out.join('\n');
}

// -- validation: fail loudly rather than publishing something malformed ----
function validate(slug, meta, html) {
  const errs = [];
  if (!meta.title) errs.push('title missing');
  if (!meta.metaDescription) errs.push('metaDescription missing');
  if (meta.metaTitle && meta.metaTitle.length > 70)
    errs.push(`metaTitle ${meta.metaTitle.length} > 70`);
  if (meta.metaDescription && meta.metaDescription.length > 160)
    errs.push(`metaDescription ${meta.metaDescription.length} > 160`);
  if (meta.excerpt && meta.excerpt.length > 500) errs.push(`excerpt ${meta.excerpt.length} > 500`);
  if (/\[\s*(?:…|\.\.\.)\s*\]/.test(meta.excerpt || ''))
    errs.push('excerpt carries a bracketed-ellipsis artifact');
  const words = html
    .replace(/<[^>]+>/g, ' ')
    .split(/\s+/)
    .filter(Boolean).length;
  if (words < 700) errs.push(`only ${words} words`);
  if (!/<h2>/.test(html)) errs.push('no H2 headings');
  if (errs.length) throw new Error(`${slug}: ${errs.join('; ')}`);
  return words;
}

// -- api ------------------------------------------------------------------
async function api(path, init = {}) {
  const res = await fetch(`${API}/api/v1${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${JWT}`,
      'Content-Type': 'application/json',
      ...(init.headers || {}),
    },
  });
  const text = await res.text();
  let json;
  try {
    json = JSON.parse(text);
  } catch {
    json = { raw: text };
  }
  // Rule 5: never let a write fail silently.
  if (!res.ok) throw new Error(`HTTP ${res.status} ${path} -- ${text.slice(0, 400)}`);
  return json;
}

async function existingSlugs() {
  const found = new Map();
  for (let page = 1; page <= 20; page++) {
    const r = await api(`/blog/projects/${PROJECT_ID}/posts?page=${page}&limit=100`);
    const posts = r?.data?.posts || r?.data || [];
    for (const p of posts) found.set(p.slug, p._id || p.id);
    if (posts.length < 100) break;
  }
  return found;
}

// -- main -----------------------------------------------------------------
const files = readdirSync(DIR)
  .filter((f) => f.endsWith('.md'))
  .filter((f) => !ONLY || basename(f, '.md') === ONLY)
  .sort();

if (files.length === 0) {
  console.error(ONLY ? `No post matching --only ${ONLY}` : 'No posts in content/blog');
  process.exit(1);
}

/**
 * Cover image. `image:` in front matter wins; otherwise the conventional OG
 * card `public/og/blog-<slug>.png` is used IF it exists on disk, so adding a
 * cover is just `node scripts/generate-og.mjs blog-<slug>` + a re-run.
 *
 * Absolute, because the API validates featuredImage as a URL and the blog is
 * rendered by the PLATFORM on its own origin — a root-relative path would not
 * resolve there.
 */
function resolveCover(slug, meta) {
  if (meta.image) {
    return /^https?:\/\//.test(meta.image) ? meta.image : `${SITE_ORIGIN}${meta.image}`;
  }
  const local = join(process.cwd(), 'public', 'og', `blog-${slug}.png`);
  return existsSync(local) ? `${SITE_ORIGIN}/og/blog-${slug}.png` : undefined;
}

const prepared = files.map((f) => {
  const slug = basename(f, '.md');
  const { meta, body } = parseFrontMatter(readFileSync(join(DIR, f), 'utf8'));
  const html = toHtml(body);
  const words = validate(slug, meta, html);
  return { slug, meta, html, words, coverUrl: resolveCover(slug, meta) };
});

console.log(`Prepared ${prepared.length} post(s):`);
for (const p of prepared) {
  console.log(
    `  ${p.slug}  ${String(p.words).padStart(5)}w  ` +
      `title ${(p.meta.metaTitle || p.meta.title).length}c  ` +
      `desc ${p.meta.metaDescription.length}c  ` +
      `${p.coverUrl ? 'cover' : 'NO COVER'}  ` +
      `${p.meta.publishAt ? `-> ${p.meta.publishAt}` : '-> publish now'}`
  );
}

if (DRY) {
  console.log('\n--dry-run: validated only, nothing sent.');
  process.exit(0);
}

const existing = await existingSlugs();
let created = 0;
let updated = 0;

for (const p of prepared) {
  const scheduled = p.meta.publishAt && new Date(p.meta.publishAt) > new Date();
  const payload = {
    title: p.meta.title,
    slug: p.slug,
    excerpt: p.meta.excerpt,
    content: p.html,
    contentFormat: 'html',
    status: scheduled ? 'scheduled' : 'published',
    ...(scheduled ? { scheduledAt: new Date(p.meta.publishAt).toISOString() } : {}),
    tags: Array.isArray(p.meta.tags) ? p.meta.tags : [],
    ...(p.coverUrl ? { featuredImage: p.coverUrl } : {}),
    seo: {
      metaTitle: p.meta.metaTitle || p.meta.title,
      metaDescription: p.meta.metaDescription,
      ...(p.coverUrl ? { ogImage: p.coverUrl } : {}),
    },
  };

  const id = existing.get(p.slug);
  if (id) {
    await api(`/blog/projects/${PROJECT_ID}/posts/${id}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
    });
    updated++;
    console.log(`  updated  ${p.slug}`);
  } else {
    await api(`/blog/projects/${PROJECT_ID}/posts`, {
      method: 'POST',
      body: JSON.stringify(payload),
    });
    created++;
    console.log(`  created  ${p.slug}  ${scheduled ? `(scheduled ${p.meta.publishAt})` : '(live)'}`);
  }
}

// Rule 5: verify the write with a readback rather than trusting the 2xx.
const after = await existingSlugs();
const missing = prepared.filter((p) => !after.has(p.slug)).map((p) => p.slug);
if (missing.length) {
  console.error(`\nFAILED readback -- not present after write: ${missing.join(', ')}`);
  process.exit(1);
}
console.log(`\nDone. created=${created} updated=${updated} verified=${prepared.length}`);
