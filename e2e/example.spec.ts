import { test, expect } from '@playwright/test';

test('should navigate to the numbers page', async ({ page }) => {
  await page.goto('/colors');
  await expect(page).toHaveURL('/colors');
  await expect(page.locator('div.keyContainer')).toContainText('하얀색');
});
