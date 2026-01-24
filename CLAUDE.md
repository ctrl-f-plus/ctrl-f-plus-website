e# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Marketing/documentation website for the Ctrl-F Plus Chrome extension (cross-tab search functionality). Built with Next.js 13 App Router, heavily optimized for performance with sophisticated Framer Motion animations.

## Commands

```bash
pnpm dev                # Start development server
pnpm dev:clear-cache    # Clear .next and .contentlayer caches, then start dev (use when editing MDX theme)
pnpm build              # Production build
pnpm start              # Run production build locally on http://localhost:3000
pnpm lint               # ESLint checks
```

## Architecture

### Rendering Strategy
- **Server Components** (`'use server'`): Layout, pages, non-interactive components
- **Client Components** (`'use client'`): Animations, interactivity (navbar, features-header, fade-in)

### Content Pipeline
```
/content/*.mdx → ContentLayer (contentlayer.config.js) → contentlayer/generated → Page components
```

Blog posts in `/content/blog/`, documentation in `/content/documentation/`. Drafts in `/content/drafts/` are excluded from builds.

### Animation Patterns
- **Framer Motion + LazyMotion**: Code-split animations to reduce bundle size
- **Reduced Motion**: Always check `useReducedMotion()` hook for accessibility
- **Fastdom**: Used in `features-header.tsx` for batched DOM reads/writes during mouse tracking
- **FadeIn/FadeInStagger**: Scroll-triggered entrance animations throughout the site

### Styling
- Tailwind CSS with extensive custom tokens in `tailwind.config.ts`
- CVA (class-variance-authority) for component variants (see `Button.tsx`)
- Custom colors: `highlighter`, `highlighter-focus` (accent cyan), `bittersweet` (red), `shark`/`cod-gray` (dark grays)
- Custom breakpoints: `mobile-sm`, `mobile-md`, `mobile-lg`, `tablet`, `tab-pro`, `laptop`, `desktop`, `wide`

### Key Components
- `/app/components/fade-in.tsx` - Animation wrapper used throughout
- `/app/components/features-header.tsx` - Complex mouse-tracking animation example
- `/app/components/ui/` - Primitive UI components (Button, container, ctrl-link)
- `/app/components/icons/` - SVG icon components

### Environment Variables
All `NEXT_PUBLIC_*` vars are client-accessible. See `.env.example` for required variables (Chrome Store URL, GitHub links, contact email).

## TypeScript Path Aliases
- `@/*` → project root
- `contentlayer/generated` → ContentLayer types and data