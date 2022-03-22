import { test, expect } from '@playwright/test';

test('should navigate to the numbers page', async ({ page }) => {
  await page.goto('/');
  await page.click('text=Numbers');
  await expect(page).toHaveURL('/numbers');
  await expect(page.locator('h1')).toContainText('Numbers');
});
