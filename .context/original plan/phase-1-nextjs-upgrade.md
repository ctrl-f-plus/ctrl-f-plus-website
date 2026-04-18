# Phase 1: Next.js Upgrade + Contentlayer Replacement

## Context

This is Phase 1 of a larger migration (full plan: `.conext/plans/vercel-to-aws-migration-v4.md`).

**Current state:** Next.js 13.4.19, React 18.2, Contentlayer 0.3.4, deployed on Vercel Pro.
**Target state:** Next.js 16, React 19, `@next/mdx` (no Contentlayer), `output: 'export'`, build-time OG images, Cloudflare Web Analytics.
**Verification:** Before/after Playwright screenshots proving visual parity. Local build verification with `npx serve out`.

The site is a static portfolio/blog with 3 MDX posts. No SSR, no ISR, no API routes (except one Edge Runtime OG route being removed).

**IMPORTANT: Do NOT commit or push any code.** The owner will review all changes, commit, and deploy manually. All verification is local only (before screenshots from the live site, after screenshots from `npx serve out`). Do NOT use `git push`, `git commit`, or any Vercel deploy commands.

---

## Before starting: Capture "before" screenshots

Use Playwright to capture full-page screenshots of the live site. Save to `.conext/screenshots/before/`.

```bash
mkdir -p .conext/screenshots/before .conext/screenshots/after
npx playwright screenshot --browser chromium --full-page https://benjamin-chavez.com .conext/screenshots/before/home.png
npx playwright screenshot --browser chromium --full-page https://benjamin-chavez.com/blog .conext/screenshots/before/blog-list.png
npx playwright screenshot --browser chromium --full-page "https://benjamin-chavez.com/blog/creating-a-typescript-express.js-web-application-with-es6-step-by-step-guide" .conext/screenshots/before/post-express.png
npx playwright screenshot --browser chromium --full-page "https://benjamin-chavez.com/blog/integrating-next.js-with-express.js-using-auth0-for-authentication" .conext/screenshots/before/post-auth0.png
```

---

## Step 1: Replace Contentlayer with `@next/mdx`

### Content architecture

Two parallel systems work together:

1. **Metadata collection** (`src/lib/posts.ts`): Reads raw `.mdx` files with `fs` + `gray-matter` at build time. Provides slugs, frontmatter, reading time, structured data for blog list, sitemap, and `generateStaticParams`.

2. **Content rendering** (`@next/mdx` via webpack): Compiles `.mdx` files into React components. Dynamic import in `[slug]/page.tsx`: `await import(`@/content/${slug}.mdx`)`. Custom elements provided by `mdx-components.tsx` (project root).

3. **Frontmatter handling**: YAML frontmatter stays in MDX files unchanged. `remark-frontmatter` plugin strips YAML during MDX compilation (so it doesn't render as text). `gray-matter` separately parses raw files for metadata.

### 1a. Remove Contentlayer

- Uninstall: `pnpm remove contentlayer next-contentlayer`
- Delete: `contentlayer.config.js`
- Delete: `src/lib/mdxPlugins/` directory (dead code — never imported, functionality is in `rehype-clipboard-prep-code` npm package)
- `tsconfig.json`: remove `"contentlayer/generated": ["./.contentlayer/generated"]` from `paths`, remove `.contentlayer/generated` and `contentlayer.config.js` from `include`

### 1b. Install new dependencies

```bash
pnpm add @next/mdx @mdx-js/loader @mdx-js/react @types/mdx gray-matter remark-frontmatter satori tsx
```

Keep existing: `reading-time`, `remark-gfm`, `remark-flexible-code-titles`, `rehype-pretty-code`, `rehype-slug`, `rehype-autolink-headings`, `rehype-clipboard-prep-code`, `shiki`, `unist-util-visit`.

Also remove accidental deps: `pnpm remove i npm`

### 1c. Create `src/lib/posts.ts`

```typescript
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';

export interface Post {
  title: string;
  author: string;
  description: string;
  summary: string;
  image?: string;
  publishedAt: string;
  updatedAt: string;
  slug: string;
  readingTime: { text: string; minutes: number; words: number };
  structuredData: Record<string, unknown>;
}

const CONTENT_DIR = path.join(process.cwd(), 'src/content');

export function getAllPosts(): Post[] {
  return fs.readdirSync(CONTENT_DIR)
    .filter(f => f.endsWith('.mdx'))
    .map(filename => {
      const slug = filename.replace(/\.mdx$/, '');
      const raw = fs.readFileSync(path.join(CONTENT_DIR, filename), 'utf-8');
      const { data, content } = matter(raw);
      const rt = readingTime(content);  // body only, not frontmatter

      return {
        ...(data as Omit<Post, 'slug' | 'readingTime' | 'structuredData'>),
        slug,
        readingTime: { text: rt.text, minutes: Math.ceil(rt.minutes), words: rt.words },
        structuredData: {
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: data.title,
          datePublished: data.publishedAt,
          dateModified: data.updatedAt,
          description: data.summary,
          image: data.image
            ? `https://benjamin-chavez.com${data.image}`
            : `https://benjamin-chavez.com/og/${slug}.png`,
          url: `https://benjamin-chavez.com/blog/${slug}`,
          author: { '@type': 'Person', name: 'Benjamin Chavez' },
        },
      };
    })
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

