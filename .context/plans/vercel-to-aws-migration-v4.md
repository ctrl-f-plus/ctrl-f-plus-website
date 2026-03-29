# Migration Plan v4: Vercel → AWS S3 + CloudFront

## Findings on v3

### 1. Verification contradiction (Medium)

Phase 1 title says "verify locally, deploy on Vercel as interim check." Phase 1.5 body says "No Vercel verification needed." These conflict. Vercel adds no value here — with `output: 'export'`, headers and redirects are inert, so Vercel just serves the same flat files as a local static server. The implemented build now emits `dist/`, and verification stays local-only throughout.

### 2. `mdx-components.tsx` uses wrong clsx import (Low, will break)

v3 sample writes `import { clsx } from 'clsx'` (named import). The repo uses `import clsx from 'clsx'` (default import) — see `src/components/mdx.tsx:5`. Both forms work at runtime with clsx v2, but the repo convention is the default import. More importantly, `cx` is imported from `cva.config` (see `src/components/mdx.tsx:6`, `cva.config.ts`). v4 matches the existing repo convention.

### 3. reading-time computed on wrong input (Medium, affects accuracy)

v3 passes the full raw file (including YAML frontmatter) to `readingTime(raw)`. The current Contentlayer config computes `readingTime(doc.body.raw)` — the body without frontmatter. Frontmatter like `title: 'Building a Chrome Extension with Shared State'` adds ~30 spurious words. v4 uses `readingTime(matter(raw).content)` to match current behavior.

### 4. CloudFront flat-rate pricing has undisclosed caveats (High)

v3 claims $0/month with no qualifiers. Official [AWS docs](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/flat-rate-pricing-plan.html) state:

- **AWS Free Tier accounts are not eligible** for flat-rate pricing plans, including the $0/month Free plan. The account must be a regular paid AWS account.
- The Route 53 hosted zone must be **explicitly attached** to the flat-rate plan for the zone fee to be waived. If not attached, $0.50/zone/month applies separately.
- v3 claims overflow is "absorbed by Always Free tier." This is plausible (the Always Free tier is a separate program) but not explicitly documented as additive with flat-rate plans. v4 does not rely on this.

v4 presents the flat-rate Free plan as the primary estimate with caveats, and a pay-as-you-go fallback.

### 5. Shared CDK package adds unnecessary risk in Phase 2 (Medium)

v3 puts shared `@benchavez/cdk-constructs` package creation on the critical path for the first deployment. This means you must: create a new repo, write and publish a package, then consume it — all before deploying your first site. The lower-risk path: write the CDK construct inline in this repo's `infrastructure/` directory, deploy site #1, then extract to a shared package when site #2 is ready.

### 6. Hosted zone assumption is implicit (Low)

v3 says "construct always creates a new hosted zone" but never states the prerequisite: **no existing Route 53 hosted zone for `benjamin-chavez.com` exists in the target AWS account.** If one already exists, CDK will fail. v4 makes this explicit.

---

## Rewritten Plan (v4)

### Decisions

| Decision | Choice |
|---|---|
| Hosting | AWS S3 + CloudFront |
| IaC | CDK (TypeScript), inline in repo. Extract to shared package for site #2. |
| CI/CD | GitHub Actions + OIDC. Stack outputs read via `aws cloudformation describe-stacks`. |
| Analytics | Cloudflare Web Analytics (free JS snippet) |
| Contentlayer replacement | `@next/mdx` + `gray-matter` + `remark-frontmatter` |
| Next.js | 13.4 → 16, React 18 → 19 |
| OG images | Build-time generation (`satori` + `sharp`) |
| Banner image | Direct Cloudinary-hosted asset; this repo wraps it in `ParallaxBackground` |
| Security headers | CloudFront Response Headers Policy |
| Redirects + clean URLs | CloudFront Function (viewer-request) |
| Static export | `output: 'export'` |

### Cost estimate (2 sites)

**Primary: CloudFront flat-rate Free plan ($0/month)**

Eligible only for paid AWS accounts (not AWS Free Tier trial accounts).

| Resource | Per distribution | 2 distributions |
|---|---|---|
| Data transfer | 100 GB/mo | 200 GB/mo |
| Requests | 1M/mo | 2M/mo |
| Route 53 zone + queries | Included (must attach zone to plan) | Included |
| S3 storage credits | 5 GB | 10 GB |
| ACM certificate | Included | Included |
| WAF (5 rules) | Included | Included |
| **Monthly total** | **$0** | **$0** |

Caveat: If the Route 53 hosted zone is not attached to the flat-rate plan, it costs $0.50/zone/month separately.

**Fallback: Pay-as-you-go (if flat-rate plan is unavailable)**

| Resource | Low (~1K visits/mo) | Medium (~50K visits/mo) |
|---|---|---|
| CloudFront transfer | $0 (within 1TB Always Free) | $0 (within 1TB Always Free) |
| CloudFront requests | $0 (within 10M Always Free) | $0 (within 10M Always Free) |
| Route 53 (2 zones) | $1.00 | $1.00 |
| S3 storage (<100MB) | < $0.01 | < $0.01 |
| **Monthly total** | **~$1** | **~$1** |

The CloudFront Always Free tier (1TB transfer + 10M requests/month, permanent, no account type restriction) covers both sites at any realistic blog traffic level.

**Current cost: $40/month. Target: $0–1/month. Annual savings: $468–480.**

---

## Phase 1: Code changes (verify locally)

All verification is local using `npx serve dist`. No Vercel deployment in the loop.

### Step 1.1: Replace Contentlayer with `@next/mdx`

**Content architecture:**

