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
const EXPORTED_ENTRANCE_SELECTORS = [
  `[style*="${FADE_IN_HIDDEN_TRANSFORM}"]`,
  '[class*="[transition:all_"]',
] as const;
const CTA_HOVER_COLOR = 'rgb(38, 72, 83)';
const BUTTON_PRESSED_COLOR = 'rgb(10, 43, 53)';
const LOADING_RING = 'main [aria-live="polite"] > div';

const CTA_ROOT = '#call-to-action';
const ATROPOS_ROOT = `${CTA_ROOT} .atropos`;
// Atropos adds this class to its root when it attaches its pointer listeners.
const ATROPOS_INITIALISED_ROOT = `${ATROPOS_ROOT}.atropos-rotate-touch`;
const ATROPOS_ACTIVE_CLASS = /\batropos-active\b/;
const ATROPOS_MOVING_LAYERS = [
  `${CTA_ROOT} .atropos-rotate`,
  `${CTA_ROOT} .atropos-scale`,
  `${CTA_ROOT} [data-atropos-offset]`,
] as const;
const ATROPOS_SHADOW = `${CTA_ROOT} .atropos-shadow`;

type InlineTransformHistory = {
  elementDescription: string;
  transforms: string[];
  computedStyles: { opacity: string; transform: string }[];
};

type MotionRecorder = {
  transformTransitions: string[];
  opacityTransitions: string[];
  inlineTransformHistories: Map<Element, InlineTransformHistory>;
};

declare global {
  interface Window {
    motionRecorder: MotionRecorder;
  }
}

function installMotionRecorder(): void {
  const transformTransitions: string[] = [];
  const opacityTransitions: string[] = [];
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
      if (event.propertyName === 'opacity' && event.target instanceof Element) {
        opacityTransitions.push(describeElement(event.target));
      }
    },
    true,
  );

  const recordTransform = (element: Element, transform: string): void => {
    let transformHistory = inlineTransformHistories.get(element);
    if (!transformHistory) {
      transformHistory = {
        elementDescription: describeElement(element),
        transforms: [],
        computedStyles: [],
      };
      inlineTransformHistories.set(element, transformHistory);
    }
    if (!transformHistory.transforms.includes(transform)) {
      transformHistory.transforms.push(transform);
    }
  };

  new MutationObserver((mutations) => {
    const mutatedElements = new Set<Element>();
    for (const mutation of mutations) {
      if (!(mutation.target instanceof Element)) continue;
      // The first old value is the server-rendered style the element started with.
      recordTransform(mutation.target, transformOf(mutation.oldValue));
      mutatedElements.add(mutation.target);
    }
    for (const element of mutatedElements) {
      recordTransform(element, transformOf(element.getAttribute('style')));
      const computedStyle = getComputedStyle(element);
      inlineTransformHistories.get(element)?.computedStyles.push({
        opacity: computedStyle.opacity,
        transform: computedStyle.transform,
      });
    }
  }).observe(document, {
    attributes: true,
    attributeFilter: ['style'],
    attributeOldValue: true,
    subtree: true,
  });

  window.motionRecorder = {
    transformTransitions,
    opacityTransitions,
    inlineTransformHistories,
  };
}

async function settlePage(page: Page): Promise<void> {
  // The control run uses smooth scrolling, so each jump must be instant or
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
      const hasRunningAnimations = document
        .getAnimations()
        .some((animation) => {
          const iterations = animation.effect?.getTiming().iterations ?? 1;
          return (
            animation.playState === 'running' && Number.isFinite(iterations)
          );
        });
      const hasUnsettledFades = Array.from(
        document.querySelectorAll<HTMLElement>('[style*="opacity"]'),
      ).some(
        (element) =>
          element.style.opacity !== '' && element.style.opacity !== '1',
      );
      return !hasRunningAnimations && !hasUnsettledFades;
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
  const transformHistories = await page.evaluate(() =>
    Array.from(window.motionRecorder.inlineTransformHistories.values()),
  );
  return transformHistories.filter(
    (transformHistory) =>
      transformHistory.transforms[0] === FADE_IN_HIDDEN_TRANSFORM,
  );
}