export function getPostBySlug(slug: string): Post | undefined {
  return getAllPosts().find(p => p.slug === slug);
}
```

### 1d. Create `mdx-components.tsx` (project root)

Move the component map from `src/components/mdx.tsx`. Per [official Next.js 16 docs](https://nextjs.org/docs/app/api-reference/file-conventions/mdx-components), `useMDXComponents` takes **no arguments**.

**Import conventions to match:** The repo uses `import clsx from 'clsx'` (default import) and `import { cx } from 'cva.config'`. Do NOT use `import { clsx } from 'clsx'`.

See the full component map in `.conext/plans/vercel-to-aws-migration-v4.md` Step 1.1.

### 1e. Create `next.config.mjs` (rename from `next.config.js`)

Key points:
- Replace `withContentlayer()` with `createMDX()` from `@next/mdx`
- Add `remarkFrontmatter` as FIRST remark plugin (strips YAML)
- Preserve exact rehype plugin order — `rehype-clipboard-prep-code` plugins bracket `rehype-pretty-code`:
  1. `rehypeAttachRawStringsToCodeContainer` (before pretty-code)
  2. `rehypeSlug`
  3. `rehypePrettyCode` with greenery theme from `./src/styles/greenery-theme.json`
  4. `rehypeEnrichCodeContainerMetadata` (after pretty-code)
  5. `rehypeAutolinkHeadings`
- Add `output: 'export'`
- Add `images: { unoptimized: true }`
- Add `pageExtensions: ['ts', 'tsx', 'mdx']`
- Remove `headers()` and `redirects()` (inert with static export)

See full config in `.conext/plans/vercel-to-aws-migration-v4.md` Step 1.1.

### 1f. Update `src/app/blog/[slug]/page.tsx`

- Replace contentlayer imports with `getAllPosts()`, `getPostBySlug()` from `@/lib/posts`
- Add `generateStaticParams()` returning all slugs
- Add `export const dynamicParams = false`
- `params` must be `Promise<{ slug: string }>` (Next.js 16 async params)
- Replace `<Mdx code={post.body.code} />` with:
  ```tsx
  const { default: PostContent } = await import(`@/content/${slug}.mdx`);
  <PostContent />
  ```
- Preserve the BackButton component, title, dates, readingTime display

See full component in `.conext/plans/vercel-to-aws-migration-v4.md` Step 1.1.

### 1g. Update `src/app/blog/page.tsx`

Replace `import { allBlogs } from 'contentlayer/generated'` with `import { getAllPosts } from '@/lib/posts'`.

### 1h. Update `src/app/sitemap.ts`

Replace `allBlogs` with `getAllPosts()`.

### 1i. Delete `src/components/mdx.tsx`

Functionality moved to `mdx-components.tsx`. The `useMDXComponent(code)` pattern no longer applies.

---

## Step 2: Upgrade Next.js 13.4 → 16 + React 19

1. Run codemod: `npx @next/codemod@canary upgrade latest`
2. `pnpm add react@19 react-dom@19 @types/react@19 @types/react-dom@19`
3. Update deps:
   - `framer-motion` → latest React 19 compatible version
   - Remove `next-cloudinary` (replaced in Step 3)
   - `rehype-pretty-code` → latest, verify shiki compat
   - Remove `pnpm.overrides` for OpenTelemetry if no longer needed

---

## Step 3: Replace banner image + build-time OG images

### 3a. Replace CldImage in `src/components/banner-image.tsx`

```tsx
'use client';
export default function BannerImage() {
  return (
    <img
      src="https://res.cloudinary.com/dyy8g76av/image/upload/f_avif,q_auto,w_3000/Banner-image-cropped_fiuipi"
      alt="Benjamin Chavez Full Stack Developer"
      width={3000}
      height={657}
      className="absolute top-0 -z-20 aspect-auto h-full w-full object-cover md:fixed lg:top-0 xl:top-4 2xl:top-9"
    />
  );
}
```

Remove `next-cloudinary` package. Remove/update `.env` (NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME no longer needed).

### 3b. Create `scripts/generate-og-images.ts`

- Use `satori` + `sharp`
- Read post titles from `getAllPosts()`
- Output to `public/og/{slug}.png`
- Update build script: `"build": "tsx scripts/generate-og-images.ts && next build"`

### 3c. Delete `src/app/og/route.tsx`

Edge Runtime route — incompatible with static export.

---

## Step 4: Replace Vercel Analytics

1. `pnpm remove @vercel/analytics @vercel/speed-insights`
2. Remove `<Analytics />` and `<SpeedInsights />` from `src/app/layout.tsx`
3. Add Cloudflare Web Analytics `<Script>` tag in layout (token TBD — owner will set up Cloudflare account)

---

## Step 5: Local verification

```bash
pnpm build
npx serve out -l 3000
```

Then capture "after" screenshots:

```bash
npx playwright screenshot --browser chromium --full-page http://localhost:3000 .conext/screenshots/after/home.png
npx playwright screenshot --browser chromium --full-page http://localhost:3000/blog .conext/screenshots/after/blog-list.png
npx playwright screenshot --browser chromium --full-page "http://localhost:3000/blog/creating-a-typescript-express.js-web-application-with-es6-step-by-step-guide" .conext/screenshots/after/post-express.png
npx playwright screenshot --browser chromium --full-page "http://localhost:3000/blog/integrating-next.js-with-express.js-using-auth0-for-authentication" .conext/screenshots/after/post-auth0.png
```

### Verification checklist
- [ ] Build succeeds, `out/` directory populated
- [ ] `out/index.html`, `out/blog/index.html`, `out/blog/{slug}/index.html` exist
- [ ] `out/og/{slug}.png` exists for each post
- [ ] All pages render, no console errors
- [ ] Blog list: correct posts, correct sort order
- [ ] Blog posts: syntax highlighting, code titles, copy-to-clipboard
- [ ] Banner image loads from Cloudinary
- [ ] Portfolio thumbnails render with blur placeholders
- [ ] `view-source:` shows `og:image` meta tags
- [ ] `out/sitemap.xml` lists all blog URLs
- [ ] Before/after screenshots compared — visual parity confirmed

---

## Step 6: Agent team code review

After implementation is complete and locally verified, spin up a review team:

```
Create an agent team with 3 reviewers to review the Phase 1 changes. Each reviewer should:
1. Read the git diff of all changes
2. Review from their specific perspective
3. Report findings

