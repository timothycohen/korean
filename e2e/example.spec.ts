import { test, expect } from '@playwright/test';

test.describe('colors', () => {
  test('colors app is accessible from the home page', async ({ page }) => {
    await page.goto('/');
    await page.locator('text=Colors').click();
    await expect(page).toHaveURL('/colors');
  });

  test('load hangul -> color page by default', async ({ page }) => {
    await page.goto('/colors');
    await expect(page.locator('div.selectionContainer')).toBeVisible();
  });

  test.only('clicking the key button makes the key visible', async ({ page }) => {
    await page.goto('/colors');
    const red = page.locator('[aria-label="red is 빨간색"]');
    const keyToggle = page.locator('input[name="key"]');

    await expect(keyToggle).not.toBeChecked();

    const redBGC = await red.evaluate(el => window.getComputedStyle(el).getPropertyValue('background-color'));
    const redC = await red.evaluate(el => window.getComputedStyle(el).getPropertyValue('color'));
    expect(redBGC).toBe(redC);

    keyToggle.setChecked(true);
    await expect(keyToggle).toBeChecked();

    const redBGC2 = await red.evaluate(el => window.getComputedStyle(el).getPropertyValue('background-color'));
    const redC2 = await red.evaluate(el => window.getComputedStyle(el).getPropertyValue('color'));
    expect(redBGC2).not.toBe(redC2);
  });

  test('clicking the direction button changes views', async ({ page }) => {
    await page.goto('/colors');
    await page.locator('text=한글').click();
    await expect(page.locator('div.keyContainer')).toBeVisible;
  });
});
