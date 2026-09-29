# Phase 1: Re-enable reduced motion on the static export

Date: 2026-09-25
Companion: `phase-2-guard-spec.md` adds the Playwright guard once this phase is merged.

## Context

The site honours `prefers-reduced-motion` in only four places today (hero still image, features-header hover layers, button slice fill, loading spinner). Everything that animates on entrance still moves for reduced-motion users, and two spots are hard-disabled: `src/components/call-to-action.tsx` discards the hook's value (`let prefersReducedMotion = false;`) and `src/components/feature-cards.tsx` has its reduced-motion branches commented out with a TODO to add them back.

Why every earlier attempt failed, each reproduced in an isolated React 19.2.4 harness and confirmed on the built site under emulated reduced motion:

1. Framer's own `useReducedMotion` returns null on the server, so the static export carries animation-on inline styles. React does not patch attribute mismatches during hydration, so reduced-motion users kept the server's styles.
2. The custom hook in `src/hooks/use-reduced-motion.ts` starts false and flips after mount. With `transition: all` inline, that flip itself becomes a full slide at page load. For `FadeIn` it only edits the hidden variant's `y` after the element already rendered at 24px, so it changes nothing.
3. `atropos/react` reads its options once in a mount effect, which runs before the parent's hook flips, so the CTA card tilts regardless.

The rule: anything that affects first paint is decided by CSS or by framer's `MotionConfig`, never by JavaScript that runs after paint. The hook stays for interaction-only and client-only effects.

Toolchain facts, verified against the installed packages (tailwindcss 3.3.3, tailwind-merge 1.14.0, framer-motion 12.38, atropos 2.0.2):

- Tailwind's `motion-safe:` and `motion-reduce:` variants exist and accept arbitrary values, including negative ones such as `motion-safe:-translate-x-[500px]`. The JIT scanner needs whole literal class strings in source.
- `transition-[...]` plus `duration-[...]` would switch the easing to Tailwind's cubic-bezier. The arbitrary property `[transition:all_1.3s]` reproduces today's inline declaration and its `ease` timing exactly.
- tailwind-merge (through `cva.config.ts`) keys conflicts by modifier plus group, so `motion-safe:translate-y-[24px]` conflicts only with another `motion-safe:translate-y-*`. `cardShellVariants` base classes collide with none of the classes below.
- framer's `MotionConfig` module carries a `"use client"` directive; with `reducedMotion="user"` it resolves the preference on the client at mount and makes positional keys instant while opacity keeps its tween. Markup is unchanged, so there is no hydration mismatch.
- Atropos writes only inline, non-important styles, so `!important` stylesheet rules under the media query beat all of them. Framer's inline styles are non-important too, so the same trick removes the opacity tween that `MotionConfig` keeps.
- Tailwind's `!` modifier sits after the variant, as in `motion-reduce:!opacity-100`, and emits the declaration with `!important` inside the media query.

Steps 1 to 4 stop every entrance from moving. Steps 5 to 7 then remove what still animated under reduced motion afterwards: the FadeIn opacity tween, the feature card and CTA fades, and the spin of the loading ring, which the hook hid only after it had painted once. Steps 8 to 10 cover what an audit of the result found: a call-to-action hover that could not be seen, smooth scrolling that still glided, and plain button hovers that snapped.

The second rule: reduced motion removes movement, never information. A loading state, a hover, a pressed state and a focus outline each tell the user something, so each keeps a still form.

## Conventions

- Make only the changes this phase requires. Preserve existing comments, naming and formatting elsewhere.
- Comments are at most two lines of plain prose and only where they state why. No em-dashes.
- Use `clsx` (default import, already used in `features-header.tsx`) for conditional plain `className`s. CardShell merges its own `className` through cva.
- Run prettier on touched files before each commit; `prettier-plugin-tailwindcss` reorders class lists.
- One commit per step below, in order. Each commit must pass `npx tsc --noEmit` and `pnpm lint`. No AI attribution in commit messages. Do not push.

## Step 1: Let framer honour the OS setting for every FadeIn

- `src/app/layout.tsx`: `import { MotionConfig } from 'framer-motion'` and wrap the `<div className="relative flex flex-auto ">` subtree in `<MotionConfig reducedMotion="user">`. It must cover Navbar and Footer, not only `<main>`, because their buttons render `m.div`. Add a two-line comment stating why: framer's own hook mismatches the exported HTML at hydration, so transforms are switched off at animation time instead. If `next build --webpack` rejects rendering it from the server layout, fall back to a five-line `'use client'` wrapper in `src/components/`.
- `src/components/fade-in.tsx`: delete the hook import and `let prefersReducedMotion = useReducedMotion();`, and set `hidden: { opacity: 0, y: 24 }`. Leave `LazyMotion` and `suppressHydrationWarning` alone.

## Step 2: Move the feature card entrances into motion-safe classes

