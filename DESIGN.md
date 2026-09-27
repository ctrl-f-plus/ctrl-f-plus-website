---
name: Ctrl-F Plus
description: Frosted white cards over a mint ground, Inter headlines, and one highlighter mark per page.
colors:
  shark-ink: "#1b2528"
  shark-muted: "#516469"
  deep-teal: "#0C3440"
  teal-night: "#0a2b35"
  teal-link: "#0C616F"
  teal-link-hover: "#07353C"
  teal-signal: "#128DA1"
  mint-highlighter: "#53E7BB"
  mint-accent: "#48d0a8"
  mint-settled: "#17b28a"
  bittersweet-failure: "#d10a00"
  bittersweet-rule: "#ff6960"
  mint-ground: "#d4ece5"
  paper: "#ffffff"
  caption-gray: "#889397"
  cape-cod: "#434343"
typography:
  display:
    fontFamily: "Inter, sans-serif"
    fontSize: "3.4375rem"
    fontWeight: 800
    lineHeight: 1.2
    letterSpacing: "normal"
  headline:
    fontFamily: "Inter, sans-serif"
    fontSize: "2.0625rem"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "normal"
  headline-mid:
    fontFamily: "Inter, sans-serif"
    fontSize: "2.75rem"
    fontWeight: 800
    lineHeight: 1.1
    letterSpacing: "normal"
  status:
    fontFamily: "Inter, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 700
    lineHeight: "1.875rem"
    letterSpacing: "normal"
  status-lg:
    fontFamily: "Inter, sans-serif"
    fontSize: "2.0625rem"
    fontWeight: 700
    lineHeight: "2.5rem"
    letterSpacing: "normal"
  subtitle:
    fontFamily: "Inter, sans-serif"
    fontSize: "1.4375rem"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "normal"
  card-heading:
    fontFamily: "Inter, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 600
    lineHeight: "2rem"
    letterSpacing: "normal"
  label:
    fontFamily: "Inter, sans-serif"
    fontSize: "1rem"
    fontWeight: 600
    lineHeight: "1.3rem"
    letterSpacing: "normal"
  body:
    fontFamily: "Open Sans, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "normal"
  body-compact:
    fontFamily: "Open Sans, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "normal"
  button:
    fontFamily: "Open Sans, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 600
    lineHeight: "1.5rem"
    letterSpacing: "normal"
  prose:
    fontFamily: "Arimo, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: "2rem"
    letterSpacing: "normal"
  body-sm:
    fontFamily: "Arimo, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: "1.75rem"
    letterSpacing: "normal"
  footnote:
    fontFamily: "Arimo, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: "1.25rem"
    letterSpacing: "normal"
rounded:
  sm: "2px"
  md: "6px"
  lg: "8px"
  2xl: "16px"
  card: "24px"
  shell: "36px"
  pill: "37px"
  full: "9999px"
spacing:
  gutter: "16px"
  gutter-lg: "26px"
  gutter-tablet: "36px"
  stack: "24px"
  row: "32px"
  card-gap: "40px"
  card-pad: "56px"
  section: "72px"
  section-tablet: "96px"
  section-wide: "122px"
  container: "1168px"
