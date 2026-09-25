# Phase 2: Guard reduced motion with a Playwright spec

Date: 2026-09-25
Depends on: `phase-1-re-enable.md` merged or stacked underneath.

## Context

Phase 1 moved every first-paint motion decision into CSS and framer's `MotionConfig`. Nothing in the repo would notice if a future change reintroduced an inline `transition: all`, dropped a `motion-safe:` prefix, or removed the Atropos media-query block. This phase adds a spec inside the existing visual-regression harness so `pnpm visual:check` catches that, and corrects the harness README, which still says the site's hook handles entrance transforms.

## Conventions

- Load the `writing-typescript-tests` skill before creating the spec file and follow it.
- The spec inherits `reducedMotion: 'reduce'`, the pinned viewport settings and the `dist/` web server from `playwright.config.ts`, so it runs inside `pnpm visual:check` with no config change.
- Reuse the scroll-through approach of `settlePage` in `visual-baseline/text-styles.spec.ts`; do not modify that file.
- Comments are at most two lines of plain prose and only where they state why. No em-dashes. No AI attribution in commit messages. Do not push.

## Step 1: `visual-baseline/reduced-motion.spec.ts`

Recorders, installed with `page.addInitScript` before any page script runs:

- A capturing `transitionrun` listener on `document` that collects entries whose `propertyName === 'transform'`, with a short description of the target element.
- A `MutationObserver` on `style` attributes (subtree) that collects, per element, each distinct inline `transform` value written. A framer `y` tween writes intermediate `translateY(...)` values; an instant one writes only `none`.

Tests, on `/` at 1280x900:

1. Entrance motion is suppressed: scroll through the page as `settlePage` does, wait for `document.getAnimations()` to drain, then assert zero transform transitions (feature cards and CTA) and that every element that started at `translateY(24px)` only ever held `translateY(24px)` or `none` (FadeIn wrappers).
2. The CTA card does not tilt: move the mouse across the `.atropos` box in steps and assert computed `transform === 'none'` on `.atropos-rotate`, `.atropos-scale` and `[data-atropos-offset]`, `display === 'none'` on `.atropos-shadow`, and still no transform transition.
3. A control `describe` with `test.use({ reducedMotion: 'no-preference' })` asserting that a transform transition and an intermediate `translateY` value do occur. This proves the recorders catch tweens.

Before claiming coverage, break the source once (for example remove the `motion-safe:` prefix from the feature card text span, or delete the media-query block from `ctrl-atropos.css`), confirm the relevant test goes red, then restore it.

## Step 2: `visual-baseline/README.md`

Replace the sentence "Reduced motion is emulated, which the site's own hook honours, so no element carries an entrance transform" with one stating that entrances are decided by `motion-safe:` classes and `MotionConfig reducedMotion="user"`, the Atropos tilt by the media query in `ctrl-atropos.css`, and that the hook only drives interaction-only and client-only consumers.

## Out of scope

No source files under `src/` change in this phase.

## Acceptance

- [x] `npx tsc --noEmit` passes and `pnpm lint` reports no new problems against the 62 left by phase 1.
- [x] `pnpm visual:check` passes: existing snapshots unchanged, new spec green.
- [x] The break-the-source check was performed and the relevant test went red, then green again after restoring.
- [x] The README sentence is updated.
