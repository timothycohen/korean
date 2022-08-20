import { test, expect } from '@playwright/test';

test.describe('time', () => {
  test.describe('general', () => {
    test('time app is accessible from the home page', async ({ page }) => {
      await page.goto('/');
      await page.locator('text=Time').click();
      await expect(page).toHaveURL('/time');
    });

    test('load time -> hangul page by default', async ({ page }) => {
      await page.goto('/time');
      await page.waitForSelector('.clock-wrapper', { timeout: 2000 });
    });

    test('clicking the direction button changes views', async ({ page }) => {
      await page.goto('/time').then(async () => await page.waitForTimeout(50));
      await page.locator('text=한글').click();
      await page.waitForSelector('.goal.ko', { timeout: 2000 });
    });

    test('title', async ({ page }) => {
      await page.goto('/time').then(async () => await page.waitForTimeout(50));
      expect(await page.title()).toBe('Time');
    });
  });
});
