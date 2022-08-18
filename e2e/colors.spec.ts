import { test, expect, type Page } from '@playwright/test';

test.describe('colors', () => {
  test.describe('general', () => {
    test('colors app is accessible from the home page', async ({ page }) => {
      await page.goto('/');
      await page.locator('text=Colors').click();
      await expect(page).toHaveURL('/colors');
    });

    test('load hangul -> color page by default', async ({ page }) => {
      await page.goto('/colors');
      await expect(page.locator('div.selectionContainer')).toBeVisible();
    });

    test('clicking the direction button changes views', async ({ page }) => {
      await page.goto('/colors').then(async () => await page.waitForTimeout(50));
      await page.locator('text=한글').click();
      await page.waitForSelector('#koreanColor', { timeout: 2000 });
    });

    test('title', async ({ page }) => {
      await page.goto('/colors').then(async () => await page.waitForTimeout(50));
      expect(await page.title()).toBe('Colors');
    });
  });

  test.describe('hangul to color', () => {
    test('clicking the key button makes the key visible', async ({ page }) => {
      await page.goto('/colors');
      const red = page.locator('[aria-label="red is 빨간색"]');
      const keyToggle = page.locator('input[name="key"]');

      await expect(keyToggle).not.toBeChecked();

      const redBGC = await red.evaluate(el => window.getComputedStyle(el).backgroundColor);
      const redC = await red.evaluate(el => window.getComputedStyle(el).color);
      expect(redBGC).toBe(redC);

      keyToggle.setChecked(true);
      await expect(keyToggle).toBeChecked();

      const redBGC2 = await red.evaluate(el => window.getComputedStyle(el).backgroundColor);
      const redC2 = await red.evaluate(el => window.getComputedStyle(el).color);
      expect(redBGC2).not.toBe(redC2);
    });

    test('clicking the answer button makes the color of the 한글 and the page background the goal color', async ({
      page,
    }) => {
      await page.goto('/colors');
      const goalEl = page.locator('.koreanContainer h1');
      const pageDiv = page.locator('.page');
      const answerToggle = page.locator('input[name="answer"]');

      await expect(answerToggle).not.toBeChecked();

      const goalElC = await goalEl.evaluate(el => window.getComputedStyle(el).color);
      const pageBGC = await pageDiv.evaluate(el => window.getComputedStyle(el).backgroundColor);
      expect(goalElC).toBe('rgb(255, 242, 209)');
      expect(pageBGC).toBe('rgb(0, 0, 0)');

      answerToggle.setChecked(true);
      await expect(answerToggle).toBeChecked();

      const goalElC2 = await goalEl.evaluate(el => window.getComputedStyle(el).color);
      const pageBGC2 = await pageDiv.evaluate(el => window.getComputedStyle(el).backgroundColor);
      expect(goalElC2).toBe(pageBGC2);
    });

    test('clicking the wrong answer plays a fail animation on that button', async ({ page }) => {
      await page.goto('/colors');
      const goalText = await page.textContent('.koreanContainer h1');
      let targetBtnText = '하얀색';
      if (goalText === '하얀색') targetBtnText = '까만색';
      const btnEl = page.locator('.shakable', { hasText: targetBtnText });

      expect(Object.values(await btnEl.evaluate(el => el.classList)).includes('shake')).toBe(false);
      await btnEl.click();
      expect((await (await page.waitForSelector('.shakable.shake')).textContent())?.trim()).toBe(targetBtnText);
      await page.waitForTimeout(300);
      expect(Object.values(await btnEl.evaluate(el => el.classList)).includes('shake')).toBe(false);
    });

    test('clicking the correct answer changes the color (no duplicates) and shuffles', async ({ page }) => {
      await page.goto('/colors');
      let goalText = await page.textContent('.koreanContainer h1');
      const order = await page.textContent('.selectionContainer');
      expect(goalText).toBeTruthy();
      goalText = goalText as string;
      await page
        .locator('.shakable', { hasText: goalText })
        .click()
        .then(async () => await page.waitForTimeout(300));
      expect(await page.textContent('.koreanContainer h1')).not.toBe(goalText);
      expect(await page.textContent('.selectionContainer')).not.toEqual(order);
    });

    test('shuffles on click', async ({ page }) => {
      await page.goto('/colors');
      const order = await page.textContent('.selectionContainer');
      await page
        .locator('.shuffleBtn')
        .click()
        .then(async () => await page.waitForTimeout(50));
      expect(await page.textContent('.selectionContainer')).not.toEqual(order);
    });
  });

  test.describe('color to hangul', () => {
    const setup = async (page: Page) => {
      await page.goto('/colors').then(async () => await page.waitForTimeout(50));
      await page.locator('text=한글').click();
      await page.waitForSelector('#koreanColor', { timeout: 2000 });
    };

    test('clicking the key toggle shows key', async ({ page }) => {
      await setup(page);

      expect(await page.locator('.keyContainer').count()).toBeFalsy();

      const keyToggle = page.locator('input[name="key"]');
      await expect(keyToggle).not.toBeChecked();
      await keyToggle.setChecked(true);
      await expect(keyToggle).toBeChecked();

      await page.waitForSelector('.keyContainer');
    });

    test('clicking answer toggle shows answer', async ({ page }) => {
      await setup(page);

      expect(await page.locator('.koreanContainer h1').count()).toBeFalsy();

      const answerToggle = page.locator('input[name="answer"]');
      await expect(answerToggle).not.toBeChecked();
      await answerToggle.setChecked(true);
      await expect(answerToggle).toBeChecked();

      await page.waitForSelector('.koreanContainer h1');
    });

    test('typing the correct answer changes the goal', async ({ page }) => {
      await setup(page);
      await page.locator('input[name="answer"]').setChecked(true);

      const goalText1 = await page.textContent('.koreanContainer');
      const input = page.locator('#koreanColor');
      await input.type(goalText1 ?? '');

      const goalText2 = await page.textContent('.koreanContainer');
      expect(goalText1).not.toBe(goalText2);
    });

    test('no phantom input', async ({ page }) => {
      // setting the input to '' doesn't always clear the cache
      // for example, typing 보라색 followed by 까만색 will show 색까만색
      await setup(page);
      await page.locator('input[name="answer"]').setChecked(true);
      const input = page.locator('#koreanColor');

      for (let i = 0; i < 5; i++) {
        await input.type((await page.textContent('.koreanContainer'))?.trim() ?? '');
        await page.waitForTimeout(220);
      }
      expect(await input.inputValue()).toBe('');
    });
  });
});