`src/components/feature-cards.tsx`. The hidden state becomes classes present only while `!isInView`. The settled state carries no transform or opacity class, so the computed result is `transform: none; opacity: 1`, exactly today's settled inline values. Do not add a visible-state `translate-y-0` class; an identity transform creates a stacking context and can break pixel identity.

- In the `features` array, replace `initialOfset` with a complete class string named `hiddenOffsetClass`: `'motion-safe:-translate-x-[500px]'` for the first and third feature, `'motion-safe:translate-x-[500px]'` for the second.
- CardShell: keep its class list, drop `style`, and set `className` to `clsx('<existing classes> [transition:all_1.3s]', !isInView && 'opacity-0 motion-safe:translate-y-[24px]')`.
- Image span: `className={clsx('block [transition:all_1.9s]', !isInView && ['opacity-0', feat.hiddenOffsetClass])}` with `style` removed.
- Text span: `className={clsx('block [transition:all_1.9s]', !isInView && 'opacity-0 motion-safe:translate-y-[500px]')}` with `style` removed.
- Delete the top TODO comment, the `useReducedMotion` import and its unused call, and the commented-out `prefersReducedMotion` lines that lived inside the deleted style objects. Leave the unrelated `calculateInitialOffset` comment block.

## Step 3: Move the call-to-action entrance into motion-safe classes

`src/components/call-to-action.tsx`, outer entrance div only: `className={clsx('h-full w-full [transition:all_1.3s]', !isInView && 'opacity-0 motion-safe:translate-y-[24px]')}` with `style` removed. Leave the Atropos props alone in this step.

## Step 4: Neutralise the Atropos tilt under reduced motion in CSS

Append to `src/styles/ctrl-atropos.css`, with a two-line comment giving the why (Atropos reads its params once on mount, so props cannot follow the preference):

```css
@media (prefers-reduced-motion: reduce) {
  .atropos-rotate,
  .atropos-scale,
  [data-atropos-offset] {
    transform: none !important;
    transition: none !important;
  }

  .atropos-shadow,
  .atropos-highlight {
    display: none !important;
  }

  .atropos-rotate-touch {
    touch-action: auto !important;
  }
}
```

The third block restores what `rotateTouch={false}` meant: `.atropos-rotate-touch` sets `touch-action: none`, which would otherwise stop a finger drag on the card from scrolling the page.

Then in `src/components/call-to-action.tsx`: remove the hook import and the `let prefersReducedMotion = false; useReducedMotion();` pair, set the Atropos props to their animation-on literals (`shadow`, `activeOffset={50}`, `rotateTouch`, `rotateXMax={15}`, `rotateYMax={15}`, `rotate`) and `data-atropos-offset={10}`. Keep them explicit even though they equal Atropos defaults. `LazyMotion` stays because the install button uses `m.div`.

## Step 5: Keep FadeIn wrappers visible and still under reduced motion

`src/components/fade-in.tsx`, `FadeIn` only, since `FadeInStagger` carries no opacity or `y` of its own. Import `clsx` and set the `m.div` className to `clsx('motion-reduce:!opacity-100 motion-reduce:!transform-none', className)`, with a two-line comment giving the why: framer still tweens opacity under reduced motion and the exported HTML starts hidden, so the stylesheet overrides its inline styles as `ctrl-atropos.css` does for Atropos.

Both classes are needed. Forcing opacity alone would expose the 24px snap that step 1 tolerated because it happened while the element was invisible. Framer keeps writing its tween inline, unseen; the phase 2 recorder and both `settlePage` helpers rely on that inline history, so it must stay. No FadeIn consumer passes a transform class of its own.

## Step 6: Stop the feature card and CTA fades under reduced motion

Change `opacity-0` to `motion-safe:opacity-0` in the four hidden-state class strings: the CardShell, image span and text span in `src/components/feature-cards.tsx`, and the outer entrance div in `src/components/call-to-action.tsx`. With no computed value differing between the hidden and settled states, `[transition:all_1.3s]` and `[transition:all_1.9s]` have nothing to transition, so the cards and CTA are simply present at first paint.

## Step 7: Show a still loader under reduced motion

`src/app/loading.tsx`: remove the hook import, the hook call, the ternary and the `'use client'` directive that existed only for the hook. Return the `Container` unconditionally, and add `motion-reduce:animate-none` to the ring `div` that carries `animate-spin`.

An earlier revision of this step hid the whole container with `motion-reduce:hidden`. That removed the spin, but also every sign that the page was loading, including the `aria-live` region and the sr-only "Loading..." text inside the same container. The ring now renders still and the text is exposed again.

## Step 8: Give the call-to-action button a hover that shows on the dark card

`src/components/call-to-action.tsx`, the `InstallButton` className: add `motion-reduce:hover:bg-[color-mix(in_srgb,theme(colors.highlighter.900)_90%,white)]` and `motion-reduce:active:bg-highlighter-950`.

