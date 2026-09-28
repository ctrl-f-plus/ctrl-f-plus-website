# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

**Tab hoarders.** People who keep many browser tabs open and need to find a word or phrase somewhere across all of them, not just in the tab they are looking at. They already know Ctrl+F and expect the same reflex to work across tabs. Chrome is the supported browser; a Firefox listing exists for the free tier only.

**Paid-tier buyers.** Existing users who want PDF search. They start checkout either from the extension's Settings page or from the website's pricing section, pay on Polar in a normal browser tab, and are redirected to the website's checkout success page. Because the website is one of the two entry points, a buyer can land on the success page without the extension installed. That state is a real path, not a rare edge case.

**Readers.** Developers and curious users who read the blog and the setup docs. The blog is a working engineering log, not marketing content.

## Product Purpose

Ctrl-F Plus is a Chrome extension that searches every open tab at once with Ctrl+Shift+F (Cmd+Shift+F on Mac) and highlights matches in place. HTML search is free. A paid tier adds a built-in PDF viewer and PDF search. This website is the extension's marketing and documentation site: landing page, blog, setup instructions, privacy policy, and the checkout success page that completes a purchase.

Success for the site: a visitor installs the extension, and a buyer arrives on the success page and learns exactly what happened to their license on this device.

## Positioning

Ctrl+F for all your tabs, with the interaction you already know. Searching happens entirely on the device. The extension has no analytics, telemetry, tracking, or ads in any tier; the only network traffic is licensing on the paid tier. The extension is open source under the ctrl-f-plus GitHub organization and funded through Open Collective sponsorship.

## Operating Context

**Purchase flow.** Polar hosts checkout. Each plan (monthly, annual, lifetime) has its own checkout link, minted per environment (sandbox versus production). After payment Polar redirects to `/success?checkout_id=<uuid>`. The extension's checkout-success content script reads the id, asks its background worker to exchange the checkout for a license through the licensing API at `api.ctrl-f.plus`, claims a device seat, refreshes the entitlement, and only then reports the outcome. A page the extension cannot reach shows the "no extension" fallback after five seconds.

**Success page states.** The page renders one element with the id `ext-activation`. The extension rewrites that element's `data-state` and text content in place. The states and their sentences are fixed by the 2026-09-18 handshake ruling in the extension repository and are shared with the extension's lock screen. Future work must render them verbatim:

| `data-state`       | Sentence                                                                                                                                              |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| `idle`             | Checking for the Ctrl-F Plus extension…                                                                                                               |
| `checking`         | Checking your purchase…                                                                                                                               |
| `activated`        | This device is activated. PDF search is unlocked.                                                                                                     |
| `alreadyActivated` | This device already has a license saved. Open the extension's Settings to manage it.                                                                  |
| `seatClaimFailed`  | One seat-failure sentence, then: Your license is saved on this device. Open the extension's Settings to retry.                                        |
| `licenseLocked`    | Your license is saved on this device, but PDF search is locked. Open the extension's Settings to see why.                                             |
| `failed`           | We could not confirm this purchase automatically. Open the extension's Settings and sign in with your email to retrieve your license.                 |
| `noExtension`      | We could not find the Ctrl-F Plus extension in this browser. Install it, then open its Settings and sign in with your email to retrieve your license. |

Seat-failure sentences come from the extension: "All seats are in use.", "No license is saved on this device.", "This device is no longer on the license.", "Could not complete the change. Check the device list and try again.", and "Could not reach the license service. Try again."

**Paid-access lifecycle.** A daily entitlement refresh, a 14-day offline grace period, a lock at the next refresh after a remote revocation, and the last verified state kept during a provider outage. Free HTML search never depends on licensing.

**Site delivery.** Static export served as Cloudflare Worker assets at ctrl-f.plus. No server runtime: no route handlers, server actions, or per-request headers from Next.js. Security headers live at the edge.

## Capabilities and Constraints