Reviewer perspectives:
- **Migration Correctness Reviewer**: Verify the Contentlayer → @next/mdx migration is complete. Check that all contentlayer imports are removed, all data flows are wired correctly (getAllPosts, getPostBySlug, generateStaticParams, sitemap), MDX rendering works via dynamic import, and no dead references remain. Cross-reference against the plan at .conext/plans/phase-1-nextjs-upgrade.md.

- **Framework Compatibility Reviewer**: Verify Next.js 16 + React 19 compatibility. Check async params usage, mdx-components.tsx API shape (no-argument useMDXComponents), static export compatibility (no server-only features leaked), remark/rehype plugin configuration, and that output: 'export' produces correct file structure.

- **Silent Failure Hunter**: Look for things that will fail silently in production. Check: CSP headers blocking the Cloudflare analytics script, rehype plugin ordering issues that would break copy-to-clipboard without visible errors, missing generateStaticParams that would cause 404s, incorrect OG image paths in metadata/structuredData, broken Cloudinary URLs in the banner replacement.
```

---

## Step 7: Additional fixes from code review

These were discovered during the agent team code review (Step 6) and implemented afterward.

### 7a. Prevent draft posts from being publicly accessible

`generateStaticParams` was building pages for ALL posts including future-dated drafts. The chrome extension post (`publishedAt: '2026-09-19'`) was live, indexable, and had placeholder metadata.

- Created `getPublishedPosts()` in `src/lib/posts.ts` — filters by `publishedAt <= now` (with dev mode bypass)
- Updated `generateStaticParams`, blog list page, and sitemap to use `getPublishedPosts()` instead of `getAllPosts()`
- `getPostBySlug()` also uses `getPublishedPosts()` so direct URL access returns 404 for drafts

### 7b. Preserve permanent redirects as static HTML

The old `next.config.js` had two `redirects()` entries that are inert with `output: 'export'`. Without replacement, existing backlinks and bookmarks would 404 silently.

- Created `public/blog/step-by-step-guide-setting-up-expressjs-typescript-web-app/index.html` with `<meta http-equiv="refresh">` redirect
- Created `public/downloads/epay-mailer/index.html` with same pattern
- Phase 2 should handle these in CloudFront Functions for proper 301 responses

### 7c. Fix trailing slash mismatch in metadata URLs

With `trailingSlash: true`, the served URLs have trailing slashes but hardcoded metadata URLs did not, causing potential SEO signal mismatch.

- Added trailing slashes to `og:url` in `generateMetadata` (`[slug]/page.tsx`)
- Added trailing slashes to `structuredData.url` in `posts.ts`
- Added trailing slashes to sitemap blog URLs in `sitemap.ts`

### 7d. Fix `next/script` usage for Cloudflare analytics

- Replaced inert `defer` HTML attribute with `strategy="afterInteractive"` (the `defer` attribute is ignored by `next/script`)

### 7e. Remove stale `@ts-ignore` and fix `moduleResolution`

- Removed `@ts-ignore` on `usePathname` import in `src/components/navbar/index.tsx`
- Updated `tsconfig.json`: `moduleResolution: "node"` → `"bundler"` (recommended for Next.js, fixes sub-path export resolution)

### 7f. Fix Next.js 16 `scroll-behavior` warning

- Added `data-scroll-behavior="smooth"` to `<html>` element in `layout.tsx` (Next.js 16 recommendation to disable smooth scrolling during route transitions)

### 7g. Clean up dead code

- Deleted `constants.ts` — `REMARK_CODE_TITLE_TAG_NAME` was hardcoded in `next.config.mjs`, no longer imported anywhere
- Changed relative CSS import `'../../../styles/mdx.css'` → `'@/styles/mdx.css'` in `[slug]/page.tsx`

### 7h. Fix Headless UI v2 breaking change

- Updated `src/components/navbar/mobile-menu.tsx`: `Dialog.Panel` → `DialogPanel` (named export in Headless UI v2)

### 7i. Fix React 19 breaking changes

- `src/components/container.tsx`: `JSX.IntrinsicElements` → `React.JSX.IntrinsicElements`
- `src/components/navbar/index.tsx`: ref callback `(el) => (ref = el)` → `(el) => { ref = el; }` (React 19 ref callbacks must not return a value)

---

## Step 8: Dependency upgrades

### 8a. TypeScript 5.2.2 → 5.8.3

- TS 6.0 has peer dep conflicts with `typescript-eslint` and `cva`; 5.8.x is the latest compatible version

### 8b. `@types/node` 20.5.9 → 22.19.15

- Aligns with Node.js 22 LTS type definitions

### 8c. `sharp` 0.32 → 0.34

- Old version lacked native binaries for current platform (darwin-arm64)

### 8d. `remark-gfm` 3 → 4

- v3 incompatible with `@mdx-js/mdx@3` (`this.getData is not a function` error)

### 8e. `framer-motion` removed entirely

- Not imported anywhere in source code — was an unused dependency

### 8f. Node.js engine set to 24.x

- Added `engines.node: "24.x"` and `engines.pnpm: ">=10.0.0"` to `package.json`
- Vercel dashboard Node.js version must also be updated from 18.x to 24.x

### 8g. Other removals

- Removed `esbuild` (was a Contentlayer dependency)
- Removed `pnpm.overrides` for OpenTelemetry (was for Contentlayer compatibility)
- Removed `next-cloudinary` (replaced with plain `<img>` tag)

---

## Step 9: PR review toolkit + agent team resolution

Run the full `pr-review-toolkit` suite against the Phase 1 changes, then spin up an agent team to work through any findings.

### 9a. Run the PR review toolkit

Run all 6 PR review toolkit agents in parallel against the current diff:

```
Launch 6 agents in parallel using the pr-review-toolkit agents:

