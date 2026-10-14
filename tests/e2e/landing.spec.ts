import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('landing page', () => {
  test('renders the fixed copy and one h1', async ({ page }) => {
    await page.goto('/?motion=off');
    const h1 = page.locator('h1');
    await expect(h1).toHaveCount(1);
    await expect(h1).toContainText('AI tokens are money, you want receipts, right?');
    await expect(page.locator('footer')).toContainText('Do you know what tasks are your employees using AI for?');
  });

  test('has no horizontal overflow', async ({ page }) => {
    await page.goto('/?motion=off');
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow).toBeLessThanOrEqual(0);
  });

  test('nothing stays hidden after a full scroll', async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(800);
    const total = await page.evaluate(() => document.body.scrollHeight);
    for (let y = 0; y < total; y += 350) {
      await page.evaluate((top) => window.scrollTo({ top, behavior: 'instant' as ScrollBehavior }), y);
      await page.waitForTimeout(90);
    }
    await page.waitForTimeout(1800);
    const hidden = await page.evaluate(() =>
      Array.from(document.querySelectorAll('main *'))
        .filter((el) => {
          const cs = getComputedStyle(el);
          return cs.opacity === '0' && (el as HTMLElement).offsetParent !== null && !el.closest('[aria-hidden="true"]') && !el.classList.contains('diagram-dot');
        })
        .map((el) => el.tagName + '.' + el.className),
    );
    expect(hidden).toEqual([]);
  });

  test('anchor navigation clears the sticky header', async ({ page, isMobile }) => {
    test.skip(isMobile, 'nav is dropped on compact');
    await page.goto('/?motion=off');
    await page.getByRole('link', { name: 'FAQ' }).first().click();
    await page.waitForTimeout(300);
    const top = await page.locator('#faq').evaluate((el) => el.getBoundingClientRect().top);
    expect(top).toBeGreaterThanOrEqual(56);
  });

  test('the marquee has a pause control', async ({ page }) => {
    await page.goto('/');
    const button = page.getByRole('button', { name: /Pause logos|Play logos/ });
    if (await button.isVisible()) {
      await button.click();
      await expect(button).toHaveAttribute('aria-pressed', 'true');
    }
  });

  test('lens buttons switch the chart', async ({ page }) => {
    await page.goto('/?motion=off');
    await page.locator('#lens').scrollIntoViewIfNeeded();
    await page.getByRole('button', { name: 'By team' }).click();
    await expect(page.locator('#lens .headline')).toContainText('Engineering is 56% of spend.');
    await expect(page.locator('#lens svg[role="img"]').first()).toHaveAttribute('aria-label', /by team/i);
  });

  test('charts are keyboard readable', async ({ page }) => {
    await page.goto('/?motion=off');
    const chart = page.locator('#dashboards .amb-chart').first();
    await chart.scrollIntoViewIfNeeded();
    await chart.focus();
    await page.keyboard.press('ArrowRight');
    await expect(chart.locator('.amb-tip')).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(chart.locator('.amb-tip')).toHaveCount(0);
  });

  test('is dark by default and the toggle remembers light', async ({ page }) => {
    await page.goto('/?motion=off');
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
    await page.getByRole('button', { name: 'Switch to light appearance' }).click();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
    await page.reload();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
    await page.getByRole('button', { name: 'Switch to dark appearance' }).click();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  });

  test('passes axe in this appearance', async ({ page }) => {
    await page.goto('/?motion=off');
    await page.waitForTimeout(500);
    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(' ')).join(', ')}`)).toEqual([]);
  });
});