- **The success page belongs to the website for now** (owner decision, 2026-09-25). The extension's manifest still matches `https://api.ctrl-f.plus/success*` and Polar's success URL still points at the API origin. Repointing both is separate work in the extension repository and must land before the website page receives real buyers.
- **Whether the success page shows the site navbar and footer is delegated to design** (owner decision, 2026-09-25). The owner is unsure it should carry them.
- **Chrome only for the first paid launch** (owner decision, 2026-09-25). Firefox stays free. The success page's install prompt targets the Chrome Web Store.
- **The extension owns the status text.** The page owns the frame around the `ext-activation` element: the id, the `data-state` attribute, and plain text content are the contract. Styling may key off `data-state`. The page must not rely on the extension adding markup, classes, or child elements.
- **No "Open Settings" button yet.** The 2026-09-18 ruling deferred it until a runtime message exists to open the settings page. Until then every state points the buyer to the extension's Settings in words.
- **Repeat purchases on a device that already holds a key** are undecided (checklist item 2b). The page reports `alreadyActivated` and nothing more.
- **`checkout_id` is not validated.** An owner TODO. The page must tolerate a missing or malformed id.
- **Visual baseline harness.** `pnpm visual:check` compares home, about, blog, setup, privacy, and 404 at nine widths with zero pixel tolerance. The success route has no baseline. Edits to shared components require re-baselining.
- **Static export gotchas.** `images.unoptimized`, `trailingSlash`, webpack not Turbopack, MDX plugin order fixed. See `.claude/CLAUDE.md`.
- **Terminology.** License key, seat, activation, entitlement, lock screen, PDF search, tab hoarders, checkout exchange. "Lifetime" has no approved definition yet; do not expand it.

### Undecided product facts

- The offer table: prices, currency, billing periods, trial, activation limit, renewal, cancellation, refund, and the meaning of "lifetime". The staged `pricing-cards.tsx` holds template placeholder data, not real offers.
- The legal entity behind "we", the seller, and the merchant-of-record approval for Polar.
- Whether the launch needs a dedicated terms page.

## Brand Commitments

- **Name.** Ctrl-F Plus. The domain is ctrl-f.plus. Existing logo marks live in `src/components/icons/logo.tsx` and `logo-secondary.tsx`.
- **Voice on marketing pages.** Playful and self-aware about tab hoarding ("Tab hoarders, your time has come"). Not binding on transactional surfaces.
- **Voice on transactional and legal surfaces.** Plain-language sentences in the style of the fixed handshake copy: short, direct, one fact per sentence, familiar words. The launch plans follow the ISO 24495-1:2023 plain-language standard.
- **Support contact.** support@ctrl-f.plus.
- **Fonts in use.** Inter, Open Sans, and Arimo are loaded through `next/font`. Recorded as a fact, not a directive.

## Evidence on Hand

- Product screenshots in `public/images/Screenshots/`.
- Team avatars and bios on the About page (a developer and a designer).
- Two published blog posts in `src/content/blog/` and a setup guide in `src/content/documentation/`.
- The published privacy policy predates the paid tier and says no data is transmitted. The draft dated 2026-07-19 names Lemon Squeezy and other claims the current implementation does not make. Neither is launch-ready copy.
- The extension repository's launch checklist (`extension-rewrite/docs/plans/2026-09-15-paid-pdf-search-launch-checklist.md`) and the handshake plan (`overnight-launch-batch/2026-09-18-phase-5-success-page-handshake.md`) are the sources for the purchase flow facts above.
- **Absent, do not fabricate:** testimonials, customer logos, install or user counts, press, pricing, refund terms, and any performance benchmark.

## Product Principles

1. **Report what actually happened.** The success page never says a device is activated before the seat claim and entitlement check settle. A buyer with a full license sees the seat failure, not a celebration.
2. **Search stays on the device.** The only network calls are licensing, and free HTML search never waits on them.
3. **The extension speaks, the page frames.** Status text is the extension's contract; the site provides context, next steps, and the fallback when no extension answers.
4. **Plain words where money changed hands.** Transactional copy is direct and literal. The playful voice is for the landing page.
5. **Every state has a way forward.** Each outcome names the buyer's next action, even when that action is only "open Settings".

## Accessibility & Inclusion

The launch checklist requires keyboard and screen-reader checks for licensing and checkout (item 5c). On the success page the status text changes without any user action, so those changes must be perceivable by assistive technology. The site already exposes a reduced-motion hook (`src/hooks/use-reduced-motion.ts`) and the visual baseline runs with reduced motion, so motion on the success page must respect that preference.