1. **pr-review-toolkit:code-reviewer** — Review all unstaged changes for adherence to project guidelines, style, and best practices.

2. **pr-review-toolkit:silent-failure-hunter** — Hunt for silent failures, inadequate error handling, and inappropriate fallback behavior in all changed files.

3. **pr-review-toolkit:code-simplifier** — Review changed code for opportunities to simplify while preserving functionality.

4. **pr-review-toolkit:comment-analyzer** — Analyze any comments in changed files for accuracy, completeness, and long-term maintainability.

5. **pr-review-toolkit:pr-test-analyzer** — Review test coverage quality and identify critical gaps in the changes.

6. **pr-review-toolkit:type-design-analyzer** — Analyze any new or modified types (Post interface, etc.) for encapsulation, invariant expression, and design quality.
```

### 9b. Agent team to resolve findings

After all 6 toolkit agents report, spin up a resolution team:

```
Create an agent team with 2 workers to resolve PR review findings:

1. **Fix Agent** — Implement all CRITICAL and WARNING fixes from the toolkit reports. Make the code changes, verify the build still passes after each fix.

2. **Verification Agent** — After all fixes are applied, run a final build and verify:
   - Build succeeds with no type errors
   - All static pages are generated (check route table output)
   - OG images are generated for all published posts
   - Sitemap contains correct URLs with trailing slashes
   - Redirect HTML files are present in output
   - No draft posts in output
