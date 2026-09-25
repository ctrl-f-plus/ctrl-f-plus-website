# Visual baseline

Proves that a change leaves the rendered site untouched. It exists for the text-style cleanup described in `docs/text-style-inventory.md`, where the pass condition is an empty diff.

## Commands

```bash
pnpm visual:check      # build, serve dist/, compare against the recorded baseline
pnpm visual:baseline   # build, serve dist/, re-record the baseline
```

Both commands run `pnpm build` first so the comparison can never run against a stale `dist/`. Re-record only after a deliberate design change, in its own commit, so the diff of the baseline files documents what changed.

## What is recorded

For each of the six static routes at nine viewport widths:

- A JSON snapshot of every visible text-bearing element: font family, size, weight, line height, letter spacing, colour, decoration, transform, style, and its bounding rectangle. This is the deterministic proof; two runs on the same build hash identically.
- A full-page PNG at device scale factor 1, compared with zero tolerance.

The mobile menu is opened and recorded separately at the five widths below the laptop breakpoint.

Baselines live under `__snapshots__/<platform>/` because system-font metrics differ per OS. Record and compare on the same machine and browser build.

## Controls that keep runs identical

Reduced motion is emulated. Entrances are decided by `motion-safe:` classes and `MotionConfig reducedMotion="user"`, the Atropos tilt by the media query in `src/styles/ctrl-atropos.css`, and the site's own hook only drives interaction-only consumers, so no element carries an entrance transform. Each page is scrolled through once and the run waits for animations and inline fades to finish before reading anything. Fonts are awaited. Locale, time zone, colour scheme, and viewport are pinned in `playwright.config.ts`.

## Not covered

Hover, focus, and active colours. The runtime error page, which a static export cannot reach. Blog post pages, which stay dormant until a post is dated in the past. Verify those by reading the CSS diff.
