// visual-baseline/text-styles.spec.ts

import { expect, test, type Page } from '@playwright/test';

// Every Tailwind breakpoint the site's text responds to, plus the narrowest phone.
const VIEWPORT_WIDTHS = [
  320, 400, 480, 640, 768, 900, 1024, 1280, 1536,
] as const;
const VIEWPORT_HEIGHT = 900;
// The desktop nav replaces the menu button at the laptop breakpoint.
const DESKTOP_NAV_MIN_WIDTH = 900;
const MOBILE_MENU_BUTTON_NAME = 'Open main menu';
const MOBILE_MENU_ROOT = '[role="dialog"]';
const SETTLE_TIMEOUT_MS = 10_000;
const EXTERNAL_REQUEST = /^https?:\/\/(?!127\.0\.0\.1)/;
const SCROLL_STEP_PAUSE_MS = 200;

const ROUTES = [
  { slug: 'home', path: '/' },
  { slug: 'about', path: '/about/' },
  { slug: 'blog', path: '/blog/' },
  { slug: 'setup', path: '/setup/' },
  { slug: 'privacy', path: '/privacy/' },
  { slug: '404', path: '/404.html' },
] as const;

const TEXT_STYLE_PROPERTIES = [
  'font-family',
  'font-size',
  'font-weight',
  'line-height',
  'letter-spacing',
  'color',
  'text-decoration-line',
  'text-transform',
  'font-style',
] as const;

type TextStyleRow = {
  text: string;
  style: string;
  rect: number[];
};

// Scrolls once through the page so every in-view animation has fired, then
// waits until no finite animation is running and no inline fade is mid-way.
async function settlePage(page: Page): Promise<void> {
  // The layout sets scroll-behavior smooth, so each jump must be instant or
  // the next one interrupts it before the in-view sentinels are reached.
  await page.evaluate(async (pauseMs) => {
    await document.fonts.ready;
    const step = window.innerHeight / 2;
    for (let y = 0; y <= document.documentElement.scrollHeight; y += step) {
      window.scrollTo({ top: y, behavior: 'instant' });
      await new Promise((resolve) => setTimeout(resolve, pauseMs));
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, SCROLL_STEP_PAUSE_MS);

  await page.waitForFunction(
    () => {
      const running = document.getAnimations().some((animation) => {
        const iterations = animation.effect?.getTiming().iterations ?? 1;
        return animation.playState === 'running' && Number.isFinite(iterations);
      });
      const fading = Array.from(
        document.querySelectorAll<HTMLElement>('[style*="opacity"]'),
      ).some(
        (element) =>
          element.style.opacity !== '' && element.style.opacity !== '1',
      );
      return !running && !fading;
    },
    undefined,
    { timeout: SETTLE_TIMEOUT_MS },
  );
}

async function captureTextStyles(
  page: Page,
  rootSelector = 'body',
): Promise<TextStyleRow[]> {
  return page.evaluate(
    ({ properties, root }) => {
      const SKIPPED_TAGS = new Set(['SCRIPT', 'STYLE', 'NOSCRIPT', 'TEMPLATE']);
      const rootElement = document.querySelector(root);
      if (!rootElement) return [];

      const walker = document.createTreeWalker(
        rootElement,
        NodeFilter.SHOW_TEXT,
      );
      const seen = new Set<Element>();
      const rows: TextStyleRow[] = [];

      while (walker.nextNode()) {
        const text = walker.currentNode.textContent?.trim() ?? '';
        if (!text) continue;
        const element = walker.currentNode.parentElement;
        if (
          !element ||
          seen.has(element) ||
          SKIPPED_TAGS.has(element.tagName)
        ) {
          continue;
        }
        seen.add(element);

        const rect = element.getBoundingClientRect();
        const computed = getComputedStyle(element);
        if (
          rect.width <= 1 ||
          rect.height <= 1 ||
          computed.visibility === 'hidden'
        ) {
          continue;
        }

        rows.push({
          text: text.slice(0, 40),
          style: properties
            .map((property) => computed.getPropertyValue(property))
            .join(' | '),
          rect: [rect.x, rect.y, rect.width, rect.height].map(
            (value) => Math.round(value * 100) / 100,
          ),
        });
      }
      return rows;
    },
    { properties: TEXT_STYLE_PROPERTIES, root: rootSelector },
  );
}

async function openSettledPage(
  page: Page,
  path: string,
  width: number,
): Promise<void> {
  await page.setViewportSize({ width, height: VIEWPORT_HEIGHT });
  await page.goto(path);
  await settlePage(page);
}

// The analytics beacon calls out to the internet; nothing off the local
// server may influence a run.
test.beforeEach(async ({ page }) => {
  await page.route(EXTERNAL_REQUEST, (route) => route.abort());
});

for (const route of ROUTES) {
  test.describe(route.path, () => {
    for (const width of VIEWPORT_WIDTHS) {
      test(`a ${width}px viewport keeps every visible text style and position from the baseline`, async ({
        page,
      }) => {
        await openSettledPage(page, route.path, width);

        const rows = await captureTextStyles(page);

        expect(JSON.stringify(rows, null, 2)).toMatchSnapshot(
          `${route.slug}-${width}.json`,
        );
      });

      test(`a ${width}px viewport renders the full page pixel for pixel like the baseline`, async ({
        page,
      }) => {
        await openSettledPage(page, route.path, width);

        await expect(page).toHaveScreenshot(`${route.slug}-${width}.png`, {
          fullPage: true,
        });
      });
    }
  });
}

test.describe('mobile menu', () => {
  const menuWidths = VIEWPORT_WIDTHS.filter(
    (width) => width < DESKTOP_NAV_MIN_WIDTH,
  );

  async function openMobileMenu(page: Page, width: number): Promise<void> {
    await openSettledPage(page, '/', width);
    await page.getByRole('button', { name: MOBILE_MENU_BUTTON_NAME }).click();
    // The dialog element itself has no box because its children are fixed,
    // so wait for the first link inside it instead.
    await page.locator(`${MOBILE_MENU_ROOT} a`).first().waitFor();
  }

  for (const width of menuWidths) {
    test(`opening the menu at ${width}px keeps every menu text style and position from the baseline`, async ({
      page,
    }) => {
      await openMobileMenu(page, width);

      const rows = await captureTextStyles(page, MOBILE_MENU_ROOT);

      expect(JSON.stringify(rows, null, 2)).toMatchSnapshot(
        `menu-${width}.json`,
      );
    });

    test(`opening the menu at ${width}px renders the viewport pixel for pixel like the baseline`, async ({
      page,
    }) => {
      await openMobileMenu(page, width);

      await expect(page).toHaveScreenshot(`menu-${width}.png`);
    });
  }
});