components:
  button-primary:
    backgroundColor: "{colors.deep-teal}"
    textColor: "{colors.paper}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    padding: "8px 0"
    height: "56px"
    width: "100%"
  button-primary-hover:
    backgroundColor: "{colors.mint-accent}"
    textColor: "{colors.deep-teal}"
  button-primary-active:
    backgroundColor: "{colors.teal-night}"
    textColor: "rgba(255, 255, 255, 0.8)"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.deep-teal}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    padding: "8px 0"
    height: "56px"
    width: "100%"
  button-outline-hover:
    backgroundColor: "rgba(12, 52, 64, 0.1)"
  button-wide:
    backgroundColor: "{colors.deep-teal}"
    textColor: "{colors.paper}"
    typography: "{typography.body}"
    rounded: "{rounded.full}"
    padding: "16px 20px"
    width: "231px"
  card-title:
    backgroundColor: "rgba(255, 255, 255, 0.47)"
    textColor: "{colors.shark-ink}"
    rounded: "{rounded.card}"
    padding: "56px 16px"
  card-body:
    backgroundColor: "rgba(255, 255, 255, 0.68)"
    textColor: "{colors.shark-ink}"
    rounded: "{rounded.card}"
    padding: "56px 16px"
  card-shell:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.shark-ink}"
    rounded: "{rounded.shell}"
    padding: "36px"
  card-shell-inverted:
    backgroundColor: "{colors.shark-ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.shell}"
    padding: "36px"
  keycap:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.shark-ink}"
    typography: "{typography.label}"
    rounded: "{rounded.md}"
    padding: "0 8px"
    height: "32px"
  nav-link:
    textColor: "{colors.shark-ink}"
    typography: "{typography.body}"
  nav-link-active:
    textColor: "{colors.teal-signal}"
  link-inline:
    textColor: "{colors.teal-link}"
    typography: "{typography.body}"
  link-inline-hover:
    textColor: "{colors.teal-link-hover}"
  link-quiet:
    textColor: "rgba(27, 37, 40, 0.8)"
    typography: "{typography.body-compact}"
  link-quiet-hover:
    textColor: "{colors.shark-ink}"
  ledger-label:
    textColor: "{colors.deep-teal}"
    typography: "{typography.label}"
  status-sentence:
    textColor: "{colors.shark-ink}"
    typography: "{typography.status}"
    rounded: "{rounded.lg}"
    padding: "0 0.2em"
  status-sentence-pending:
    textColor: "{colors.shark-muted}"
  status-sentence-activated:
    backgroundColor: "{colors.mint-highlighter}"
    textColor: "{colors.shark-ink}"
  status-sentence-failure:
    textColor: "{colors.bittersweet-failure}"
---

# Design System: Ctrl-F Plus

## Overview

**Creative North Star: "The Highlighter on Frosted Glass"**

Ctrl-F Plus finds a word across every open tab and highlights it in place, and the site looks like that act. The whole page is one pale mint ground. Every piece of content sits inside a card frosted over that ground, and the one thing that matters on a page gets a mint highlighter swipe: "Tab Hoarders" in the hero, the activated sentence on the checkout success page. Marketing surfaces use opaque shells with 36px corners, white or shark. Documentation and transactional surfaces use translucent white cards with 24px corners that let the mint ground glow through.

Type carries the hierarchy. Inter at 800 sets headlines large and tight, Inter at 600 sets every label, and Open Sans at 400 sets every sentence a visitor reads. Arimo appears only in long-form prose and fine print. Color is restrained on purpose: shark ink for text, deep teal for the one primary action and for labels, teal signal for the active nav item and the pending dot, and the mint highlighter held back for the found word. Red appears only when something failed.

Density is generous. Sections breathe at 72, 96, and 122px, cards pad 56px, and text columns are capped so lines stay short. Motion is limited to entrance fades, a mint slice across the primary button on hover, and the highlighter sweep on the success page, and every motion honors the reduced-motion preference. One rejection is on record: the owner turned down a lone quiet card for the success page because it "does not feel like the site". Pages here are composed from the site's card pattern, not from a centered panel.

**Key Characteristics:**
- One mint ground under everything, frosted white cards on top.
- Inter 800 headlines, Open Sans 400 body, Inter 600 labels in deep teal.
- One mint highlighter mark per page, on the words that are the news.
- Deep teal pill buttons, 56px tall, with a mint slice on hover.
- Two card families: opaque 36px shells for marketing, translucent 24px cards for reading and transactions.
- A single focus ring, 2px teal night with 2px offset, on every interactive element.

## Colors

A teal and mint family over a mint-tinted white, with shark ink for text and one red reserved for failure.

