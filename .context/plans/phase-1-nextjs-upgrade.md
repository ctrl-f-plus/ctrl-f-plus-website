# Phase 1: Next.js Upgrade + Contentlayer Replacement

## Context

This is Phase 1 of a larger migration (full plan: `.context/plans/vercel-to-aws-migration-v4.md`).

**Current state:** Next.js 13.4.19, React 18.2, Contentlayer 0.3.4, deployed on Vercel Pro.
**Target state:** Next.js 16, React 19, `@next/mdx` (no Contentlayer), `output: 'export'`, build-time OG images, Cloudflare Web Analytics.
**Verification:** Before/after Playwright screenshots proving visual parity. Local build verification with `npx serve dist`.

The site is a static portfolio/blog with 3 MDX posts. No SSR, no ISR, no API routes (except one Edge Runtime OG route being removed).

**IMPORTANT: Do NOT commit or push any code.** The owner will review all changes, commit, and deploy manually. All verification is local only (before screenshots from the live site, after screenshots from `npx serve dist`). Do NOT use `git push`, `git commit`, or any Vercel deploy commands.

---

## Before starting: Capture "before" screenshots

Use Playwright to capture full-page screenshots of the live site. Save to `.context/screenshots/before/`.

```bash
mkdir -p .context/screenshots/before .context/screenshots/after
npx playwright screenshot --browser chromium --full-page https://benjamin-chavez.com .context/screenshots/before/home.png
npx playwright screenshot --browser chromium --full-page https://benjamin-chavez.com/blog .context/screenshots/before/blog-list.png
npx playwright screenshot --browser chromium --full-page "https://benjamin-chavez.com/blog/creating-a-typescript-express.js-web-application-with-es6-step-by-step-guide" .context/screenshots/before/post-express.png
npx playwright screenshot --browser chromium --full-page "https://benjamin-chavez.com/blog/integrating-next.js-with-express.js-using-auth0-for-authentication" .context/screenshots/before/post-auth0.png
```

---

## Step 1: Replace Contentlayer with `@next/mdx`

### Content architecture

Two parallel systems work together:

1. **Metadata collection** (`src/lib/posts.ts`): Reads raw `.mdx` files with `fs` + `gray-matter` at build time. Validates required frontmatter, caches parsed results, computes reading time from body content only, and derives structured data URLs from `clientEnv.NEXT_PUBLIC_APP_URL`.

2. **Content rendering** (`@next/mdx` via webpack): Compiles `.mdx` files into React components. Dynamic import in `[slug]/page.tsx`: `await import(`@/content/${slug}.mdx`)`. Custom elements provided by `mdx-components.tsx` (project root).

3. **Published content filtering**: `getPublishedPosts()` filters out future-dated posts for production builds. Blog index, sitemap, `generateStaticParams()`, and `getPostBySlug()` must all resolve from published posts only so draft content cannot leak into the export.

