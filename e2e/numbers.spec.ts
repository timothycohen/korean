import { test, expect } from '@playwright/test';

test.describe('numbers', () => {
  test.describe('general', () => {
    test('numbers app is accessible from the home page', async ({ page }) => {
      await page.goto('/');
      await page.locator('text=Numbers').click();
      await expect(page).toHaveURL('/numbers');
    });

    test('load numbers -> hangul page by default', async ({ page }) => {
      await page.goto('/numbers');
      await page.waitForSelector('.goal.en', { timeout: 2000 });
    });

    test('clicking the direction button changes views', async ({ page }) => {
      await page.goto('/numbers').then(async () => await page.waitForTimeout(50));
      await page.locator('text=한글').click();
      await page.waitForSelector('.goal.ko', { timeout: 2000 });
    });

    test('title', async ({ page }) => {
      await page.goto('/numbers').then(async () => await page.waitForTimeout(50));
      expect(await page.title()).toBe('Numbers | Sino');
    });
  });
});