### Primary
- **Deep Teal** (#0C3440): the primary button fill, the outline button's border and text, the eyebrow label above feature titles, and the ledger row labels on the success page. It is the color of the one action and of labels, never of body text.
- **Teal Night** (#0a2b35): the focus ring on every interactive element and the pressed state of the primary button.
- **Teal Signal** (#128DA1): the active navigation item, the pending status dot, and the text selection background. It marks "where you are" and "what is happening".
- **Teal Link** (#0C616F) and **Teal Link Hover** (#07353C): inline links inside body copy, underlined with the link color at 40% and an underline offset of 4px, darkening on hover.

### Secondary
- **Mint Highlighter** (#53E7BB): the highlighter swipe. It sits behind "Tab Hoarders" in the hero and behind the activated sentence on the success page, as a background with 16px or 8px corners, never as text.
- **Mint Accent** (#48d0a8): the brand name inside body copy ("Ctrl-F Plus" on About, Setup, and Privacy), the slice that sweeps across the primary button on hover, the GitHub accent in the footer, and the success-tinted ledger rule.
- **Mint Settled** (#17b28a): the status dot once a device is activated.

### Tertiary
- **Bittersweet Failure** (#d10a00): the status sentence and dot on every failure state of the success page. It is the only red on the site.
- **Bittersweet Rule** (#ff6960): at 40%, the ledger rule under a failed status.

### Neutral
- **Shark Ink** (#1b2528): all headings and body text, the inverted card fill, the footer, and the keycap hairline at 20% and 40%.
- **Shark Muted** (#516469): the pending status sentence and the copy button's hover tint at 30%.
- **Paper** (#ffffff): opaque shells, keycaps, and the mobile menu. At 47% it is the title card, at 68% the body card.
- **Mint Ground** (#d4ece5): at 50% over white, the page background behind everything.
- **Caption Gray** (#889397): dates on the blog and documentation title cards.
- **Cape Cod** (#434343): the features header text on wide screens, where the hover mask needs a mid gray.

Two glows are not tokens: the call-to-action card places a sky blue (#8DBEDA) and a green (#03AF7D) blur in its corners as literal values in code.

### Named Rules
**The One Mark Rule.** The mint highlighter appears once per page, behind the words that are the news, and never as a text color or a button fill.

**The Red Only for Failure Rule.** Bittersweet appears only on a status that reports a failure. Nothing decorative is red.

## Typography

**Display Font:** Inter (with the metric-matched fallback next/font generates)
**Body Font:** Open Sans (with the metric-matched fallback next/font generates)
**Prose and Footnote Font:** Arimo (with the metric-matched fallback next/font generates)

**Character:** Heavy geometric headlines over a humanist body. Inter at 800 is loud and tight, Open Sans at 400 is calm and wide, and the contrast between them is the site's voice. Arimo steps in for long documents and small print, where its narrower set width reads well at 16 to 18px.

### Hierarchy
- **Display** (Inter 800, 3.4375rem, line-height 1.2): page titles on About, Blog, Setup, and Privacy at every width; the hero headline from 400px; feature titles, the call-to-action heading, and the success headline from 768px.
- **Headline** (Inter 800, 2.0625rem, line-height 1): the same headings below 768px, where 55px would wrap every word.
- **Headline Mid** (Inter 800, 2.75rem, line-height 1.1): section headings inside a body card ("Our Team") and blog post titles from 768px.
- **Status** (Inter 700, 1.5rem over 1.875rem; 2.0625rem over 2.5rem from 768px): the live outcome sentence on the success page, the largest text after the headline. It drops to 600 for pending, info, and failure tones.
- **Subtitle** (Inter 600, 1.4375rem, line-height 1.3): blog card titles, the footer heading, and prose level-two headings.
- **Card Heading** (Inter 600, 1.125rem over 2rem): names on the team cards.
- **Label** (Inter 600, 1rem over 1.3rem): the eyebrow above each feature title, footer column headings, ledger row labels, and keycap legends. Labels are always Inter, never Open Sans.
- **Body** (Open Sans 400, 1.125rem, line-height 1.5): every paragraph on a marketing, documentation, or transactional card; the desktop navigation; ledger values. Hero copy caps at 48rem, feature copy at 491px, and the success text column at 36rem.
- **Body Compact** (Open Sans 400, 1rem, line-height 1.5): the author line under a blog title and the Support link on the bare frame.
- **Button** (Open Sans 600, 1.125rem over 1.5rem): the label inside every pill button.
- **Prose** (Arimo 400, 1.125rem over 2rem): paragraphs inside MDX documents, styled through the Tailwind Typography plugin and `src/styles/mdx.css`.
- **Body Small** (Arimo 400, 1rem over 1.75rem): team roles and bios.
- **Footnote** (Arimo 400, 0.875rem over 1.25rem): footer fine print and the bare frame's footer links.

### Named Rules
**The Two Voices Rule.** Inter speaks in headings and labels at 600 or heavier. Open Sans speaks in sentences at 400. No heading is set in Open Sans and no paragraph is set in Inter.

**The Balanced Heading Rule.** Headings that can wrap use balanced text wrapping so no line is left with one word.

## Layout

The container is 1168px wide (73rem), centered, with a gutter that steps from 16px on phones to 26px at 425px, 36px at 480px, 32px at 1024px, and 0 from 1280px where the container floats free. The breakpoints are the site's own names: mobile-sm 320, mobile-md 400, mobile-lg 425, tablet 480, tab-pro 768, laptop 900, desktop 1024, wide 1280, and 2xl 1536.

Vertical rhythm is one rule: sections are 72px apart on phones, 96px from 480px, and 122px (7.625rem) from 1280px on the landing page. Documentation and transactional pages stop at 96px. The first card on a page starts 72px below the header, 96px from 480px. Inside a page, the title card and the body card are 40px apart.

Cards fill the container. A title card is at least 318px tall and pads 56px vertically at every width; its horizontal padding steps 16, 32, 56, 64, and 80px at the mobile-md, tablet, laptop, and desktop breakpoints. A body card pads 56px vertically and 16, 24, 56, 32, and 40px horizontally at the same steps. Inside a card, stacked content is 24px apart.

Landing shells go to two columns at 900px with a 36px gap and alternate the illustration side. The success page's title card goes to two columns at 1024px with a 36px gap and keeps the text column at or under 36rem so the sentence stays readable next to the illustration. Feature illustrations render at 263.2 by 221.358px and grow to 376 by 317px at 900px on the landing page and at 1280px on the success page, so its text column never drops below about 500px. Below the two-column breakpoint the illustration stacks under the text. The success ledger shows its 11rem label column from 768px and stacks label over value below that.

The header is 20px from the top, 48px from 1280px. The footer sits 72px below the last card, 96px from 480px, 122px on the landing page.

## Elevation & Depth

Depth comes from frost, not from shadow. Every reading surface is translucent white over the mint ground with a 23px backdrop blur, and the frame wrapping every page adds a 12px blur of its own. The only shadow on those cards is a 1px hairline. Opaque shells are flat white or flat shark; only the inverted shells on the landing page (the features header and the call-to-action) lift with a large shadow, and the call-to-action adds a parallax tilt on pointer devices. The primary button carries the same hairline as the cards. Stacking is fixed: the page's main region isolates at z-index 10 and the footer sits at 20.

### Shadow Vocabulary
- **Hairline** (`box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05)`): every translucent card and every pill button. It separates a card from the ground without reading as a lift.
- **Lift** (`box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)`): inverted shark shells on the landing page only.

### Named Rules
**The Frost Not Shadow Rule.** A surface over the mint ground is translucent white with a 23px blur and a hairline. It never gets a mid or large shadow; only an opaque shark shell may lift.

## Shapes

Corners are large and soft on containers and tight on controls. Reading and transactional cards have 24px corners, landing shells 36px, and every button is a pill at 37px on a 56px height (a full radius on the wide call-to-action button). Team photos and the hero highlighter mark use 16px corners; the status highlighter mark uses 8px and clones its box decoration so the mark and its 0.2em side padding follow every wrapped line, matching the way the hero mark hugs "Tab Hoarders". Keycaps and the copy button are 6px, and the invisible focus wrapper around a text link is 2px so the ring follows the link's shape. Borders are rare: a 2px deep teal stroke on the outline button, a 1px shark hairline at 20% on keycaps with a 40% bottom edge that reads as the key's depth, a 1px shark rule at 15% between ledger rows, and a white rule at 10% above the footer's copyright line.

## Components

### Buttons
Confident and rounded, one deep teal pill per action, with a mint slice that sweeps across on hover.
- **Shape:** pill, 37px radius on a 56px height; the wide variant is a full radius on 16px by 20px padding at 231px wide.
- **Primary:** deep teal fill (#0C3440) with white Open Sans 600 at 18px, an optional 22px icon 8px before the label, and the card hairline. It fills its column; callers cap it (16rem on the success page, the hero's column width on the landing page).
- **Hover / Focus:** with the slice animation, a mint accent panel (#48d0a8) rotated 68.566 degrees slides in from the left over 500ms ease-in-out while the label and icon turn deep teal over 500ms linear, from 480px up. Without the slice, the fill drops to 90%. Pressed, the fill is teal night with the label at 80% white. Focus-visible draws a 2px teal night ring offset 2px. Hover styles apply only on devices that support hover.
- **Outline:** a 2px deep teal border and deep teal text on a transparent fill; hover tints the fill with deep teal at 10%; pressed drops the text to teal night at 70%. In the hero it shares the mint slice.
- **Wide:** the call-to-action button, deep teal on a shark shell, with Open Sans 400 at 18px, an icon fill of deep teal that turns mint accent on hover, and a spring press that scales to 93%.
- **Reduced motion:** the slice and the spring are dropped; hover falls back to the 90% fill.

### Cards / Containers
Frosted glass over the mint ground for reading, flat opaque shells for the landing page.
- **Title card:** 24px corners, white at 47%, 23px blur, hairline, 318px minimum height, 56px vertical padding. Holds the page's Display heading and one or two Body paragraphs in a 24px stack. On the success page the same surface is laid out like a landing shell: text column left, illustration right from 1024px.
- **Body card:** 24px corners, white at 68%, 23px blur, hairline, 40px below the title card, 56px vertical padding. Holds prose, the team grid, or the success ledger.
- **Blog list card:** the body card surface at 24px vertical padding, a Subtitle title over a Body date, dimming to 75% opacity on hover.
- **Landing shell:** 36px corners, opaque white, no shadow, 616px minimum height (584px from 900px), padding stepping 36, 56, 64, 80, and 96px from 480px up. Two columns from 900px: a 263 by 221px illustration (376 by 317px from 900px) and a text column of Label eyebrow in deep teal, Headline or Display title, and Body copy capped at 491px, in a 36px stack. Odd shells flip the illustration to the right.
- **Inverted shell:** the same shape in shark ink with white text and the Lift shadow. The features header adds a hover-following green spotlight and a magnifying-glass cursor on wide screens; the call-to-action adds a sky and a green corner glow and a parallax tilt.
- **Info card:** the title card surface at 68% white with an 80px top margin, centered heading and text, an optional corner glow, and one primary button.

### Navigation
- **Marketing header:** the logo wordmark (102 by 19px) on the left and, from 900px, five Body-size Open Sans links 24px apart on the right, shark ink at rest, shark at 80% on hover, teal signal for the current page. Below 900px a menu button opens a full-height white panel with 16px-over-28px Inter 600 items that tint gray on hover.
- **Bare frame:** transactional pages (the success page) keep only the logo and a Support mail link in Body Compact at shark 80%, and a footer of Footnote links (Privacy Policy, the support address) at shark 70%. Hover underlines at a 4px offset; focus draws the site ring around a 2px-radius wrapper.
- **Footer:** a shark ink band, 72px above (96 and 122px at the larger steps), with three Label columns of Open Sans 14px links in gray that turn white on hover, a Subtitle open-source heading with the GitHub mark, a mint accent link, and a copyright line above a white 10% rule.

### Links
- **Inline:** teal link (#0C616F) at Open Sans 600, underlined in the same color at 40% with a 4px offset; hover darkens both to teal link hover. Used for "Manage billing" on the success page and for prose links through the typography plugin.
- **Quiet:** shark at 80% Body Compact, no underline until hover. Used for Support and the bare frame's footer.
- **Back:** on a blog post, an Open Sans 600 "back" with an arrow that nudges 4px left on hover.

### Keycaps
White tokens with a shark hairline: 32px tall and at least 32px wide, 6px corners, 8px side padding, Inter 600 at 16px, a 1px shark border at 20% with the bottom edge at 40%, 4px apart. They render ⌘ ⇧ F on Mac and Ctrl Shift F elsewhere, with one accessible name for the group.

### Status Sentence (signature)
The found moment on the success page. A paragraph the extension rewrites in place, set in Inter 700 at 24px over 30px (33px over 40px from 768px), rendered inline with cloned box decoration, 8px corners, and 0.2em side padding pulled back into the margin so the text stays aligned. A 12px dot sits 16px to its left at 0.4em from the top. By tone: pending is shark muted at 600 with a teal signal dot pulsing over 1.6s; info is shark ink at 600 with a teal signal dot; activated is shark ink at 700 on the mint highlighter, swept in per line over 420ms with an exponential ease-out (`cubic-bezier(0.16, 1, 0.3, 1)`) while the dot settles to mint settled; failure is bittersweet failure at 600 with a matching dot. On each change the previous sentence fades out as a ghost layer over 220ms while the new one fades in. Reduced motion swaps instantly, holds the mark static, and stops the pulse.

### Order Ledger (signature)
A definition list inside the body card. Rows are 24px apart vertically (no padding on the first row's top or the last row's bottom) and divided by a 1px shark rule at 15%, which retints to mint accent at 70% on success and bittersweet rule at 40% on failure. From 768px each row is an 11rem Label column in deep teal beside a Body value in shark ink, 32px apart; below that the label stacks over the value 8px apart. The order reference sits in tabular figures with a break opportunity after each hyphen, followed by a 36px copy control (6px corners, shark muted tint at 30% on hover, the site ring on focus, a check icon for two seconds after copying). Values may end with an inline link.

### Illustrations
Three feature drawings (`public/svgs/feature1.min.svg` through `feature3.min.svg`) share a violet-to-cyan gradient panel behind white and slate window shapes with a mint accent key. The third, the keyboard shortcut, is reused on the success page. They are decorative, hidden from assistive technology, and never stretched beyond the two recorded sizes.

## Do's and Don'ts

### Do:
- **Do** put every piece of page content inside a card over the mint ground: a translucent 24px card for reading and transactions, an opaque 36px shell for the landing page.
- **Do** set headings in Inter 800, labels in Inter 600 in deep teal, and sentences in Open Sans 400 at 18px.
- **Do** step a page heading from 33px to 55px at 768px when it sits beside another column, as the feature shells and the success page do.
- **Do** use the deep teal pill (#0C3440, 37px radius, 56px tall) for the one primary action, and the outline pill for the secondary one.
- **Do** draw the same focus ring everywhere: 2px teal night (#0a2b35) with a 2px offset on focus-visible.
- **Do** keep the section rhythm at 72, 96, and 122px and the card interior at 56px.
- **Do** read the reduced-motion preference through the site's hook or the media query before animating, and give every animation a static fallback.
- **Do** reuse the recorded feature illustration sizes, 263 by 221px and 376 by 317px.

### Don't:
- **Don't** place more than one mint highlighter mark on a page, and never use the mint as a text color.
- **Don't** use bittersweet for anything but a failure state.
- **Don't** add a mid or large shadow to a translucent card; the hairline is the whole treatment.
- **Don't** introduce a new hex value when the shark, highlighter, highlighter-focus, or bittersweet scales in tailwind.config.ts already hold it.
- **Don't** set body text in pure black or in a default Tailwind gray; shark ink and its 70 and 80% tints are the text colors.
- **Don't** let a text column run past 36rem beside an illustration or past 48rem alone.
- **Don't** animate a status change without a ghost crossfade; a hard text swap on the success page reads as a glitch.
