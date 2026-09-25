// visual-baseline/reduced-motion.spec.ts

import { expect, test, type Page } from '@playwright/test';

const HOME_PATH = '/';
const VIEWPORT = { width: 1280, height: 900 } as const;
const SETTLE_TIMEOUT_MS = 10_000;
const EXTERNAL_REQUEST = /^https?:\/\/(?!127\.0\.0\.1)/;
const SCROLL_STEP_PAUSE_MS = 200;
const HOVER_STEPS = 12;
const HOVER_SETTLE_MS = 400;

// FadeIn hides with `y: 24`; framer writes it as this inline transform.
const FADE_IN_HIDDEN_TRANSFORM = 'translateY(24px)';
const SETTLED_TRANSFORM = 'none';
const VERTICAL_OFFSET_TRANSFORM = /^translateY\(/;

const CTA_ROOT = '#call-to-action';
const ATROPOS_ROOT = `${CTA_ROOT} .atropos`;
const ATROPOS_ACTIVE_CLASS = /\batropos-active\b/;
const ATROPOS_MOVING_LAYERS = [
  `${CTA_ROOT} .atropos-rotate`,
  `${CTA_ROOT} .atropos-scale`,
  `${CTA_ROOT} [data-atropos-offset]`,
] as const;
const ATROPOS_SHADOW = `${CTA_ROOT} .atropos-shadow`;

type InlineTransformHistory = {
  element: string;
  transforms: string[];
};

type MotionRecorder = {
  transformTransitions: string[];
  inlineTransformHistories: Map<Element, InlineTransformHistory>;
};

declare global {
  interface Window {
    motionRecorder: MotionRecorder;
  }
}

function installMotionRecorder(): void {
  const transformTransitions: string[] = [];
  const inlineTransformHistories = new Map<Element, InlineTransformHistory>();
  const styleParser = document.createElement('div');

  const describeElement = (element: Element): string => {
    const className = element.getAttribute('class') ?? '';
    const text = element.textContent?.trim().slice(0, 30) ?? '';
    return `<${element.tagName.toLowerCase()} class="${className.slice(0, 60)}"> ${text}`;
  };
  const transformOf = (styleText: string | null): string => {
    styleParser.setAttribute('style', styleText ?? '');
    return styleParser.style.transform;
  };

  document.addEventListener(
    'transitionrun',
    (event) => {
      if (
        event.propertyName === 'transform' &&
        event.target instanceof Element
      ) {
        transformTransitions.push(describeElement(event.target));
      }
    },
    true,
  );

  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (!(mutation.target instanceof Element)) continue;
      let history = inlineTransformHistories.get(mutation.target);
      if (!history) {
        // The first old value is the server-rendered style the element started with.
        history = {
          element: describeElement(mutation.target),
          transforms: [transformOf(mutation.oldValue)],
        };
        inlineTransformHistories.set(mutation.target, history);
      }
      const transform = transformOf(mutation.target.getAttribute('style'));
      if (!history.transforms.includes(transform)) {
        history.transforms.push(transform);
      }
    }
  }).observe(document, {
    attributes: true,
    attributeFilter: ['style'],
    attributeOldValue: true,
    subtree: true,
  });

  window.motionRecorder = { transformTransitions, inlineTransformHistories };
}

// Scrolls once through the page so every in-view entrance has fired, then
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

async function readTransformTransitions(page: Page): Promise<string[]> {
  return page.evaluate(() => window.motionRecorder.transformTransitions);
}

async function readFadeInTransformHistories(
  page: Page,
): Promise<InlineTransformHistory[]> {
  const histories = await page.evaluate(() =>
    Array.from(window.motionRecorder.inlineTransformHistories.values()),
  );
  return histories.filter(
    (history) => history.transforms[0] === FADE_IN_HIDDEN_TRANSFORM,
  );
}

async function sweepMouseAcross(page: Page, selector: string): Promise<void> {
  const target = page.locator(selector);
  await target.scrollIntoViewIfNeeded();
  const box = await target.boundingBox();
  if (!box) throw new Error(`${selector} has no bounding box to hover`);

  await page.mouse.move(box.x + box.width * 0.1, box.y + box.height * 0.1);
  await page.mouse.move(box.x + box.width * 0.9, box.y + box.height * 0.9, {
    steps: HOVER_STEPS,
  });
  await page.mouse.move(box.x + box.width * 0.9, box.y + box.height * 0.1, {
    steps: HOVER_STEPS,
  });
  await page.waitForTimeout(HOVER_SETTLE_MS);
}

test.use({ viewport: VIEWPORT });

// The analytics beacon calls out to the internet; nothing off the local
// server may influence a run.
test.beforeEach(async ({ page }) => {
  await page.route(EXTERNAL_REQUEST, (route) => route.abort());
  // Every page sits inside FadeInStagger, so entrances start at load, before
  // any test code could attach a listener.
  await page.addInitScript(installMotionRecorder);
});

test.describe('the home page under reduced motion', () => {
  test.use({ reducedMotion: 'reduce' });

  test('scrolling through the page fades every entrance in without moving it', async ({
    page,
  }) => {
    await page.goto(HOME_PATH);
    await settlePage(page);

    const transformTransitions = await readTransformTransitions(page);
    const fadeInHistories = await readFadeInTransformHistories(page);

    expect(transformTransitions).toEqual([]);
    expect(fadeInHistories.length).toBeGreaterThan(0);
    expect(
      fadeInHistories.filter((history) =>
        history.transforms.some(
          (transform) =>
            transform !== FADE_IN_HIDDEN_TRANSFORM &&
            transform !== SETTLED_TRANSFORM,
        ),
      ),
    ).toEqual([]);
  });

  test('hovering the call-to-action card leaves it untilted and unshadowed', async ({
    page,
  }) => {
    await page.goto(HOME_PATH);
    await page.locator(ATROPOS_MOVING_LAYERS[0]).waitFor();

    await sweepMouseAcross(page, ATROPOS_ROOT);

    await expect(page.locator(ATROPOS_ROOT)).toHaveClass(ATROPOS_ACTIVE_CLASS);
    // Atropos still writes its tilt inline; only the stylesheet override keeps
    // the computed transform flat, so the inline style proves nothing.
    for (const layerSelector of ATROPOS_MOVING_LAYERS) {
      const layerTransforms = await page
        .locator(layerSelector)
        .evaluateAll((elements) =>
          elements.map((element) => getComputedStyle(element).transform),
        );
      expect(layerTransforms.length, layerSelector).toBeGreaterThan(0);
      expect(
        layerTransforms.filter((transform) => transform !== SETTLED_TRANSFORM),
        layerSelector,
      ).toEqual([]);
    }
    await expect(page.locator(ATROPOS_SHADOW)).toHaveCSS('display', 'none');
    expect(await readTransformTransitions(page)).toEqual([]);
  });
});

test.describe('the home page with no motion preference', () => {
  test.use({ reducedMotion: 'no-preference' });

  test('scrolling through the page slides the entrances into place', async ({
    page,
  }) => {
    await page.goto(HOME_PATH);
    await settlePage(page);

    const transformTransitions = await readTransformTransitions(page);
    const fadeInHistories = await readFadeInTransformHistories(page);

    expect(transformTransitions.length).toBeGreaterThan(0);
    expect(
      fadeInHistories.filter((history) =>
        history.transforms.some(
          (transform) =>
            VERTICAL_OFFSET_TRANSFORM.test(transform) &&
            transform !== FADE_IN_HIDDEN_TRANSFORM,
        ),
      ).length,
    ).toBeGreaterThan(0);
  });
});
