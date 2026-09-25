# Ctrl-F Plus website: combined text style inventory

Reconciled from two independent read-only audits (Claude and Codex) on 2026-09-24. Pixel values assume a 16px root. Line numbers refer to the current working tree.

## Foundations

**Fonts.** Three Google fonts are loaded through next/font in src/app/layout.tsx:14-27 and exposed as CSS variables: Inter (--font-inter, display swap), Open Sans (--font-open-sans), Arimo (--font-arimo). Tailwind maps them to font-inter, font-open-sans, font-arimo (tailwind.config.ts:114-118). Nothing sets a font family on html or body, so every text node without an explicit font-* class renders in Tailwind preflight's system sans stack. font-mono is the default preflight monospace stack. html carries `antialiased`. The OG image generator loads only Inter 700 from @fontsource/inter (scripts/generate-og-images.tsx:25-30).

**Custom size tokens** (tailwind.config.ts:119-137):

| Token | Size | Line height | Weight | References in src |
|---|---|---|---|---|
| fs-base | 16px | 1.3rem (20.8px) | 600 | 4 |
| fs-sm | 14px | 1.5rem (24px) | inherit | 2 |
| fs-md | 18px | normal | 400 | 0, absent from built CSS |
| fs-md-bold | 18px | 1.53125rem (24.5px) | 600 | 0, absent from built CSS |
| fs-lg-sm | 16px | 1.5 (24px) | 400 | 1 (dormant blog author) |
| fs-lg | 18px | 1.5 (27px) | 400 | 16 base + 4 responsive |
| fs-x0 | 33px | 1 (33px) | 800 | 4 |
| fs-middle | 44px | 1.1 (48.4px) | 800 | 3 + 1 responsive |
| fs-xxx | 55px | 1.1 (60.5px) | 800 | 1 + 1 responsive |
| fs-xx | 55px | 1.5 (82.5px) | 800 | 1 |
| fs-xl | 55px | 1.2 (66px) | 800 | 6 + 4 responsive |
| subtitle | 23px | 1.3 (29.9px) | 600 | 2 + mdx.css |
| h1-blog | 28px | 1.3 (36.4px) | 600 | mdx.css only |
| p-blog | 18px | 2rem (32px) | 400 | mdx.css only |
| button-18 | 18px | normal | 600 | 1 (dormant blog back link) |

Stock Tailwind sizes also in use: text-sm, text-base, text-lg, text-xl, text-2xl, text-3xl, text-4xl, sm:text-5xl. Weights in use: 400, 500 (font-medium), 600, 700, 800.