4. **Frontmatter handling**: YAML frontmatter stays in MDX files unchanged. `remark-frontmatter` plugin strips YAML during MDX compilation (so it doesn't render as text). `gray-matter` separately parses raw files for metadata.

### 1a. Remove Contentlayer

- Uninstall: `pnpm remove contentlayer next-contentlayer`
- Delete: `contentlayer.config.js`
- Delete: `src/lib/mdxPlugins/` directory (dead code — never imported, functionality is in `rehype-clipboard-prep-code` npm package)
- `tsconfig.json`: remove `"contentlayer/generated": ["./.contentlayer/generated"]` from `paths`, remove `.contentlayer/generated` and `contentlayer.config.js` from `include`

### 1b. Install new dependencies

```bash
pnpm add @next/mdx @mdx-js/loader @mdx-js/react @types/mdx gray-matter remark-frontmatter satori tsx zod
pnpm add -D @next/env
```

Keep existing: `reading-time`, `remark-gfm`, `remark-flexible-code-titles`, `rehype-pretty-code`, `rehype-slug`, `rehype-autolink-headings`, `rehype-clipboard-prep-code`, `shiki`, `unist-util-visit`.

Also remove accidental deps: `pnpm remove i npm`

### 1c. Create `src/lib/posts.ts`

```typescript
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import { clientEnv } from '@/clientEnv';

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
let cachedPosts: Post[] | null = null;

export function getAllPosts(): Post[] {
  if (cachedPosts) return cachedPosts;

  return fs.readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith('.mdx'))
    .map((filename) => {
      const slug = filename.replace(/\.mdx$/, '');
      const raw = fs.readFileSync(path.join(CONTENT_DIR, filename), 'utf-8');
      const { data, content } = matter(raw);

      const required = [
        'title',
        'author',
        'description',
        'summary',
        'publishedAt',
        'updatedAt',
      ] as const;
      for (const field of required) {
        if (!data[field]) {
          throw new Error(
            `Missing required frontmatter field "${field}" in ${filename}`,
          );
        }
      }

      const rt = readingTime(content);

      return {
        ...(data as Omit<Post, 'slug' | 'readingTime' | 'structuredData'>),
        slug,
        readingTime: {
          text: rt.text,
          minutes: Math.ceil(rt.minutes),
          words: rt.words,
        },
        structuredData: {
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: data.title,
          datePublished: data.publishedAt,
          dateModified: data.updatedAt,
          description: data.summary,
          image: data.image
            ? `${clientEnv.NEXT_PUBLIC_APP_URL}${data.image}`
            : `${clientEnv.NEXT_PUBLIC_APP_URL}/og/${slug}.png`,
          url: `${clientEnv.NEXT_PUBLIC_APP_URL}/blog/${slug}/`,
          author: { '@type': 'Person', name: 'Benjamin Chavez' },
        },
      };
    })
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    );
}

export function getPublishedPosts(): Post[] {
  const today = new Date().toISOString().slice(0, 10);
  return getAllPosts().filter(
    (post) =>
      post.publishedAt <= today || process.env.NODE_ENV === 'development',
  );
}

export function getPostBySlug(slug: string): Post | undefined {
  return getPublishedPosts().find((p) => p.slug === slug);
}
```

### 1d. Create `mdx-components.tsx` (project root)

Move the component map from `src/components/mdx.tsx`. Per [official Next.js 16 docs](https://nextjs.org/docs/app/api-reference/file-conventions/mdx-components), `useMDXComponents` takes **no arguments**.

**Import conventions to match:** The repo uses `import clsx from 'clsx'` (default import) and `import { cx } from 'cva.config'`. Do NOT use `import { clsx } from 'clsx'`.

See the full component map in `.context/plans/vercel-to-aws-migration-v4.md` Step 1.1.

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
- Add `distDir: 'dist'` (changes output directory from default `out/` to `dist/`)
- Add `trailingSlash: true` (required so static export resolves clean URLs correctly from `/slug/index.html`)
- Add `images: { unoptimized: true }`
- Add `pageExtensions: ['ts', 'tsx', 'mdx']`
- Use `next dev --webpack` and `next build --webpack` because the `rehype-pretty-code` and `remark-flexible-code-titles` callbacks are not Turbopack-serializable
- Remove `headers()` and `redirects()` (inert with static export)

See full config in `.context/plans/vercel-to-aws-migration-v4.md` Step 1.1.

### 1f. Update `src/app/blog/[slug]/page.tsx`

- Replace contentlayer imports with `getPublishedPosts()`, `getPostBySlug()`, and `clientEnv`
- Add `generateStaticParams()` returning published slugs only
- Add `export const dynamicParams = false`
- `params` must be `Promise<{ slug: string }>` (Next.js 16 async params)
- Use `notFound()` for unpublished or missing slugs
- Move metadata URLs to `clientEnv.NEXT_PUBLIC_APP_URL` with trailing slashes
- Switch the MDX stylesheet import to `@/styles/mdx.css`
- Replace `<Mdx code={post.body.code} />` with:
  ```tsx
  const { default: PostContent } = await import(`@/content/${slug}.mdx`);
  <PostContent />
  ```
- Preserve the BackButton component, title, dates, readingTime display

See full component in `.context/plans/vercel-to-aws-migration-v4.md` Step 1.1.

### 1g. Update `src/app/blog/page.tsx`

Replace `import { allBlogs } from 'contentlayer/generated'` with `import { getPublishedPosts } from '@/lib/posts'`.

### 1h. Update `src/app/sitemap.ts`

Replace `allBlogs` with `getPublishedPosts()`. Also add `export const dynamic = 'force-static'` for metadata route compatibility with static export.

### 1i. Delete `src/components/mdx.tsx`

Functionality moved to `mdx-components.tsx`. The `useMDXComponent(code)` pattern no longer applies.

### 1j. Add static-export error pages

- Create `src/app/not-found.tsx` so missing or draft-only blog slugs resolve to a generated `404.html`
- Create `src/app/global-error.tsx` so unexpected client/runtime failures render a branded fallback instead of the framework default
- Keep both pages lightweight and static-export safe

---

## Step 2: Upgrade Next.js 13.4 → 16 + React 19

1. Run codemod: `npx @next/codemod@canary upgrade latest`
2. `pnpm add react@19 react-dom@19 @types/react@19 @types/react-dom@19`
3. Update deps:
   - Remove `framer-motion` entirely (not imported anywhere — unused dependency)
   - Remove `next-cloudinary` (replaced in Step 3)
   - `@headlessui/react` → `^2.2.9` (breaking: `Dialog.Panel` → `DialogPanel` named export)
   - `rehype-pretty-code` → latest, verify shiki compat
   - Remove `pnpm.overrides` for OpenTelemetry if no longer needed

---

## Step 3: Replace banner image + build-time OG images

### 3a. Create `src/components/parallax-background.tsx`

New client component providing a scroll-based parallax effect with accessibility support.

**Key implementation details:**
- `'use client'` component using `useRef` + `useEffect`
- Props: `Readonly<{src, className?, imageClassName?, overlayClassName?, speed? (default 0.12), overscan? (default 24), backgroundPosition? (default 'center')}>`
- Scroll handler: `requestAnimationFrame`-based, calculates `translate3d` offset from viewport center vs section center, multiplied by `speed`
- Accessibility: Respects `prefers-reduced-motion: reduce` — sets `translate3d(0,0,0)` when enabled
- Safari compat: `LegacyMediaQueryList` type handles older `addListener`/`removeListener` API
- Event listeners: `scroll` (passive), `resize`, `matchMedia` change
- Cleanup: cancels pending RAF, removes all listeners on unmount
- Renders: root div (`overflow-hidden`, `aria-hidden="true"`) > layer div (`will-change-transform`, overscan via negative top/bottom %) > image div (`bg-cover`, `scale-110`) + optional overlay div

### 3b. Replace CldImage in `src/components/banner-image.tsx`

Replace `next-cloudinary` `CldImage` with `ParallaxBackground` wrapper:

```tsx
import ParallaxBackground from '@/components/parallax-background';

export default function BannerImage() {
  return (
    <ParallaxBackground
      src="https://res.cloudinary.com/dyy8g76av/image/upload/f_avif,q_auto,w_3000/Banner-image-cropped_fiuipi"
      speed={0.16}
      overscan={18}
      className="..."
      imageClassName="..."
    />
  );
}
```

Also update `src/components/skills.tsx` to use `ParallaxBackground` for the dark background section.

Remove `next-cloudinary` package. In this repo, `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` remains part of the validated env surface and CI contract, but the final banner and OG image generator do not read it directly. Treat it as repo-specific unless the target repo still has separate Cloudinary-dependent code.

### 3c. Create `scripts/generate-og-images.tsx`

- Use `satori` + `sharp` for 1200x630 PNG generation
- Uses `@next/env` (`loadEnvConfig`) to read `.env.local` for `NEXT_PUBLIC_APP_URL`
- Reads post titles from `getAllPosts()` using custom Dosis font and avatar image
- Output to `public/og/{slug}.png`
- Update build script: `"build": "tsx scripts/generate-og-images.tsx && next build --webpack"`
- Note: file extension is `.tsx` (uses JSX for satori template)

### 3d. Delete `src/app/og/route.tsx`

Edge Runtime route — incompatible with static export.

---

## Step 4: Replace Vercel Analytics

1. `pnpm remove @vercel/analytics @vercel/speed-insights`
2. Remove `<Analytics />` and `<SpeedInsights />` from `src/app/layout.tsx`
3. Add Cloudflare Web Analytics `<Script>` tag in layout behind `NEXT_PUBLIC_CF_ANALYTICS_TOKEN`, using `strategy="afterInteractive"`

---

## Step 4b: Environment variable validation with Zod

### 4b-i. Rename `src/env.ts` → `src/clientEnv.ts`

Update all imports across the codebase from `@/env` to `@/clientEnv`.

### 4b-ii. Rewrite `src/clientEnv.ts` with Zod schema

```typescript
import { z } from 'zod';

const envSchema = z.object({
  NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: z.string().min(1),
  NEXT_PUBLIC_APP_URL: z.url().default('http://localhost:3000'),
  NEXT_PUBLIC_CF_ANALYTICS_TOKEN: z.string().optional(),
  NEXT_PUBLIC_CW_RUM_APP_MONITOR_ID: z.string().optional(),
  NEXT_PUBLIC_CW_RUM_IDENTITY_POOL_ID: z.string().optional(),
  NEXT_PUBLIC_AWS_REGION: z.string(),
  NEXT_PUBLIC_SENTRY_DSN: z.string().optional(),
});

const parsed = envSchema.safeParse({ /* process.env.NEXT_PUBLIC_* */ });
if (!parsed.success) {
  console.error('❌ Invalid client environment variables:\n' + z.prettifyError(parsed.error));
  throw new Error('Invalid client environment variables');
}
export const clientEnv = parsed.data;
```

### 4b-iii. Create `src/buildEnv.ts` (build-time only)

```typescript
import 'server-only';
import { z } from 'zod';

const envSchema = z.object({ AWS_REGION: z.string().min(1) });
const parsed = envSchema.safeParse({ AWS_REGION: process.env.AWS_REGION || undefined });
if (!parsed.success) {
  console.error('❌ Invalid build environment variables:\n' + z.prettifyError(parsed.error));
  throw new Error('Invalid build environment variables');
}
export const buildEnv = parsed.data;
```

The `server-only` guard prevents accidental import from client components.

### 4b-iv. Create `.env.example`

```bash
# Client-side (NEXT_PUBLIC_*) — embedded in static output
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=     # Required
NEXT_PUBLIC_APP_URL=http://localhost:3000  # Required
NEXT_PUBLIC_AWS_REGION=                # Required
NEXT_PUBLIC_CF_ANALYTICS_TOKEN=        # Optional — Cloudflare Web Analytics
NEXT_PUBLIC_CW_RUM_APP_MONITOR_ID=     # Optional — CloudWatch RUM
NEXT_PUBLIC_CW_RUM_IDENTITY_POOL_ID=   # Optional — CloudWatch RUM Cognito
NEXT_PUBLIC_SENTRY_DSN=                # Optional — Sentry error tracking

# Build-time only (never shipped to browser)
AWS_REGION=                            # Required
```

---

## Step 4c: ESLint flat config migration (8 → 9)

1. Rename `.eslintrc.json` → `eslint.config.mjs`
2. Install new deps: `pnpm add -D typescript-eslint@^8.57.2 eslint-config-prettier@^10.1.8`
3. Upgrade: `eslint` to `9.39.4`, `eslint-config-next` to `16.2.1`
4. New flat config content:

```javascript
import nextConfig from 'eslint-config-next/core-web-vitals';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier';

export default tseslint.config(
  { ignores: ['.trash/**/*'] },
  ...nextConfig,
  ...tseslint.configs.recommended,
  eslintConfigPrettier,
  {
    languageOptions: { parserOptions: { project: './tsconfig.json' } },
    rules: { /* project-specific rules */ },
  },
);
```

---

## Step 4d: Icon component type safety (codemod)

1. Install: `pnpm add -D jscodeshift @types/jscodeshift`
2. Create `scripts/readonly-props-codemod.ts` — a jscodeshift transform that wraps destructured function parameters in `Readonly<>`. Converts `({className}: {className?: string})` to `({className}: Readonly<{className?: string}>)`.
3. Run: `npx jscodeshift -t scripts/readonly-props-codemod.ts src/components/icons/`
4. Manually verify ~30 icon components have proper `Readonly<>` wrapped prop types.

---

## Step 4e: Prettier configuration

Final `prettier.config.js`:

```javascript
module.exports = {
  singleQuote: true,
  plugins: ['prettier-plugin-tailwindcss'],
  tailwindFunctions: ['tw', 'clsx', 'cx'],
};
```

The `tailwindFunctions` array must include `cx` (exported from `cva.config.ts`) for Tailwind class sorting in CVA variants.

---

## Step 4f: Workspace and tooling configuration

### `.nvmrc`
```
24
```

### `pnpm-workspace.yaml`
```yaml
packages:
  - infrastructure

allowBuilds:
  esbuild: true
  sharp: true
  unrs-resolver: true
```

### `scripts/cleanup.sh`
Bash script to remove build artifacts: `node_modules`, `dist`, `out`, `.turbo`, `.next`, `cdk.out`. Prompts for confirmation before deletion.

---

## Step 5: Local verification

```bash
pnpm build
npx serve dist -l 3000
```

Then capture "after" screenshots:

```bash
npx playwright screenshot --browser chromium --full-page http://localhost:3000 .context/screenshots/after/home.png
npx playwright screenshot --browser chromium --full-page http://localhost:3000/blog .context/screenshots/after/blog-list.png
npx playwright screenshot --browser chromium --full-page "http://localhost:3000/blog/creating-a-typescript-express.js-web-application-with-es6-step-by-step-guide" .context/screenshots/after/post-express.png
npx playwright screenshot --browser chromium --full-page "http://localhost:3000/blog/integrating-next.js-with-express.js-using-auth0-for-authentication" .context/screenshots/after/post-auth0.png
```

### Verification checklist
- [ ] Build succeeds, `dist/` directory populated
- [ ] `dist/index.html`, `dist/blog/index.html`, `dist/blog/{slug}/index.html` exist
- [ ] `dist/og/{slug}.png` exists for each post
- [ ] All pages render, no console errors
- [ ] Blog list: correct posts, correct sort order
- [ ] No future-dated draft posts appear in `dist/`, sitemap, or blog index
- [ ] Blog posts: syntax highlighting, code titles, copy-to-clipboard
- [ ] Banner image loads from Cloudinary
- [ ] Portfolio thumbnails render with blur placeholders
- [ ] `view-source:` shows `og:image` meta tags
- [ ] `dist/sitemap.xml` lists all blog URLs
- [ ] `dist/404.html` exists and direct draft URLs return the static 404 page
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
- **Migration Correctness Reviewer**: Verify the Contentlayer → @next/mdx migration is complete. Check that all contentlayer imports are removed, all data flows are wired correctly (`getAllPosts`, `getPublishedPosts`, `getPostBySlug`, `generateStaticParams`, sitemap), MDX rendering works via dynamic import, and no dead references remain. Cross-reference against the plan at `.context/plans/phase-1-nextjs-upgrade.md`.

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

### 7e. Remove stale `@ts-ignore` and fix tsconfig.json

- Removed `@ts-ignore` on `usePathname` import in `src/components/navbar/index.tsx`
- Updated `tsconfig.json`:
  - `moduleResolution: "node"` → `"bundler"` (recommended for Next.js, fixes sub-path export resolution)
  - `module: "esnext"` (not `commonjs` or `nodenext`)
  - `jsx: "react-jsx"` (not `preserve` as older Next.js used)
  - `include` array: add `"dist/types/**/*.ts"` and `"dist/dev/types/**/*.ts"` (needed because `distDir: 'dist'`)
  - `exclude`: add `"scripts"` and `"infrastructure"` directories

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
- Removed `next-cloudinary` (replaced with direct Cloudinary-hosted assets via `ParallaxBackground`)

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
| `distDir` not set (default `out/`) | `distDir: 'dist'` | Aligns output dir naming with CI/CD artifact conventions; avoids conflict with `.out` patterns in some tools. |
| `trailingSlash: false` | `trailingSlash: true` | Static export generates both `.html` files and RSC payload directories with same slug name; `serve` (and S3) can't resolve clean URLs when a directory exists. `trailingSlash: true` generates `/slug/index.html` which S3/CloudFront serves correctly. |
| Turbopack (default in Next.js 16) | `--webpack` flag on dev and build | `rehype-pretty-code` config has non-serializable callback functions (`onVisitLine`, etc.) that Turbopack can't serialize. Also `remark-flexible-code-titles` `titleProperties` callback. |
| `robots.ts` and `sitemap.ts` unchanged | Added `export const dynamic = 'force-static'` | Required for `output: 'export'` compatibility with Next.js metadata routes. |
| `constants.ts` kept ("used in next.config.mjs") | Deleted | `next.config.mjs` hardcodes the value instead of importing it; no consumers remain. |
| Keep `framer-motion` (upgrade to React 19 compat) | Removed entirely | Not imported anywhere in source code. |
| Plain `<img>` for banner | `ParallaxBackground` component wrapper | Added scroll parallax effect for visual polish on hero and skills sections. |
| No env validation | Zod schemas for build-time + client-side | Type-safe environment variable validation with helpful error messages on misconfiguration. |
| ESLint 8 (separate effort) | ESLint 9 flat config migration completed | Required for `eslint-config-next@16` compatibility. |
| `src/env.ts` | Renamed to `src/clientEnv.ts` | Clarity — distinguishes from new `src/buildEnv.ts` for build-time vars. |

---

## Resolved risks

1. **`remark-frontmatter` + `@next/mdx` interaction** — Confirmed working. Verified in output HTML: no YAML frontmatter appears in rendered blog post content.
2. **`rehype-clipboard-prep-code` compatibility** — Confirmed working. Output HTML contains `__rawstring__` attributes on `<pre>` elements. Copy-to-clipboard functions correctly.
3. **CSP and Cloudflare analytics** — Not a current problem. With `output: 'export'`, the `headers()` config is inert — no CSP headers are emitted from static files, so nothing blocks the Cloudflare beacon. Phase 2 CloudFront Response Headers Policy will set proper CSP.
4. **ESLint 9 flat config migration** — Completed in Step 4c. `.eslintrc.json` → `eslint.config.mjs` using `tseslint.config()` with `eslint-config-next/core-web-vitals`, `typescript-eslint`, and `eslint-config-prettier`.

---

## Unresolved risks

1. **Turbopack incompatibility.** Dev and build require `--webpack` flag due to non-serializable rehype-pretty-code callbacks. This will remain until either Turbopack adds support for non-serializable loader options or the callbacks are removed/replaced.
2. **`server-only` imports are misleading.** They provide no runtime enforcement in a static export but don't cause harm. Consider removing them for clarity.

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
| `src/components/banner-image.tsx` | Cloudinary-backed hero banner | Replace `CldImage` with direct asset rendering (`ParallaxBackground` in this repo) |
| `src/components/code-block-title.tsx` | Code block title component | Keep (used in mdx-components.tsx) |
| `src/components/code-copy-button.tsx` | Copy-to-clipboard | Keep |
| `src/lib/mdxPlugins/` | Dead code (never imported) | Delete |
| `src/styles/greenery-theme.json` | Shiki theme for rehype-pretty-code | Keep |
| `tsconfig.json` | Has contentlayer paths | Remove contentlayer paths |
| `package.json` | Dependencies, scripts | Update deps and build script |
| `constants.ts` | `REMARK_CODE_TITLE_TAG_NAME` | Deleted (dead code, value hardcoded in next.config.mjs) |
| `cva.config.ts` | Exports `cx` utility | Keep (used in mdx-components.tsx) |
| `src/buildEnv.ts` | Build-time env validation (Zod) | Created in Step 4b |
| `src/clientEnv.ts` | Client env validation (Zod) | Renamed from `src/env.ts`, rewritten in Step 4b |
| `src/components/parallax-background.tsx` | Parallax scroll effect | Created in Step 3a |
| `scripts/readonly-props-codemod.ts` | jscodeshift codemod for Readonly props | Created in Step 4d |
| `scripts/cleanup.sh` | Build artifact cleanup | Created in Step 4f |
| `.nvmrc` | Node version pin (v24) | Created in Step 4f |
| `eslint.config.mjs` | ESLint 9 flat config | Renamed from `.eslintrc.json` in Step 4c |
| `pnpm-workspace.yaml` | Workspace config (infrastructure package) | Created in Step 4f |
| `.env.example` | Environment variable template | Created in Step 4b |

## Repo-Specific Carryovers

These landed in this repo during the same upgrade window, but are not universal requirements for another repo unless it wants exact behavioral parity:

- `src/components/parallax-background.tsx` and the related hero/skills background polish are visual enhancements, not migration blockers
- `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` remains required by this repo's current env schema and CI contract, but the final banner and OG generator do not consume it directly
- `scripts/readonly-props-codemod.ts` and `scripts/cleanup.sh` are support tooling, not required for a successful framework migration

---

## ctrl-f-plus-website Implementation Notes (2026-03-28)

These notes document how the plan was applied to the ctrl-f-plus-website repo.

### Structural differences from reference repo
- **No `src/` prefix**: target uses `app/`, `content/`, etc. directly at root (paths: `@/*` → `./*`)
- **`clientEnv.ts` and `buildEnv.ts`** are at project root (not `src/`)
- **Content directory**: `content/blog/` (not `src/content/`)
- **MDX theme**: `assets/themes/ctrl-markdown-theme.json` (not `src/styles/greenery-theme.json`)
- **Fonts**: Inter, Open Sans, Arimo (not Inter, Dosis, Open Sans)
- **Site identity**: ctrl-f.plus, "Ctrl-F Plus Chrome Extension" branding

### What was implemented
1. Contentlayer → @next/mdx migration (already completed before this pass)
2. Next.js 13 → 16, React 18 → 19 (already completed before this pass)
3. Headless UI v1 → v2 (already completed before this pass)
4. `distDir: 'dist'` added to next.config.mjs
5. Zod-validated `clientEnv.ts` and `buildEnv.ts` created
6. `server-only` directive added to layout
7. Cloudflare Analytics made conditional via `clientEnv.NEXT_PUBLIC_CF_ANALYTICS_TOKEN`
8. CloudWatch RUM and Sentry observability components created
9. ESLint migrated to flat config (`eslint.config.mjs`)
10. `.nvmrc` created (Node 22, not 24 — matches target's engine constraint)
11. `.env.example` updated with full env var template
12. `.lighthouserc.js` created for CI Lighthouse testing
13. `pnpm-workspace.yaml` created for infrastructure package
14. `tsconfig.json` updated with `dist/types`, `infrastructure` exclude
15. `.gitignore` updated with `dist/`, CDK output dirs; removed stale contentlayer entry
16. OG image script updated to use `@next/env` for env loading
17. Blog post frontmatter updated to include `description` and `updatedAt` fields
18. All hardcoded `https://ctrl-f.plus` URLs replaced with `clientEnv.NEXT_PUBLIC_APP_URL`
19. `posts.ts` aligned with reference: `node:fs`, caching, clientEnv URLs, body-only reading-time
20. `prettier-plugin-tailwindcss` removed from tailwind.config.ts plugins (was incorrectly listed as a Tailwind plugin)
21. Package.json updated: added zod, @sentry/browser, aws-rum-web, @next/env, unist-util-visit, typescript-eslint; ESLint 9; removed cross-env; updated clsx to ^2.0.0; cva to 1.0.0-beta.1

### What was NOT implemented (intentionally)
- `parallax-background.tsx` — visual enhancement specific to reference repo
- `scripts/readonly-props-codemod.ts` — jscodeshift codemod specific to reference repo
- `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` — not used by this site
- `@types/jscodeshift` — not needed without codemod
- Root layout `RootLayout` component — target uses inline layout structure
- Dosis font — target uses Arimo instead