| Concern | Mechanism |
|---|---|
| Content discovery (slugs, metadata) | `lib/posts.ts` reads `src/content/*.mdx` with `fs` + `gray-matter`, validates required frontmatter, caches results, and derives canonical URLs from `clientEnv.NEXT_PUBLIC_APP_URL` |
| Content rendering | `await import(`@/content/${slug}.mdx`)` via `@next/mdx` webpack loader |
| Frontmatter in MDX | `remark-frontmatter` plugin strips YAML block during compilation. `gray-matter` parses it separately. |
| Reading time | `reading-time` on `matter(raw).content` (body only, not frontmatter) |
| Static route generation | `generateStaticParams()` + `dynamicParams = false`, driven from published posts only |
| Custom MDX elements | `mdx-components.tsx` (project root, Next.js file convention) |

**Remove:**
- Packages: `contentlayer`, `next-contentlayer`
- File: `contentlayer.config.js`
- Directory: `src/lib/mdxPlugins/` (dead code — never imported; functionality is in `rehype-clipboard-prep-code` npm package, which you own)
- `tsconfig.json`: remove `contentlayer/generated` from `paths` and `.contentlayer/generated` + `contentlayer.config.js` from `include`

**Install:**
```bash
pnpm add @next/mdx @mdx-js/loader @mdx-js/react @types/mdx gray-matter remark-frontmatter satori tsx
```

Keep: `reading-time`, `remark-gfm`, `remark-flexible-code-titles`, `rehype-pretty-code`, `rehype-slug`, `rehype-autolink-headings`, `rehype-clipboard-prep-code`, `shiki`, `unist-util-visit`.

**Create `src/lib/posts.ts`:**

```typescript
import fs from 'fs';
import path from 'path';
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
            ? `${clientEnv.NEXT_PUBLIC_APP_URL}${data.image}`
            : `${clientEnv.NEXT_PUBLIC_APP_URL}/og/${slug}.png`,
          url: `${clientEnv.NEXT_PUBLIC_APP_URL}/blog/${slug}/`,
          author: { '@type': 'Person', name: 'Benjamin Chavez' },
        },
      };
    })
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

export function getPublishedPosts(): Post[] {
  const today = new Date().toISOString().slice(0, 10);
  return getAllPosts().filter(
    (post) =>
      post.publishedAt <= today || process.env.NODE_ENV === 'development',
  );
}

export function getPostBySlug(slug: string): Post | undefined {
  return getPublishedPosts().find(p => p.slug === slug);
}
```

**Create `mdx-components.tsx`** (project root):

