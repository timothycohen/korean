import { test, expect } from '@playwright/test';

test.describe('e2e tracing', () => {
  test('this should fail and preserve traces in ci', async ({ page }) => {
    await page.goto('/');
    expect(' ').toBe('');
  });
});