```

---

## Deviations from original plan

| Plan | Actual | Reason |
|---|---|---|
| `trailingSlash: false` | `trailingSlash: true` | Static export generates both `.html` files and RSC payload directories with same slug name; `serve` (and S3) can't resolve clean URLs when a directory exists. `trailingSlash: true` generates `/slug/index.html` which S3/CloudFront serves correctly. |
| Turbopack (default in Next.js 16) | `--webpack` flag on dev and build | `rehype-pretty-code` config has non-serializable callback functions (`onVisitLine`, etc.) that Turbopack can't serialize. Also `remark-flexible-code-titles` `titleProperties` callback. |
| `robots.ts` and `sitemap.ts` unchanged | Added `export const dynamic = 'force-static'` | Required for `output: 'export'` compatibility with Next.js metadata routes. |
| `constants.ts` kept ("used in next.config.mjs") | Deleted | `next.config.mjs` hardcodes the value instead of importing it; no consumers remain. |
| Keep `framer-motion` (upgrade to React 19 compat) | Removed entirely | Not imported anywhere in source code. |

---

## Resolved risks

1. **`remark-frontmatter` + `@next/mdx` interaction** — Confirmed working. Verified in output HTML: no YAML frontmatter appears in rendered blog post content.
2. **`rehype-clipboard-prep-code` compatibility** — Confirmed working. Output HTML contains `__rawstring__` attributes on `<pre>` elements. Copy-to-clipboard functions correctly.
3. **CSP and Cloudflare analytics** — Not a current problem. With `output: 'export'`, the `headers()` config is inert — no CSP headers are emitted from static files, so nothing blocks the Cloudflare beacon. Phase 2 CloudFront Response Headers Policy will set proper CSP.

---

## Unresolved risks

1. **Turbopack incompatibility.** Dev and build require `--webpack` flag due to non-serializable rehype-pretty-code callbacks. This will remain until either Turbopack adds support for non-serializable loader options or the callbacks are removed/replaced.
2. **ESLint 8.48 is deprecated.** `eslint-config-next@16` requires `>=9.0.0`. Upgrade to ESLint 9+ requires flat config migration — separate effort.
3. **`server-only` imports are misleading.** They provide no runtime enforcement in a static export but don't cause harm. Consider removing them for clarity.

---

## Key files reference

| File | Current role | Action |
|---|---|---|
| `contentlayer.config.js` | Contentlayer config | Delete |
| `next.config.js` | Next.js config with `withContentlayer()` | Rename to `.mjs`, rewrite |
| `src/app/blog/page.tsx` | Blog list, imports `allBlogs` | Update imports |
| `src/app/blog/[slug]/page.tsx` | Single post, uses `post.body.code` | Rewrite rendering |
| `src/app/sitemap.ts` | Sitemap, imports `allBlogs` | Update imports |
| `src/app/layout.tsx` | Root layout, Vercel Analytics | Remove analytics, add CF |
| `src/app/og/route.tsx` | Edge Runtime OG generation | Delete |
| `src/components/mdx.tsx` | MDX renderer with `useMDXComponent` | Delete (move to mdx-components.tsx) |
| `src/components/banner-image.tsx` | CldImage banner | Replace with `<img>` |
| `src/components/code-block-title.tsx` | Code block title component | Keep (used in mdx-components.tsx) |
| `src/components/code-copy-button.tsx` | Copy-to-clipboard | Keep |
| `src/lib/mdxPlugins/` | Dead code (never imported) | Delete |
| `src/styles/greenery-theme.json` | Shiki theme for rehype-pretty-code | Keep |
| `tsconfig.json` | Has contentlayer paths | Remove contentlayer paths |
| `package.json` | Dependencies, scripts | Update deps and build script |
| `constants.ts` | `REMARK_CODE_TITLE_TAG_NAME` | Deleted (dead code, value hardcoded in next.config.mjs) |
| `cva.config.ts` | Exports `cx` utility | Keep (used in mdx-components.tsx) |