Under reduced motion the button falls back to the plain solid hover, `hover:bg-highlighter-900/90`. That is a transparent tint, so it lightens the button over the light hero and disappears over the dark card. Mixing the same 90% toward white inside the colour paints the hero's hover on any backdrop. The pressed colour is restated because the hover rule sits later in the stylesheet and would otherwise win while the button is held.

## Step 9: Apply smooth scrolling only when motion is allowed

`src/app/layout.tsx`, the `<html>` className: replace `scroll-smooth` with `motion-safe:scroll-smooth`. Under reduced motion no `scroll-behavior` is set, so anchor jumps are instant. Leave `data-scroll-behavior="smooth"` in place; Next reads it to suspend smooth scrolling during route changes, and it is harmless when the class does not apply.

## Step 10: Give the plain button hovers a short colour transition

`src/components/ui/Button.tsx`, in `compoundVariants`: add `transition-colors duration-200` to the className of the `intent: 'solid', animation: 'none'` entry and of the `intent: 'outline', animation: 'none'` entry.

A colour change moves nothing, so it may ease under either motion setting. Use `transition-colors`, not `transition-all`: framer drives the button's scale through an inline transform on the same element, and `transition-all` would fight it. 200 milliseconds matches `src/components/copy-button.tsx` and sits well under the 500 milliseconds of the slice label. Under reduced motion the hook in `Button` maps `slice` to `none`, so the hero, quick-view and call-to-action buttons all pick these classes up, and the step 8 tint eases with them. This changes hover for every visitor on every plain button, which is intended.

## Out of scope

`src/hooks/use-reduced-motion.ts`, `src/components/icons/hero-animation.tsx`, `src/components/features-header.tsx`, `src/components/ui/card-shell.tsx` and `visual-baseline/` are unchanged in this phase. In `src/components/ui/Button.tsx` only the two class strings of step 10 change; its hook stays. The unused gradient stylesheets and canvas gradient components are imported nowhere and reach no built CSS, so they need no reduced-motion guard. The Playwright guard and the README sentence are phase 2.

## Acceptance

- [x] `npx tsc --noEmit` passes after every commit, and `pnpm lint` reports no new problems. Master already fails `pnpm lint` with 66 pre-existing problems; this phase ends at 62.
- [x] `pnpm visual:check` passes with zero diffs and no re-record.
- [x] `grep -rn useReducedMotion src --include='*.ts' --include='*.tsx'` lists only the hook, `hero-animation.tsx`, `features-header.tsx` and `ui/Button.tsx`. The unchanged draft `src/content/drafts/button-blog.md` also mentions it in code samples.
- [x] `grep -c 'transition:all 1.9s' dist/index.html` and `grep -c 'transition:all 1.3s' dist/index.html` are both 0 after `pnpm build`.
- [x] `grep -c "prefers-reduced-motion:no-preference" dist/_next/static/css/*.css` is above 0 and the built CSS contains the `reduce` block from `ctrl-atropos.css`.
- [x] Served `dist/` under DevTools reduced-motion emulation: FadeIn wrappers snap to `transform: none` while opacity fades; no hydration warning in the console; the feature cards and CTA fade in without translating; hovering the CTA at 1280px leaves `.atropos-rotate`, `.atropos-scale` and `[data-atropos-offset]` at `transform: none` and `.atropos-shadow` at `display: none`.
- [x] Served `dist/` with no preference: the same 24px and 500px entrances and the same Atropos tilt as before.
- [x] After steps 5 to 7, the built CSS carries `opacity:1!important` and `transform:none!important` for the FadeIn classes under the `reduce` query, and `pnpm visual:check` still passes with zero diffs.
- [x] Served `dist/` under reduced-motion emulation: every FadeIn wrapper has computed `opacity: 1` and `transform: none` on load, the feature cards and CTA are present without fading, and no `transitionrun` fires for `opacity` or `transform` while scrolling through the page.
- [ ] Served `dist/` under reduced-motion emulation: while a route loads, the loading container is displayed, the ring's computed `animation-name` is `none`, and the "Loading..." text is exposed to assistive technology. With no preference the ring's `animation-name` is `spin`. The built CSS has no `motion-reduce:hidden` rule.
- [ ] Served `dist/` under reduced-motion emulation at 1280px: hovering the call-to-action button paints within two points per channel of the hero button's hover colour, and pressing it paints `rgb(10, 43, 53)`.
- [ ] Computed `scroll-behavior` on `<html>` is `auto` under reduced-motion emulation and `smooth` with no preference.
- [ ] Under reduced-motion emulation the hero and call-to-action button roots report a `transition-property` that covers `background-color` and excludes `transform`, with a `0.2s` duration, and hovering either fires no `transitionrun` for `transform`. With no preference the slice animation and the Atropos tilt are unchanged.
- [ ] After steps 8 to 10, `npx tsc --noEmit` passes, `pnpm lint` reports no more problems than before the steps, and `pnpm visual:check` passes with zero diffs and no re-record.