Per [official docs](https://nextjs.org/docs/app/api-reference/file-conventions/mdx-components), `useMDXComponents` takes no arguments.

```typescript
import type { MDXComponents } from 'mdx/types';
import Image from 'next/image';
import clsx from 'clsx';
import { cx } from 'cva.config';
import CodeBlockTitle from '@/components/code-block-title';
import CodeCopyButton from '@/components/code-copy-button';

export function useMDXComponents(): MDXComponents {
  return {
    h2: ({ className, ...props }: any) => (
      <h2 className={clsx('mb-6 scroll-m-16 font-normal uppercase text-xl tracking-[.1rem] text-[#141414] [&:not(:first-child)]:mt-16', className)} {...props} />
    ),
    h3: ({ className, ...props }: any) => (
      <h3 className={clsx('scroll-m-16 font-dosis font-normal text-lg uppercase text-[#141414]', className)} {...props} />
    ),
    a: ({ className, href, ...props }: any) => {
      const isExternal = href?.startsWith('http');
      return (
        <a href={href} className={cx('font-light text-neutral-900 underline transition-all hover:text-[#008000]', className)}
          target={isExternal ? '_blank' : '_self'}
          rel={isExternal ? 'noopener noreferrer' : undefined}
          {...props} />
      );
    },
    strong: ({ className, ...props }: any) => (
      <strong className={clsx('font-open-sans text-[0.94rem] font-normal text-neutral-600', className)} {...props} />
    ),
    p: ({ className, ...props }: any) => (
      <p className={clsx('font-open-sans text-[0.94rem] font-light text-[#777777]', className)} {...props} />
    ),
    ul: ({ className, ...props }: any) => (
      <ul className={cx('list-disc font-open-sans text-[0.94rem] text-[#777777]', className)} {...props} />
    ),
    ol: ({ className, ...props }: any) => (
      <ol className={cx('list-decimal font-open-sans text-[0.94rem] text-[#777777]', className)} {...props} />
    ),
    li: ({ className, ...props }: any) => (
      <li className={cx('mt-2 font-open-sans text-[0.94rem] font-light text-[#777777]', className)} {...props} />
    ),
    Callout: (props: any) => (
      <div className="my-8 flex items-center rounded border border-gray-200 bg-[#F8F9FA] px-4 py-2 text-sm text-[#777777]">
        {props.emoji && <div className="mr-4 flex w-4 items-center">{props.emoji}</div>}
        <div className="w-full">{props.children}</div>
      </div>
    ),
    pre: (props: any) => (
      <pre className={clsx('px-0 group relative m-0 overflow-x-auto rounded-md py-4', props.className)} {...props}>
        <CodeCopyButton text={props.__rawstring__} />
        {props.children}
      </pre>
    ),
    code: ({ className, ...props }: any) => (
      <code className={cx('font-mono text-sm', className)} {...props} />
    ),
    Image: (props: any) => (
      <div className="flex w-full justify-center">
        <Image alt={props.alt} className="rounded-md" {...props} quality={100} />
      </div>
    ),
    CodeBlockTitle,
  };
}
```

**Create `next.config.mjs`** (rename from `next.config.js`):

```javascript
import createMDX from '@next/mdx';
import { readFileSync } from 'fs';
import remarkFrontmatter from 'remark-frontmatter';
import remarkGfm from 'remark-gfm';
import remarkCodeTitles from 'remark-flexible-code-titles';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import {
  rehypeAttachRawStringsToCodeContainer,
  rehypeEnrichCodeContainerMetadata,
} from 'rehype-clipboard-prep-code';

const withMDX = createMDX({
  extension: /\.mdx$/,
  options: {
    remarkPlugins: [
      remarkFrontmatter,            // strips YAML so MDX compiler ignores it
      remarkGfm,
      [remarkCodeTitles, {
        titleTagName: 'CodeBlockTitle',
        titleClassName: 'custom-code-title',
        titleProperties: (language, title) => ({ ['data-language']: language, title }),
      }],
    ],
    // ORDER MATTERS — rehype-clipboard-prep-code plugins bracket rehype-pretty-code
    rehypePlugins: [
      rehypeAttachRawStringsToCodeContainer,  // before pretty-code: reads raw code text
      rehypeSlug,
      [rehypePrettyCode, {
        theme: JSON.parse(readFileSync('./src/styles/greenery-theme.json', 'utf-8')),
        onVisitLine(node) {
          if (node.children.length === 0) node.children = [{ type: 'text', value: ' ' }];
        },
        onVisitHighlightedLine(node) { node?.properties?.className?.push('line--highlighted'); },
        onVisitHighlightedWord(node) { node.properties.className = ['word--highlighted']; },
      }],
      rehypeEnrichCodeContainerMetadata,      // after pretty-code: reads data-rehype-pretty-code-fragment
      [rehypeAutolinkHeadings, {
        properties: { className: ['anchor'], ariaLabel: 'Link to section' },
      }],
    ],
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  distDir: 'dist',
  pageExtensions: ['ts', 'tsx', 'mdx'],
  reactStrictMode: false,
  poweredByHeader: false,
  trailingSlash: true,
  images: { unoptimized: true },
};

export default withMDX(nextConfig);
```

**Update `src/app/blog/[slug]/page.tsx`:**

```typescript
import 'server-only';
import { Container } from '@/components/container';
import { clientEnv } from '@/clientEnv';
import { formatDate } from '@/lib/utils';
import { getPostBySlug, getPublishedPosts } from '@/lib/posts';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import '@/styles/mdx.css';

export function generateStaticParams() {
  return getPublishedPosts().map(post => ({ slug: post.slug }));
}
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata | undefined> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return;

  return {
    title: post.title,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
      type: 'article',
      publishedTime: post.publishedAt,
      url: `${clientEnv.NEXT_PUBLIC_APP_URL}/blog/${slug}/`,
      images: [{ url: `/og/${slug}.png` }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.summary,
      images: [`/og/${slug}.png`],
    },
  };
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const { default: PostContent } = await import(`@/content/${slug}.mdx`);

  return (
    <Container className="relative py-9">
      {/* BackButton component preserved from current code */}
      <h1 className="font-dosis text-3xl uppercase leading-9 tracking-[.4rem] text-[#141414]">
        {post.title}
      </h1>
      <div className="mt-2" />
      <div className="flex flex-col justify-start gap-x-3 gap-y-2 font-open-sans text-[15px] text-xs sm:flex-row sm:items-center">
        <time dateTime={post.publishedAt} className="font-open-sans text-gray-500">
          {formatDate(post.publishedAt)} / {post.readingTime.text}
        </time>
        <div className="-ml-1 w-fit rounded-md !bg-[#83a06c] !bg-opacity-50 px-1.5 py-1 font-open-sans !text-[#008000] md:ml-0">
          Last Updated:{' '}
          <time dateTime={post.updatedAt} className="font-open-sans text-[#008000]">
            {formatDate(post.updatedAt)}
          </time>
        </div>
      </div>
      <section className="my-16 flex flex-col">
        <article className="prose mx-auto max-w-none pb-20 prose-code:before:content-none prose-code:after:content-none">
          <PostContent />
        </article>
      </section>
    </Container>
  );
}
```

**Update `src/app/blog/page.tsx`:** Replace `import { allBlogs } from 'contentlayer/generated'` with `import { getPublishedPosts } from '@/lib/posts'`.

**Update `src/app/sitemap.ts`:** Use `getPublishedPosts()` and add `export const dynamic = 'force-static'`.

**Also create:** `src/app/not-found.tsx` and `src/app/global-error.tsx` so static-export failures and missing content have explicit fallbacks.

**Delete:** `src/components/mdx.tsx`, `contentlayer.config.js`, `src/lib/mdxPlugins/`.

**MDX files unchanged.** YAML frontmatter stays as-is.

### Step 1.2: Upgrade Next.js 13.4 → 16 + React 19

1. `npx @next/codemod@canary upgrade latest`
2. `pnpm add react@19 react-dom@19 @types/react@19 @types/react-dom@19`
3. Update deps:
   - Remove `framer-motion` entirely if it is unused
   - Remove: `next-cloudinary`, `i`, `npm` packages
   - `rehype-pretty-code` → latest (verify shiki compat)
   - Remove `pnpm.overrides` for OpenTelemetry if no longer needed
4. Manual fixes: `params` async shape (shown above), `images.domains` removed

### Step 1.3: Replace banner image + build-time OG images

**Portable requirement:** remove `next-cloudinary` and switch to direct Cloudinary-hosted assets.

**Implemented in this repo:** `src/components/banner-image.tsx` now renders a `ParallaxBackground` wrapper around the Cloudinary asset, and `src/components/skills.tsx` uses the same background utility for the dark section.

**Create `scripts/generate-og-images.tsx`** using `satori` + `sharp`, loading env with `@next/env` before importing `posts.ts`. Build script: `"build": "tsx scripts/generate-og-images.tsx && next build --webpack"`.

**Delete `src/app/og/route.tsx`.**

### Step 1.4: Replace Vercel Analytics

Remove `@vercel/analytics`, `@vercel/speed-insights`. Add Cloudflare Web Analytics `<Script>` tag in `layout.tsx`, gated by `NEXT_PUBLIC_CF_ANALYTICS_TOKEN` and using `strategy="afterInteractive"`.

### Step 1.5: Local verification

```bash
pnpm build
npx serve dist -l 3000
```

- [ ] Build succeeds, `dist/` directory populated
- [ ] `dist/index.html`, `dist/blog/index.html`, `dist/blog/{slug}/index.html` exist for each post
- [ ] `dist/og/{slug}.png` exists for each post
- [ ] All pages render at `http://localhost:3000`, no console errors
- [ ] Blog list: correct posts, correct sort order
- [ ] Future-dated draft posts do not appear in the build output, sitemap, or route table
- [ ] Blog posts: syntax highlighting, code titles, copy-to-clipboard
- [ ] Banner image loads from Cloudinary
- [ ] Portfolio thumbnails render with blur placeholders
- [ ] `view-source:` shows `og:image` meta tags pointing to `/og/{slug}.png`
- [ ] `dist/sitemap.xml` lists all blog URLs
- [ ] `dist/404.html` exists and unpublished/draft-only blog URLs resolve to the exported 404 page

Headers and redirects do not work locally — they are tested after CloudFront deployment (Phase 3).

---

## Phase 2: AWS infrastructure (CDK, inline)

CDK code lives in `infrastructure/` inside this repo as a separate workspace package. No shared package yet — extract to `@benchavez/cdk-constructs` when deploying site #2.

### Step 2.1: Infrastructure file structure

```
infrastructure/
  bin/app.ts                           # CDK app entry point
  lib/
    config/
      types.ts                         # EnvironmentName, EnvironmentConfig, ResolvedEnvironmentConfig
      site-config.ts                   # Context loader, env resolution, placeholder substitution
    constructs/
      static-site.ts                   # Main construct: S3, CloudFront, Route53, ACM, security headers
      cloudfront-routing.ts            # CloudFront Function + KeyValueStore for redirects
    stacks/
      static-site-stack.ts            # Stack wrapper with CfnOutputs
  edge/
    cloudfront-runtime.d.ts           # Type declarations for CloudFront Functions JS 2.0 runtime
    viewer-request.handler.ts         # TypeScript source for CloudFront viewer-request function
  assets/
    cloudfront/
      redirects.json                  # Redirect mappings loaded into CloudFront KeyValueStore
  cdk.json                            # CDK context: appName, repository, environments
  package.json                        # CDK deps: aws-cdk-lib, constructs
  pnpm-lock.yaml
  tsconfig.json                       # CDK compilation (CommonJS, ES2022)
  tsconfig.edge.json                  # Edge handler compilation (ESM, ES2022)
```

### Step 2.2: CDK configuration system

**`cdk.json` context format:**
```json
{
  "app": "npx ts-node --prefer-ts-exts bin/app.ts",
  "context": {
    "appName": "benjamin-chavez-com",
    "repository": "benjamin-chavez/benjamin-chavez.com",
    "environments": {
      "prod": {
        "account": "${CDK_DEFAULT_ACCOUNT}",
        "region": "${CDK_DEFAULT_REGION}",
        "certificateRegion": "${CLOUDFRONT_CERTIFICATE_REGION}",
        "envName": "prod",
        "domainName": "benjamin-chavez.com",
        "alternateDomainNames": ["www.benjamin-chavez.com"]
      }
    }
  }
}
```

**`lib/config/types.ts`:** Defines `EnvironmentName` (currently `'prod'` only), `EnvironmentConfig` (account, region, certificateRegion, envName, domainName, alternateDomainNames), and `ResolvedEnvironmentConfig` (extends with compiled asset paths).

**`lib/config/site-config.ts`:** Key functions:
- `toPascalCase()` — converts kebab-case to PascalCase
- `deriveStackName(appName, env)` — e.g., `benjamin-chavez-com` + `prod` → `BenjaminChavezCom-Prod`
- `loadAppContext(app)` — loads and validates context from `cdk.json`
- `resolveEnvironmentConfig(context, envName)` — resolves `${CDK_DEFAULT_ACCOUNT}`, `${CDK_DEFAULT_REGION}`, `${CLOUDFRONT_CERTIFICATE_REGION}` placeholders from process.env; resolves asset paths for compiled edge handler and redirects JSON

**`bin/app.ts`:** Loads context, resolves env config, creates tags (`Project`, `Environment`, `Repository`, `ManagedBy: cdk`, `Owner`), instantiates `StaticSiteStack`.

### Step 2.3: CDK constructs

**`lib/stacks/static-site-stack.ts`** — Stack wrapper. Creates `StaticSite` construct and exposes 4 `CfnOutput`s:
- `BucketName` — S3 bucket name
- `DistributionId` — CloudFront distribution ID
- `DistributionDomainName` — CloudFront domain (e.g., `d123.cloudfront.net`)
- `NameServers` — Route 53 hosted zone NS records

**`lib/constructs/static-site.ts`** — Main infrastructure construct:

| Resource | Config |
|---|---|
| S3 bucket | `{appName}-{env}-site` naming, `BlockPublicAccess.BLOCK_ALL`, S3-managed encryption, **removalPolicy: RETAIN** |
| CloudFront OAC | S3v2 origin access control |
| CloudFront distribution | **HTTP/2 + HTTP/3**, TLS 1.2+ (2021 policy), PriceClass.PRICE_CLASS_100, custom domain + alternates, default root object: `index.html`, error responses: 403/404 → `/404.html` with 300s TTL |
| ACM certificate | DNS-validated via Route 53, region: `certificateRegion` (us-east-1) |
| Route 53 hosted zone | New zone for domain, **removalPolicy: RETAIN** |
| Route 53 records | A + AAAA alias to CloudFront for apex + each alternate domain, **removalPolicy: RETAIN** |
| Response Headers Policy | See security headers below |
| CloudFront routing | Delegated to `CloudFrontRouting` construct |
| S3 bucket policy | CloudFront OAC access only |

**Security headers (Response Headers Policy):**
- **CSP:** `default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://static.cloudflareinsights.com https://www.youtube.com; frame-src youtube.com www.youtube.com https://imgur.com/; style-src 'self' 'unsafe-inline'; img-src * blob: data:; media-src 'none'; connect-src 'self' https://static.cloudflareinsights.com; font-src 'self'`
- **HSTS:** max-age 63072000 (2 years), includeSubDomains, preload
- **X-Frame-Options:** DENY
- **X-XSS-Protection:** 1; mode=block
- **X-Content-Type-Options:** nosniff (override enabled)
- **Referrer-Policy:** origin-when-cross-origin
- **Permissions-Policy:** camera=(), microphone=(), geolocation=()
- **X-DNS-Prefetch-Control:** on

**`lib/constructs/cloudfront-routing.ts`** — Separate construct:
- **CloudFront Function:** Runtime `cloudfront-js-2.0` (required for KeyValueStore), source compiled from TypeScript (see Step 2.4)
- **CloudFront KeyValueStore:** Stores redirect mappings loaded from `assets/cloudfront/redirects.json`

**Region architecture:** Main stack deploys to `AWS_REGION` (us-east-2). ACM certificate created in `CLOUDFRONT_CERTIFICATE_REGION` (us-east-1) because CloudFront requires us-east-1 certs. All other resources (S3, CloudFront, Route 53) are global or region-agnostic.

### Step 2.4: CloudFront edge handler (TypeScript)

**`edge/viewer-request.handler.ts`** — TypeScript source compiled via `tsconfig.edge.json` to `infrastructure/dist/cloudfront/viewer-request.handler.js`.

**Functionality:**
1. Checks CloudFront KeyValueStore for redirect mappings → returns 301 with `Location` header, preserving query strings
2. SPA fallback: URI ending in `/` → append `index.html`; URI without file extension → append `/index.html`
3. File extension detection: checks last segment of URI for `.` character

**`tsconfig.edge.json`:** target ES2022, module ES2022 (ESM for edge runtime), output to `infrastructure/dist/cloudfront/`, no source maps or declarations.

**`assets/cloudfront/redirects.json`:**
```json
[
  {"key": "/blog/step-by-step-guide-setting-up-expressjs-typescript-web-app", "value": "/blog/creating-a-typescript-express.js-web-application-with-es6-step-by-step-guide/"},
  {"key": "/downloads/epay-mailer", "value": "/downloads/Estimated%20Tax%20Payment%20Mailer.zip"}
]
```

### Step 2.5: Infrastructure build system

**`infrastructure/package.json`:**
- Dependencies: `aws-cdk-lib@^2.180.0`, `constructs@^10.4.0`
- DevDependencies: `aws-cdk@^2.180.0`, `ts-node@^10.9.2`, `typescript@^5.8.0`
- Scripts:
  - `build` — compiles edge handler + CDK sources
  - `build:edge` — `tsc -p tsconfig.edge.json` (edge handler only)
  - `synth` — builds edge + `cdk synth`
  - `deploy` — builds edge + `cdk deploy`
  - `diff` — `cdk diff`

### Step 2.6: GitHub Actions CI/CD pipeline (1 orchestrator + 4 reusable workflows)

**Architecture:** One orchestrator workflow calls 4 reusable workflows.

**`.github/workflows/ci.yml`** (orchestrator):
- Triggers: `push` to `master`, `pull_request` to `master`, `workflow_dispatch`
- Env vars from repo variables: `AWS_REGION`, `CDK_STACK_NAME`, `APP_URL`
- Constants: `ARTIFACT_NAME: dist`, `TAG_PREFIX: v`
- Job chain: `actionlint` → `build` → `lighthouse` → `deploy` (deploy only on master push or dispatch)

**`.github/workflows/lint-github-actions.yml`** (reusable):
- Installs pinned `actionlint` v1.7.11
- Validates `.github/workflows/*.yml` syntax

**`.github/workflows/build-static-site.yml`** (reusable):
- Inputs: `app_url` (required), `artifact_name` (default: `dist`), `aws_region` (required)
- Secrets: `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`
- Steps: checkout → install pnpm → setup Node from `.nvmrc` → `pnpm install --frozen-lockfile` → `pnpm build` → upload `dist/` artifact (1-day retention)
- Env vars set for build: `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`, `NEXT_PUBLIC_APP_URL`, `NEXT_PUBLIC_AWS_REGION`, `NEXT_PUBLIC_CF_ANALYTICS_TOKEN` (var), `NEXT_PUBLIC_CW_RUM_APP_MONITOR_ID` (var), `NEXT_PUBLIC_CW_RUM_IDENTITY_POOL_ID` (var), `NEXT_PUBLIC_SENTRY_DSN` (var)

**`.github/workflows/lighthouse-static-site.yml`** (reusable):
- Inputs: `artifact_name` (default: `dist`)
- Steps: download artifact → `npx @lhci/cli autorun` → upload `.lighthouseci/` results

**`.github/workflows/deploy-static-site.yml`** (reusable):
- Inputs: `artifact_name`, `aws_region` (required), `cdk_stack_name` (required), `tag_prefix` (default: `v`)
- Secrets: `AWS_DEPLOY_ROLE_ARN`
- Permissions: `contents: write`, `id-token: write`
- Concurrency: `group: production-deploy, cancel-in-progress: false`
- Steps: checkout (full history) → download artifact → configure AWS via GitHub OIDC → read CloudFormation outputs (BucketName, DistributionId) → `aws s3 sync dist/ s3://$BUCKET --delete` → `aws cloudfront create-invalidation --paths "/*"` → bump semver patch tag and push

**OIDC role permissions needed:** `s3:PutObject`, `s3:DeleteObject`, `s3:ListBucket`, `cloudfront:CreateInvalidation`, `cloudformation:DescribeStacks`.

### Step 2.7: Lighthouse CI configuration

**`.lighthouserc.js`:**
- Static dist dir: `./dist`
- URLs: `/index.html`, `/blog/index.html` (3 runs each)
- Assertions: performance >= 0.9 (warn), **accessibility >= 0.9 (error — deployment gate)**, best-practices >= 0.9 (warn), SEO >= 0.9 (warn)
- Upload: temporary-public-storage

### Step 2.8: Deployment versioning

After successful S3 sync + CloudFront invalidation, the deploy workflow:
1. Fetches latest tag matching prefix (default `v`)
2. Bumps patch version (no existing tags → `v0.0.1`)
3. Creates and pushes a lightweight git tag

### Step 2.9: Custom GitHub Actions

**`.github/actions/setup-node-pnpm/action.yml`:** Composite action wrapping `pnpm/action-setup` + `actions/setup-node` with `.nvmrc` and pnpm cache. Present in the repo, but not called by the live workflows.

**`.github/actions/tag-deployment/action.yml` + `tag-deployment.sh`:** Configurable semver bumping (major/minor/patch), custom prefix, initial version. Outputs new tag name. Present in the repo, but the live deploy workflow uses an inline patch-bump implementation instead.

### Step 2.10: Initial deployment script

**`scripts/initial-aws-deploy.sh`:** One-time manual deployment helper.

Usage: `scripts/initial-aws-deploy.sh [--check|--apply]`

**`--check` mode:** Validates prerequisites only:
- Commands: `aws`, `jq`, `pnpm`
- Environment vars: `AWS_REGION`, `CLOUDFRONT_CERTIFICATE_REGION`
- File: `.env.local` containing `NEXT_PUBLIC_APP_URL` plus any repo-specific required client envs. In this repo that still includes `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` because the current schema and CI contract require it.

**`--apply` mode:** Full deployment:
1. Install infrastructure deps (if needed)
2. CDK diff (preview changes)
3. CDK bootstrap + deploy (`--require-approval never`)
4. Build static site (`pnpm build`)
5. Read CloudFormation outputs (BucketName, DistributionId, DistributionDomainName, NameServers)
6. S3 sync `dist/` with `--delete`
7. CloudFront invalidation `/*`
8. Print stack outputs + nameserver instructions for DNS cutover

Stack name: resolved from `CDK_STACK_NAME` env var or derived from `cdk.json` appName + "prod" (PascalCase).

### Step 2.11: Monitoring integrations

Three optional monitoring systems, all env-gated (no-op if env vars not set):

**CloudWatch RUM** (`src/components/utility/cloudwatch-rum.tsx`):
- Client component, dynamically imports `aws-rum-web@^2.0.0`
- Only initializes if both `NEXT_PUBLIC_CW_RUM_APP_MONITOR_ID` and `NEXT_PUBLIC_CW_RUM_IDENTITY_POOL_ID` are set
- Config: `sessionSampleRate: 1` (100%), telemetries: `['performance', 'errors', 'http']`, region from `NEXT_PUBLIC_AWS_REGION`
- Returns `null` (no UI)

**Sentry** (`src/components/utility/sentry-init.tsx`):
- Client component, dynamically imports `@sentry/browser@^10.46.0`
- Only initializes if `NEXT_PUBLIC_SENTRY_DSN` is set
- Config: `tracesSampleRate: 0` (errors only), environment from `NODE_ENV`
- Returns `null` (no UI)

**Cloudflare Web Analytics** (in `src/app/layout.tsx`):
- Conditional `<Script>` tag, only rendered if `NEXT_PUBLIC_CF_ANALYTICS_TOKEN` is set
- `strategy="afterInteractive"`, source: `https://static.cloudflareinsights.com/beacon.min.js`

All three are mounted in the root layout (`src/app/layout.tsx`).

### Step 2.12: Environment variable system

**`src/buildEnv.ts`:** Zod schema for build-time vars (`AWS_REGION`), guarded by `server-only`.

**`src/clientEnv.ts`:** Zod schema for all `NEXT_PUBLIC_*` vars with required/optional distinction.

**`.env.example`:** Template with all 8 variables organized by client-side vs build-time.

**GitHub repo configuration needed:**
- Secrets: `AWS_DEPLOY_ROLE_ARN`, plus any repo-specific required client envs. In this repo the live build still requires `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`
- Variables: `AWS_REGION`, `CDK_STACK_NAME`, `APP_URL`, `NEXT_PUBLIC_CF_ANALYTICS_TOKEN` (optional), `NEXT_PUBLIC_CW_RUM_APP_MONITOR_ID` (optional), `NEXT_PUBLIC_CW_RUM_IDENTITY_POOL_ID` (optional), `NEXT_PUBLIC_SENTRY_DSN` (optional)

### Step 2.13: Infrastructure documentation

Create three documentation files:

**`infrastructure/INFRASTRUCTURE.md`:** Commands reference (`build`, `synth`, `deploy`, `diff`), package layout, region explanation (us-east-2 main + us-east-1 ACM).

**`infrastructure/INITIAL_DEPLOYMENT.md`:** Full runbook — prerequisites (Node 24, pnpm 10, AWS CLI, jq, gh), env setup (`AWS_REGION`, `CLOUDFRONT_CERTIFICATE_REGION`), GitHub secrets/variables setup, `.env.local` preparation, first deploy flow (`--check` then `--apply`), verification steps, DNS cutover instructions, rollback notes.

**`.github/CI-CD.md`:** Workflow layout (5 workflows), execution flow and job chain, GitHub Actions linting, build artifact details, Lighthouse behavior, deployment behavior, versioning strategy, inputs/secrets/variables reference, first infrastructure deploy instructions.

---

## Phase 3: DNS cutover and verification

### Step 3.1: Deploy infrastructure

Use the initial deployment script (see Step 2.10):

```bash
# Dry run — validate prerequisites
scripts/initial-aws-deploy.sh --check

# Full deployment — CDK bootstrap + deploy + build + S3 sync + invalidation
scripts/initial-aws-deploy.sh --apply
```

The script outputs `NameServers` for DNS cutover and `DistributionDomainName` for pre-DNS verification.

### Step 3.2: Update Namecheap DNS

Namecheap → Domain → Nameservers → Custom DNS → enter the 4 Route 53 NS values. Propagation: 15 min – 48 hours. ACM cert auto-validates once DNS resolves.

### Step 3.3: Attach CloudFront flat-rate Free plan (if eligible)

AWS Console → CloudFront → Pricing plans → Create plan → Free tier → attach distribution → attach Route 53 hosted zone. This zeroes out the Route 53 zone fee and S3 storage within the credit.

If the account is not eligible (AWS Free Tier trial account), skip this step. Pay-as-you-go applies (~$1/month).

### Step 3.4: First deploy

Push to `master` to trigger GitHub Actions.

### Step 3.5: Production verification

```bash
# Pages
curl -sI https://benjamin-chavez.com | head -20
curl -sI https://benjamin-chavez.com/blog | head -5
curl -sI https://benjamin-chavez.com/blog/creating-a-typescript-express.js-web-application-with-es6-step-by-step-guide | head -5

# Security headers
curl -sI https://benjamin-chavez.com | grep -iE 'strict-transport|content-security|x-frame|x-content-type'

# Redirects
curl -sIL https://benjamin-chavez.com/blog/step-by-step-guide-setting-up-expressjs-typescript-web-app | grep -iE 'location|HTTP/'
curl -sIL https://benjamin-chavez.com/downloads/epay-mailer | grep -iE 'location|HTTP/'

# OG image meta
curl -s https://benjamin-chavez.com/blog/creating-a-typescript-express.js-web-application-with-es6-step-by-step-guide | grep 'og:image'
```

Visual:
- [ ] All pages render correctly
- [ ] Syntax highlighting + copy buttons work
- [ ] Banner image loads
- [ ] Portfolio blur placeholders render
- [ ] Cloudflare Analytics loading (Network tab)
- [ ] OG preview via https://opengraph.xyz
- [ ] Submit sitemap in Google Search Console

### Step 3.6: Site #2

Extract `lib/constructs/static-site.ts` and `lib/constructs/cloudfront-routing.ts` to `@benchavez/cdk-constructs`. Add to site #2 repo. Same workflow pipeline, different `cdk.json` context (appName, domainName, redirects). Second flat-rate Free distribution.

### Step 3.7: Cancel Vercel Pro

---

## Repo-Specific Carryovers

These landed in this repo during the same implementation window, but should not be copied blindly into another repo unless you want exact benjamin-chavez.com parity:

- Checked-in generated artifacts like `public/og/*.png` and `infrastructure/cdk.out/`
- IDE metadata under `.idea/`
- Repo-local helper actions under `.github/actions/` that are not part of the live workflow chain
- Visual-only parallax/overscroll polish in the marketing pages

---

## Assumptions

1. The AWS account is a paid account (not an AWS Free Tier trial), making it eligible for CloudFront flat-rate plans. If not, pay-as-you-go fallback applies (~$1/month).
2. No Route 53 hosted zone for the domain currently exists in the target AWS account.
3. The `rehype-clipboard-prep-code` npm package works with `@next/mdx`'s compilation pipeline without changes. If it doesn't, the package can be updated (you own it).
4. The target repo uses the same MDX/content conventions: YAML frontmatter in `.mdx` files, date-based draft handling, and static-export-safe metadata routes.
5. GitHub OIDC role is configured with permissions: `s3:PutObject`, `s3:DeleteObject`, `s3:ListBucket`, `cloudfront:CreateInvalidation`, `cloudformation:DescribeStacks`.
6. `AWS_REGION` (main stack) and `CLOUDFRONT_CERTIFICATE_REGION` (us-east-1 for ACM) environment variables are set for CDK deployment.
7. Lighthouse CI scores meet minimum thresholds (accessibility >= 0.9 is a deployment gate).

## Resolved risks

1. **`remark-frontmatter` + `@next/mdx` interaction** — Confirmed working. No YAML frontmatter in rendered output.
2. **`rehype-clipboard-prep-code` compatibility** — Confirmed working. Copy-to-clipboard functions correctly.
3. **CSP and Cloudflare analytics** — Handled. CloudFront Response Headers Policy includes `static.cloudflareinsights.com` in `script-src` and `connect-src`.
4. **ESLint 9 migration** — Completed. Flat config with `tseslint.config()`.

## Unresolved risks (ordered by likelihood of immediate impact)

1. **Turbopack incompatibility.** Dev and build require `--webpack` flag due to non-serializable rehype-pretty-code callbacks.
2. **`server-only` imports are misleading.** They provide no runtime enforcement in a static export but don't cause harm.

---

## Top changes from v3

1. **reading-time now computed on body only** — `readingTime(matter(raw).content)` instead of `readingTime(raw)`, matching Contentlayer's `readingTime(doc.body.raw)`.
2. **clsx import matches repo convention** — `import clsx from 'clsx'` (default) instead of `import { clsx } from 'clsx'` (named). All component types use explicit `any` to match existing code style.
3. **CDK is in-repo first, extract later** — No shared `@benchavez/cdk-constructs` package on the critical path. Constructs live in `infrastructure/lib/constructs/`. Extract to shared package for site #2.
4. **Pricing section has both models** — Primary: flat-rate Free plan ($0/month) with explicit caveats (paid account required, hosted zone must be attached). Fallback: pay-as-you-go (~$1/month).
5. **Verification is local-only in Phase 1** — Removed all Vercel references. Headers and redirects tested only after CloudFront deployment (Phase 3.5).

## Top changes from v4 plan to actual implementation

1. **CDK architecture expanded** — Single `StaticSiteConstruct` became 3 files: stack wrapper, main construct, and CloudFront routing construct, plus a full config/types system driven by `cdk.json` context.
2. **CloudFront Function is TypeScript + KeyValueStore** — Not hardcoded JS. Redirects stored in KVS loaded from `redirects.json`, compiled from TypeScript via separate `tsconfig.edge.json`.
3. **Region split** — Main stack in us-east-2, ACM certificate in us-east-1. Config supports this via `certificateRegion` field.
4. **5-workflow GitHub Actions pipeline** — One orchestrator plus four reusable workflows. Includes Lighthouse CI quality gates, actionlint validation, deployment tagging/versioning.
5. **Monitoring stack** — Added CloudWatch RUM + Sentry + Cloudflare Analytics (all optional, env-gated).
6. **Zod environment validation** — `buildEnv.ts` and `clientEnv.ts` with typed schemas.
7. **Initial deploy script** — `scripts/initial-aws-deploy.sh` with `--check`/`--apply` modes replaces manual CDK commands.
8. **Parallax background** — Banner image uses new ParallaxBackground component instead of plain `<img>`.
9. **ESLint 9 flat config** — Migrated from `.eslintrc.json` to `eslint.config.mjs`.
10. **`distDir: 'dist'`** — Output directory changed from default `out/`.

---

## ctrl-f-plus-website Implementation Notes (2026-03-28)

### Phase 1 (Code Changes) — COMPLETED
All code changes from Phase 1 have been applied. See `phase-1-nextjs-upgrade.md` implementation notes for details.

### Phase 2 (AWS Infrastructure) — COMPLETED (code only)
- Full CDK infrastructure created in `infrastructure/` adapted for `ctrl-f.plus`
- `cdk.json` context: `appName: "ctrl-f-plus-website"`, `domainName: "ctrl-f.plus"`, `alternateDomainNames: ["www.ctrl-f.plus"]`
- DNS stack, static site stack, CloudFront routing construct all created
- Edge handler (viewer-request) with KVS redirect support
- Empty `redirects.json` asset (no legacy redirects for this site)
- GitHub Actions CI/CD pipeline: 5 workflows (ci, build, lighthouse, deploy, lint-github-actions)
- Composite actions: setup-node-pnpm, tag-deployment with semver bumping
- `scripts/initial-aws-deploy.sh` adapted for ctrl-f-plus
- `scripts/cleanup.sh` created
- Build workflow adapted to not require `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` (not used by this site)
- Build workflow includes ctrl-f-plus-specific env vars (CHROME_STORE_URL, GITHUB_EXT_URL, etc.)

### Phase 3 (DNS Cutover) — NOT IMPLEMENTED
DNS cutover is a manual operational step. Prerequisites documented in the plan.

### Key Deviations from Plan
1. **Node 22 (not 24)**: Target repo uses `>=22` engine constraint; `.nvmrc` set to `22`
2. **No `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`**: Not used by ctrl-f-plus site
3. **No parallax-background component**: Visual enhancement specific to reference repo
4. **No jscodeshift codemod**: Not needed for this codebase
5. **Build workflow env vars**: Added ctrl-f-plus-specific vars (CHROME_STORE_URL, etc.)
6. **`prettier-plugin-tailwindcss` bug fix**: Was incorrectly listed as a Tailwind plugin in tailwind.config.ts; removed during build verification

---

## Sources
- [Next.js MDX Guide](https://nextjs.org/docs/app/guides/mdx) — frontmatter, dynamic imports, remark/rehype plugins
- [mdx-components.tsx API Reference](https://nextjs.org/docs/app/api-reference/file-conventions/mdx-components) — `useMDXComponents()` no-argument signature
- [Next.js Static Export Guide](https://nextjs.org/docs/app/guides/static-exports)
- [CloudFront flat-rate pricing plans](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/flat-rate-pricing-plan.html) — eligibility, hosted zone attachment
- [CloudFront Functions URL rewrite](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/example-function-add-index.html)
- [rehype-clipboard-prep-code](https://github.com/benjamin-chavez/rehype-clipboard-prep-code)
