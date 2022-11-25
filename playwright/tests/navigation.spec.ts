import { expect, test } from '@playwright/test';

test('navigation test', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  await expect(page.locator('h1')).toHaveText(
    'Supercharge your high school search.',
  );

  await expect(
    page.locator(
      `img[alt="Illustration of a city with location icon in the middle"] >> nth=0`,
    ),
  ).toBeVisible();
  await page.locator('[data-test-id="area-select"]').click();
  const option = await page.waitForSelector(':text("Vienna")', {
    state: 'attached',
  });
  await option.click();
  await page.locator('[data-test-id="search-button"]').click();
  await expect(page).toHaveURL('http://localhost:3000/schools');
  await expect(page.locator('h1')).toHaveText('Find the right school for you.');
});