async function sweepMouseAcross(page: Page, selector: string): Promise<void> {
  const targetLocator = page.locator(selector);
  await targetLocator.scrollIntoViewIfNeeded();
  const targetBoundingBox = await targetLocator.boundingBox();
  if (!targetBoundingBox)
    throw new Error(`${selector} has no bounding box to hover`);
  const { x, y, width, height } = targetBoundingBox;

  await page.mouse.move(x + width * 0.1, y + height * 0.1);
  await page.mouse.move(x + width * 0.9, y + height * 0.9, {
    steps: HOVER_STEPS,
  });
  await page.mouse.move(x + width * 0.9, y + height * 0.1, {
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

  test('scrolling through the page under reduced motion keeps every entrance visible and still', async ({
    page,
  }) => {
    await page.goto(HOME_PATH);
    await expect(page.locator('html')).toHaveCSS('scroll-behavior', 'auto');
    await settlePage(page);

    const transformTransitions = await readTransformTransitions(page);
    const fadeInHistories = await readFadeInTransformHistories(page);

    expect(transformTransitions).toEqual([]);
    expect(
      await page.evaluate(() => window.motionRecorder.opacityTransitions),
    ).toEqual([]);
    expect(fadeInHistories.length).toBeGreaterThan(0);
    for (const transformHistory of fadeInHistories) {
      expect(transformHistory.computedStyles.length).toBeGreaterThan(0);
      expect(
        transformHistory.computedStyles.filter(
          (computedStyle) =>
            computedStyle.opacity !== '1' ||
            computedStyle.transform !== SETTLED_TRANSFORM,
        ),
        transformHistory.elementDescription,
      ).toEqual([]);
    }
  });

  test('hovering and pressing the install buttons under reduced motion preserves their colour feedback without movement', async ({
    page,
  }) => {
    await page.goto(HOME_PATH);
    await settlePage(page);
    const heroButton = page
      .getByRole('link', { name: 'Add to Chrome for free', exact: true })
      .locator(':scope > div');
    const ctaButton = page.locator(`${CTA_ROOT} a:visible > .group`);

    for (const buttonLocator of [heroButton, ctaButton]) {
      const restColor = await buttonLocator.evaluate(
        (element) => getComputedStyle(element).backgroundColor,
      );
      await expect(buttonLocator).toHaveCSS('transition-duration', '0.2s');
      const transitionProperties = await buttonLocator.evaluate((element) =>
        getComputedStyle(element).transitionProperty.split(', '),
      );
      expect(transitionProperties).toContain('background-color');
      expect(transitionProperties).not.toContain('transform');
      expect(transitionProperties).not.toContain('all');

      await buttonLocator.hover();
      if (buttonLocator === ctaButton) {
        await expect(buttonLocator).toHaveCSS(
          'background-color',
          CTA_HOVER_COLOR,
        );
      } else {
        await expect(buttonLocator).not.toHaveCSS(
          'background-color',
          restColor,
        );
      }
      await page.mouse.down();
      try {
        await expect(buttonLocator).toHaveCSS(
          'background-color',
          BUTTON_PRESSED_COLOR,
        );
      } finally {
        await page.mouse.move(0, 0);
        await page.mouse.up();
      }
    }
    expect(await readTransformTransitions(page)).toEqual([]);
  });

  test('hovering the call-to-action card under reduced motion leaves it untilted and unshadowed', async ({
    page,
  }) => {
    await page.goto(HOME_PATH);
    await page.locator(ATROPOS_INITIALISED_ROOT).waitFor();

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

  test('scrolling through the page with no motion preference slides the entrances into place', async ({
    page,
  }) => {
    await page.goto(HOME_PATH);
    await expect(page.locator('html')).toHaveCSS('scroll-behavior', 'smooth');
    await settlePage(page);

    const transformTransitions = await readTransformTransitions(page);
    const fadeInHistories = await readFadeInTransformHistories(page);

    expect(transformTransitions.length).toBeGreaterThan(0);
    expect(
      (await page.evaluate(() => window.motionRecorder.opacityTransitions))
        .length,
    ).toBeGreaterThan(0);
    expect(
      fadeInHistories.filter((transformHistory) =>
        transformHistory.transforms.some(
          (transform) =>
            VERTICAL_OFFSET_TRANSFORM.test(transform) &&
            transform !== FADE_IN_HIDDEN_TRANSFORM,
        ),
      ).length,
    ).toBeGreaterThan(0);
  });
});

test.describe('the static export before hydration under reduced motion', () => {
  test.use({ reducedMotion: 'reduce' });

  test('loading the static export under reduced motion gives every entrance visible and still styles before hydration', async ({
    page,
  }) => {
    // Next's inline script reveals streamed HTML before the external bundles hydrate it.
    await page.route('**/_next/**/*.js', (route) => route.abort());
    await page.goto(HOME_PATH);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    for (const entranceSelector of EXPORTED_ENTRANCE_SELECTORS) {
      const entranceStyles = await page
        .locator(entranceSelector)
        .evaluateAll((elements) =>
          elements.map((element) => ({
            elementDescription: element.outerHTML.slice(0, 180),
            opacity: getComputedStyle(element).opacity,
            transform: getComputedStyle(element).transform,
          })),
        );

      expect(entranceStyles.length, entranceSelector).toBeGreaterThan(0);
      expect(
        entranceStyles.filter(
          (entranceStyle) =>
            entranceStyle.opacity !== '1' ||
            entranceStyle.transform !== SETTLED_TRANSFORM,
        ),
      ).toEqual([]);
    }
  });
});

test.describe('the exported loading boundary under reduced motion', () => {
  test.use({ reducedMotion: 'reduce', javaScriptEnabled: false });

  test('loading the static export under reduced motion keeps the loading indicator visible without spinning', async ({
    page,
  }) => {
    await page.goto(HOME_PATH);

    await expect(page.locator(LOADING_RING)).toBeVisible();
    await expect(page.locator(LOADING_RING)).toHaveCSS(
      'animation-name',
      'none',
    );
    await expect(page.getByText('Loading...', { exact: true })).toBeVisible();
    await expect(page.locator('main')).toMatchAriaSnapshot(
      '- text: Loading...',
    );
  });
});

test.describe('the exported loading boundary with no motion preference', () => {
  test.use({ reducedMotion: 'no-preference', javaScriptEnabled: false });

  test('loading the static export with no motion preference keeps the loading ring spinning', async ({
    page,
  }) => {
    await page.goto(HOME_PATH);

    await expect(page.locator(LOADING_RING)).toBeVisible();
    await expect(page.locator(LOADING_RING)).toHaveCSS(
      'animation-name',
      'spin',
    );
    await expect(page.getByText('Loading...', { exact: true })).toBeVisible();
  });
});
