import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test('should display the correct title', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/(KiLiefer|Multi-Restaurant|Delivery|React)/i);
  });

  test('should have a visible main heading', async ({ page }) => {
    await page.goto('/');
    const heading = page.locator('h1');
    await expect(heading).toBeVisible();
  });
});
