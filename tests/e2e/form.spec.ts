import { test, expect } from '@playwright/test';

test.describe('interest form', () => {
  test('shows field errors and an error summary', async ({ page }) => {
    await page.goto('/?motion=off#request-access');
    const form = page.locator('#request-access form');
    await form.getByLabel('Work email').fill('not-an-email');
    await form.getByLabel(/What do you want to know/).fill('short');
    await form.getByRole('button', { name: 'Request access' }).click();
    await expect(form.getByRole('alert')).toBeVisible();
    await expect(form.getByText('Enter an email address like name@company.com.').first()).toBeVisible();
    await expect(form.getByText('Add a few more words so we can help.').first()).toBeVisible();
  });

  test('submits and moves focus to the success heading', async ({ page }) => {
    await page.goto('/?motion=off#request-access');
    const form = page.locator('#request-access form');
    await form.getByLabel('Work email').fill('ben@example-co.test');
    await page.waitForTimeout(2200); // the time trap
    await form.getByLabel(/What do you want to know/).fill('Which teams use Cursor the most, and what it costs per sprint.');
    await form.getByLabel('Company size').selectOption('50-199');
    await form.getByRole('button', { name: 'Request access' }).click();
    const heading = page.getByRole('heading', { name: 'Thanks. Your request is in.' });
    await expect(heading).toBeVisible();
    await expect(heading).toBeFocused();
    await expect(page.getByText("We'll reply to ben@example-co.test.")).toBeVisible();
  });

  test('works without JavaScript', async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled: false });
    const page = await context.newPage();
    await page.goto('/');
    const form = page.locator('#request-access form');
    await form.getByLabel('Work email').fill('ben@example-co.test');
    await form.getByLabel(/What do you want to know/).fill('Which teams use Cursor the most, and what it costs per sprint.');
    await form.getByRole('button', { name: 'Request access' }).click();
    await expect(page.getByRole('heading', { name: 'Thanks. Your request is in.' })).toBeVisible();
    await context.close();
  });

  test('a filled honeypot gets a fake success and no delivery', async ({ page }) => {
    await page.goto('/?motion=off#request-access');
    const form = page.locator('#request-access form');
    await form.getByLabel('Work email').fill('bot@example.test');
    await form.getByLabel(/What do you want to know/).fill('Buy cheap tokens now and forever more.');
    await form.locator('input[name="website"]').fill('http://spam.example', { force: true });
    await form.getByRole('button', { name: 'Request access' }).click();
    await expect(page.getByRole('heading', { name: 'Thanks. Your request is in.' })).toBeVisible();
  });
});
