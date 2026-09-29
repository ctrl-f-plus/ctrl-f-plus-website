# Phase 2: Guard reduced motion with a Playwright spec

Date: 2026-09-25
Depends on: `phase-1-re-enable.md`, merged in PR #18.

## Context

Phase 1 moved every first-paint motion decision into CSS and framer's `MotionConfig`. Its later revisions also removed entrance fades, kept the loader visible but still, disabled smooth scrolling under reduced motion, and preserved button feedback through colour changes. This phase guards the final behaviour from PR #18 inside the existing visual-regression harness and updates its README.

## Conventions

- Load the `writing-typescript-tests` skill before creating the spec file and follow it.
- The spec inherits `reducedMotion: 'reduce'`, the pinned viewport settings and the `dist/` web server from `playwright.config.ts`, so it runs inside `pnpm visual:check` with no config change.
- Reuse the scroll-through approach of `settlePage` in `visual-baseline/text-styles.spec.ts`; do not modify that file.
- Comments are at most two lines of plain prose and only where they state why. No em-dashes. No AI attribution in commit messages. Do not push.

## Step 1: `visual-baseline/reduced-motion.spec.ts`

Recorders, installed with `page.addInitScript` before any page script runs:

- A capturing `transitionrun` listener on `document` that records transform and opacity transitions separately, with a short description of the target element. Colour transitions are allowed.
- A `MutationObserver` on `style` attributes that collects every distinct inline transform, including writes batched before a callback. It also samples computed opacity and transform after each batch. Inline history identifies the FadeIn wrappers and proves the control run animates; computed styles establish what reduced-motion users see.

Tests, on `/` at 1280x900:

1. Entrances remain visible and still: scroll through the page as `settlePage` does, then assert zero opacity or transform transitions and computed `opacity: 1` and `transform: none` throughout the recorded FadeIn updates. The root's computed scroll behaviour must be `auto`.
2. The CTA card does not tilt: move the mouse across the `.atropos` box in steps and assert computed `transform === 'none'` on `.atropos-rotate`, `.atropos-scale` and `[data-atropos-offset]`, `display === 'none'` on `.atropos-shadow`, and still no transform transition.
3. Hover and pressed feedback remain visible: the hero and CTA install buttons ease background colour over 200 milliseconds without transitioning transforms. Hover changes the hero colour and gives the CTA its final opaque `#264853` colour. Pressing either button gives `rgb(10, 43, 53)`. Pin the final CTA value from the merged source rather than the earlier colour-mix formula in the phase 1 plan.
4. A control with no motion preference must record opacity and transform transitions and an intermediate inline `translateY` value. Its root scroll behaviour must be `smooth`.
5. Block the external JavaScript bundles while allowing Next's inline script to reveal the streamed HTML. Before hydration, the exported FadeIn and card entrance styles must already compute to full opacity and no transform under reduced motion. Require both entrance groups to be present so a selector cannot silently drop coverage.
6. With JavaScript disabled, the exported loading boundary stays present. Under reduced motion its ring must be visible and still, and its loading text must remain accessible. A control with no motion preference must keep the ring spinning.

Before claiming coverage, break the source once (for example remove the `motion-safe:` prefix from the feature card text span, or delete the media-query block from `ctrl-atropos.css`), confirm the relevant test goes red, then restore it.

## Step 2: `visual-baseline/README.md`

Explain the entrance opacity and transform overrides, the `motion-safe:` classes, `MotionConfig`, and the Atropos media query. Describe the expanded checks and their no-preference controls, and narrow the uncovered hover and active colours to buttons outside these checks. The hook still only drives interaction-only and client-only effects.

## Out of scope

No source files under `src/` change in this phase.

## Acceptance

- [x] `pnpm exec tsc --noEmit` passes and `pnpm lint` reports no new problems against current `origin/main`.
- [x] `pnpm visual:check` passes: existing snapshots unchanged, expanded spec green.
- [x] Deliberately regressing the guarded behaviour makes the relevant tests fail, and restoring it makes them pass.
- [x] The README describes the final entrance, loader, scrolling and button behaviour.

Verified on 2026-09-29: all 143 visual checks and five unit tests pass. Eight deliberate regressions in the built CSS each made the relevant guard fail before restoration. The new spec passes lint; the repository still reports 81 existing errors, all in files unchanged from `origin/main`.