**Text colours in use.** shark and shark-500 (both #1b2528), shark/80, white, white/80, gray-300 (#d1d5db), gray-600 (#4b5563), highlighter-900 (#0C3440), highlighter-500 (#128DA1), highlighter-focus-400 (#48d0a8), highlighter-focus (#53E7BB, same as highlighter-focus-300), cape-cod (#434343, same as cape-cod-500), mongo-black (#001E2B) and mongo-black/70, arbitrary #889397, arbitrary #0a2b35/70, arbitrary #0C3440 (equals highlighter-900), neutral-200/300/800, decoration-neutral-400, CSS keyword gray (#808080), transparent (gradient text), prose variables (#374151 body, #111827 headings/links/bold/code, #6b7280 counters, #d1d5db bullets), and the 19 foreground colours in assets/themes/ctrl-markdown-theme.json.

**Breakpoints** used on text: mobile-md 400, tablet 480, sm 640, tab-pro 768, laptop 900, desktop 1024, wide 1280. The config sets hoverOnlyWhenSupported, so every hover colour below applies only on hover-capable pointers. Buttons drop their slice animation under prefers-reduced-motion and fall back to the plain hover and active colours.

**Publication status.** Both blog posts carry publishedAt 2050-09-19 and src/lib/posts.ts:87-92 filters out future dates, so every blog-only style below is dormant in production until a post is dated in the past. Styles marked "dormant" are still real code and belong in the inventory.

## Text styles in use

| ID | Role | Family | Size and responsive ladder | Weight | Line height | Colour | Notes | Where |
|---|---|---|---|---|---|---|---|---|
| S1 | Hero H1 | Inter | fs-xxx, mobile-md: fs-xl (55px both) | 800 | 60.5 to 66px at 400px | shark | Highlight spans sit on bg-highlighter-focus rounded-2xl px-2 | hero.tsx:16,28 |
| S2 | Hero "Hoarders" span under 400px | Inter (inherited) | fs-xx 55px | 800 | 82.5px | shark | mobile-md:hidden | hero.tsx:24 |
| S3 | Page title H1 | Inter | fs-xl 55px | 800 | 66px | shark | | about:142, blog:33, setup:29, privacy:29 |
| S4 | Error and 404 H1 | Inter | fs-xl, sm: text-5xl (55 to 48px) | 800 | 66 to 48px | shark | tracking-tight; shrinks at 640px | error.tsx:28, not-found.tsx:15 |
| S5 | Article title H1 (dormant) | Inter | fs-x0, tab-pro: fs-middle, desktop: fs-xxx (33, 44, 55px) | 800 | 33, 48.4, 60.5px | shark | | blog/[slug]/page.tsx:108 |
| S6 | Section heading H2 | Inter | fs-middle 44px | 800 | 48.4px | shark; white in InfoCardDark | InfoCard centres text; InfoCardDark has no caller | about:162, info-card.tsx:29,65 |
| S7 | Feature and CTA headline | Inter | fs-x0, tab-pro: fs-xl (33 to 55px) | 800 | 33 to 66px | shark (h3), white (h2) | Centre then laptop:text-left on cards | feature-cards.tsx:133, call-to-action.tsx:86 |
| S8 | Feature-header gradient headline | Inter | same ladder as S7 | 800 | same | transparent over gradient blue, cyan, lavender via bg-clip-text; wide: cape-cod on base layer, white on hover layer, gray-1/gray-2 gradient stops | Mask and mix-blend-overlay make apparent colour position dependent | features-header.tsx:39-42 |
| S9 | Eyebrow, kicker, footer column label | Inter | fs-base 16px | 600 | 20.8px | highlighter-900 (feature cards), white (feature header, footer), wide: cape-cod on base layer | text-wrap balance on cards | feature-cards.tsx:129, features-header.tsx:33, footer.tsx:57 |
| S10 | Card title and subtitle | Inter (blog card), system sans (footer) | subtitle 23px | 600 | 29.9px | shark (blog, dormant), white (footer) | Footer h3 has no font class; the whole blog card drops to 75% opacity on hover | blog/page.tsx:72,76, footer.tsx:87 |
| S11 | Body and lead paragraph | Open Sans | fs-lg 18px | 400 | 27px | shark; white in CTA, feature header and InfoCardDark; wide: cape-cod on feature-header base layer | text-wrap balance in cards | hero:32, about:144,153, blog:38,44, setup:33, privacy:31, feature-cards:137, features-header:49, call-to-action:90, info-card:33,69 |
| S12 | Inline brand accent | inherits S11 | inherits | 400 | inherits | highlighter-focus-400 | Hero uses a background highlight instead | about:145, setup:30, privacy:30 |
| S13 | Blog card date (dormant) | Open Sans | fs-lg 18px | 400 | 27px | shark | Same style as body, not as the caption S14 | blog/page.tsx:79 |
| S14 | Date caption | Open Sans | no base size (16px), tab-pro: fs-lg 18px | 400 | 24 to 27px | #889397 | | setup:26, privacy:26, blog/[slug]:104 |
| S15 | Article author (dormant) | Open Sans | fs-lg-sm, tab-pro: fs-lg (16 to 18px) | 400 | 24 to 27px | shark | Wrapper text-sm leading-6 is overridden and dead | blog/[slug]:123-124 |
| S16 | Article back link (dormant) | Open Sans | button-18 18px | 600 | normal | mongo-black, hover /70 | Icon fill #889397 | blog/[slug]:83-98 |
| S17 | Team member name | Inter | text-lg 18px | 600 | leading-8 32px | shark | Stock utilities, no token | about:180 |
| S18 | Team role and bio | Arimo | text-base 16px | 400 | leading-7 28px | shark/80 | Only non-prose use of Arimo | about:183,186 |
| S19 | Copyright | Open Sans | fs-lg 18px | 400 | leading-5 20px overrides token | white | | footer.tsx:139 |
| S20 | Footer link | Open Sans | fs-sm 14px | 400 | 24px | gray-300, hover white | | footer.tsx:61-72 |
| S21 | Footer blurb | Open Sans | text-sm 14px | 400 | 20px | gray-300 | text-wrap balance | footer.tsx:95 |
| S22 | Footer GitHub link | Open Sans | fs-sm 14px; repo span fs-base 16px | 700 prefix span, 600 repo span | 24 and 20.8px | gray-300 with hover white; repo span highlighter-focus-400 with hover highlighter-focus | laptop:text-center | footer.tsx:103-108 |
| S23 | Error and 404 body | system sans | text-base 16px | 400 | leading-7 28px | gray-600 | | error:31, not-found:18 |
| S24 | 404 label | system sans | text-base 16px | 600 | 24px | highlighter-900 | | not-found:14 |
| S25 | Pricing placeholder | system sans | none; preflight resets h2/h3/p to 16px | 400 | 24px | none set, on bg-shark | Unfinished section | pricing-cards.tsx:61-76 |
| S26 | Desktop nav item | Open Sans | fs-lg 18px | 400 | 27px | highlighter-500 active; !shark, hover !shark/80 inactive | Visible from 900px | navbar/index.tsx:78-98 |
| S27 | Mobile nav item | system sans | text-base 16px | 600 | leading-7 28px | shark | hover:bg-gray-50 only | navbar/mobile-menu.tsx:59 |
| S28 | Button label, size thin | Open Sans | text-lg 18px | 600 | leading-6 24px | solid: white, active white/80; outline: highlighter-900, active #0a2b35/70; slice: tablet:group-hover #0C3440 | text-center | Button.tsx:31,39,60-70,190; callers hero:40, quick-view:14, about:199, blog:62, error:36, not-found:23 |
| S29 | Button label, size phat | Open Sans | text-lg 18px | 400 | leading-[1.6875rem] 27px | white; slice hover #0C3440 | Only the CTA uses it; outline plus phat would render white because the size class wins in twMerge, no caller | Button.tsx:40, call-to-action.tsx:71 |
| S30 | Button with no size or intent | Open Sans | inherits 16px | 400 | 24px | none | Pricing "Try Now" | pricing-cards.tsx:76 |
| S31 | Prose base, tight list items, unstyled code title | system sans | 16px | 400 | 28px | #374151; ol markers #6b7280; ul markers #d1d5db | Actual body style on /setup and /privacy | mdx-components.tsx:77,101; keyboard-shortcut-setup.mdx:7-16 |
| S32 | Prose h1 | system sans; Inter on blog | text-4xl 36px; blog override h1-blog 28px | 700; 600 on blog | 40px; 36.4px on blog | #111827; shark-500 on blog | tracking-tight survives the override; no h1 in any content | mdx-components.tsx:15, mdx.css:70 |
| S33 | Prose h2 | system sans; Inter on blog | text-3xl 30px; blog override subtitle 23px | 600 | 36px; 29.9px on blog | #111827; shark-500 on blog | border-b pb-1 and tracking-tight survive | mdx-components.tsx:24, mdx.css:74; all doc and post h2s |
| S34 | Prose h3 | system sans | text-2xl 24px | 600 | 32px | #111827 | | mdx-components.tsx:33; shared-state.mdx:157,163 |
| S35 | Prose h4, h5, h6 | system sans | text-xl 20, text-lg 18, text-base 16px | 600 | 28, 28, 24px | h4 #111827; h5 and h6 inherit body #374151 | tracking-tight; no content instances | mdx-components.tsx:42,51,60 |
| S36 | Prose paragraph | system sans; Arimo on blog | 16px; blog override p-blog 18px | 400 | leading-7 28px; 32px on blog | #374151; shark-500 on blog | Loose-list paragraphs on blog also get Arimo 18px while markers stay 16px | mdx-components.tsx:77, mdx.css:78 |
| S37 | Prose link | inherits paragraph | inherits | 500 | inherits | #111827 | underline offset 4px; on blog decoration-neutral-400, 0.1em thick, offset 2px | mdx-components.tsx:69, mdx.css:22; privacy-policy.mdx:26,32 |
| S38 | Prose strong | inherits | inherits | 600 | inherits | #111827 | | plugin default; shared-state.mdx:151-191 |
| S39 | Prose blockquote | system sans | 16px | 500 | 28px | #111827 | italic, border-l-2 pl-6, curly quotes from plugin; on blog an inner paragraph would take Arimo 18/32/400 shark-500 from .prose p, overriding the quote weight and colour; text-muted-foreground is a no-op; no content instance | mdx-components.tsx:87, mdx.css:78 |
| S40 | Inline code | mono | text-sm 14px | 600 | 20px | #111827 | Plugin adds literal backtick glyphs via ::before and ::after, never disabled; blog adds bg-gray-200 border-none px-0 | mdx-components.tsx:162, mdx.css:33; keyboard-shortcut-setup.mdx:14-15 |
| S41 | Code block text (dormant) | mono | text-sm 14px | 400 | 20px, 28px row pitch with .line py-1 | fallback neutral-800 from .prose pre code (beats fragment text-black; the language-class rule never matches) | rehype-pretty-code 0.9.11 defaults to keepBackground false, so the theme's #282828 never reaches the pre; !bg-transparent cancels .prose pre's bg-shark-500 and the .remark-code-container wrapper supplies the final shark background | mdx-components.tsx:150,162; mdx.css:27-56,82-89,134 |
| S42 | Syntax tokens (dormant) | mono | 14px | per token | 20px | inline from ctrl-markdown-theme.json: #B9CFC9 default, #48D0A8 bold tags, #53E7BB strings, #128DA1 bold keywords and plain operators, #928375 italic comments, #9EACEA functions, #3EBDF4 bold constants; 19 colours defined, 9 observed | Four colours duplicate brand tokens | assets/themes/ctrl-markdown-theme.json, next.config.mjs:55-57 |
| S43 | Code line numbers (dormant) | mono | 14px | 400 | 20px | gray #808080 | Only fences with showLineNumbers | mdx.css:92-99 |
| S44 | Code title bar, colon fence (dormant) | mono | text-sm 14px | 500 | 20px | neutral-200 on bg-shark-800 | truncate | title.tsx:9; shared-state.mdx:19,42 |
| S45 | Code title, title="" fence (dormant) | system sans | 16px | 400 | 28px | #374151 | Falls through to S31; its rule is commented out | mdx.css:117-120; shared-state.mdx:98,141 |
| S46 | Heading anchor "#" (dormant) | inherits heading | inherits | 500 | inherits | neutral-300 | Visible on hover, blog only | mdx.css:1-26 |
| S47 | Prose table th and td | system sans | 14px | th 700, td 400 | 24px | th #111827, td #374151 | border px-4 py-2 text-left; align attributes switch to centre or right; no content instance | mdx-components.tsx:132,145 |
| S48 | Selection | unchanged | unchanged | unchanged | unchanged | white on highlighter-500 | | globals.css:12-14 |
| S49 | OG image (build-time PNG) | Inter 700 only | title 48px, url 24px, author 20px | 700 for all three, since only the bold face is loaded | title 1.2 | title #f8fafc, url #94a3b8, author #64748b on slate gradient | Palette unrelated to the site | scripts/generate-og-images.tsx:46-79 |
| S50 | Store redirect page | browser serif | 16px | 400 | normal | black | Outside Next and Tailwind | public/ext/index.html:10 |

Out of scope by agreement of both audits: the development-only breakpoint badge from tailwindcss-debug-screens, lettering baked into raster or SVG illustrations, and the YouTube player iframe. No icon component contains an SVG text node.

## Dead code, inconsistencies, and cascade notes

**Dead or no-op.**
- fs-md and fs-md-bold: zero references, absent from the built CSS.
- prose-quoteless (tailwind.config.ts:177): never applied.
- text-muted-foreground and even:bg-muted (mdx-components.tsx:87,121): tokens undefined, emit nothing.
- gradient-text, animate-gradient-x, opacity-1 (features-header.tsx:39,146): no matching utilities.
- [--color-from] and [--color-to] on slice buttons (Button.tsx:52): set, never read.
- code[class*='language-'] rule (mdx.css:54): rehype-pretty-code rebuilds the code element with data-language, so it never matches.
- .line-highlighted span (mdx.css:109): one hyphen, generated class has two.
- Wrapper text-sm leading-6 (blog/[slug]:123).
- Commented out: selection text-black (globals.css:12), dark code text (mdx.css:38), code-title font-mono text-xs font-medium text-neutral-200 (mdx.css:117-120), InfoCard and star button (about:215-229), title annotation (shared-state.mdx:60).
- Defined without callers: InfoCardDark, outline plus phat button, prose h1, h4, h5, h6, blockquote, th, td mappings.

**Inconsistencies and near-duplicates.**
1. No base font family. S10 (footer), S23, S24, S25, S27, S31, S33 to S36 on the docs pages, S34, S35, S45 and S50 render in the system stack despite three loaded Google fonts.
2. mdx.css is imported only in blog/[slug]/page.tsx:7. The built setup page links one CSS chunk, blog pages link two, and .prose h1 exists only in the second. So prose on /setup and /privacy differs from blog prose in family, size, line height and colour. Client-side navigation can leak the blog chunk into those pages, making them history dependent.
3. Button thin (18/24/600) near-duplicates fs-md-bold (18/24.5/600); phat (18/27/400) duplicates fs-lg exactly; fs-md and button-18 differ only by weight.
4. fs-xxx, fs-xx and fs-xl are all 55px/800 and differ only in line height (60.5, 82.5, 66px).
5. Exact colour aliases: shark equals shark-500, cape-cod equals cape-cod-500, highlighter-focus equals highlighter-focus-300.
6. Arbitrary hex: #0C3440 equals highlighter-900; #0a2b35 and #889397 have no token; the highlight theme stores its own copies of #48D0A8, #53E7BB, #128DA1 and #FF6960; the OG image uses a slate palette.
7. Two 14px footer styles: fs-sm (line height 24px) and text-sm (20px).
8. Copyright applies fs-lg then overrides its line height with leading-5.
9. Dates: blog card date is body shark 18px; page captions are #889397 with no base size, jumping from 16px to 18px at 768px.
10. Error and 404 H1 shrink from 55px to 48px at 640px and add tracking-tight; ordinary page titles do not.
11. Desktop nav is Open Sans 18/27/400; mobile nav is system sans 16/28/600.
12. The subtitle token appears in three treatments: Inter (blog card), system sans (footer), Inter with tracking-tight (blog prose h2).
13. Team card uses Arimo 16/28 at 80% alpha where marketing body is Open Sans 18/27 opaque.
14. On blog, loose-list paragraphs become Arimo 18px while their markers stay system 16px; the setup page's tight lists are system 16px throughout, so list text differs by page and by list style.
15. Heading semantics do not track visual roles: a 16px h2 eyebrow sits above a 33 to 55px h3 headline; the CTA uses h2 for the same headline style; pricing h2 and h3 are preflight-reset to 16px.
16. Outline plus phat would render a white label because the size class carries text-white; slice buttons set colour variables that nothing reads, so their active state never dims the label.
17. Two code-title implementations: colon fences get S44, title="" fences get the unstyled S45.
18. Code fallback colour is declared three ways (neutral-800, neutral-50, black); only neutral-800 takes effect.
19. Inline code shows literal backtick glyphs from the prose plugin default.
20. OG url and author captions render bold because only Inter 700 is registered.
21. Prose link underline offset is 2px on blog and 4px on docs.

**Cascade resolutions.** .prose h1, .prose h2, .prose p and .prose a from mdx.css beat the mdx-components utilities on the properties they set because a two-part selector outranks a single utility class; tracking-tight, border-b and font-medium survive because the CSS rules do not touch them. Prose plugin rules use :where(), so utilities such as text-sm on inline code and font-bold on th win at equal specificity through layer order. .prose pre code outranks [data-rehype-pretty-code-fragment] code, and inline token styles outrank everything.

**Review trail.** Both audits found the same core set. Codex's peer review of Claude's draft confirmed 17 of 25 numbered findings, marked 8 as partially correct (wording now adjusted above), and reversed none; Codex corrected its own claim that OG images were unpublished, since the PNGs in public/og exist regardless of post dates. Codex added: the dormant status of all blog styles, prose h5 and h6 losing the heading colour, list marker colours, the dead colour variables on slice buttons, the outline plus phat conflict, the selector typo, the dev badge and the redirect page, and the observed syntax token set. Claude added: the built-CSS confirmation that the two dead tokens and the shadcn leftover classes emit nothing, and the theme file's full colour set and its brand overlap. Two of Claude's draft claims were wrong and Codex was right on both: the installed prose plugin 0.5.19 still adds backticks around inline code, and rehype-pretty-code 0.9.11 strips the theme background by default, so the pre never carries #282828.

## Counts

The 50 rows above are semantic roles, not unique type styles. They split as follows.

| Category | Rows |
|---|---|
| Live on production pages today | 29: S1 to S4, S6 to S12, S14, S17 to S24, S26 to S29, S31, S33, S36, S37, S40 |
| Unfinished pricing placeholder, excluded from the counts below | 2: S25, S30 |
| Dormant until a blog post is published | 12: S5, S13, S15, S16, S34, S38, S41 to S46, plus the blog halves of S10, S32, S33, S36, S37 |
| Defined mappings with no content instance | 4: S32, S35, S39, S47 |
| Off-site output | 2: S49 OG image, S50 redirect page |
| Colour effect, not a type style | 1: S48 selection |

Collapsing the 29 live rows by family, size, weight and line height, and ignoring colour, gives 24 distinct type styles:

| Family | Distinct styles |
|---|---|
| Inter | 55/60.5/800, 55/66/800, 55/82.5/800, 48/48/800 tight, 44/48.4/800, 33/33/800, 18/32/600, 16/20.8/600 |
| Open Sans | 18/27/400, 18/24/600, 18/20/400, 16/24/400, 16/20.8/600, 14/24/400, 14/24/700, 14/20/400 |
| Arimo | 16/28/400 |
| System sans | 30/36/600 tight, 23/29.9/600, 16/28/400, 16/28/500 underline, 16/28/600, 16/24/600 |
| Mono | 14/20/600 |

Publishing the blog would add roughly six more: Inter 23/29.9/600, Arimo 18/32/400, Open Sans 18/normal/600, mono 14/20/400, mono 14/20/500, and system 24/32/600.
