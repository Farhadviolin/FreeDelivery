import { test, expect } from '@playwright/test';

test('Full order flow', async ({ page }) => {
  await page.goto('/');
  await page.click('text=Login');
  await page.fill('input[name="email"]', 'test@user.com');
  await page.fill('input[name="password"]', 'password');
  await page.click('button[type="submit"]');
  await expect(page).toHaveURL('/dashboard');

  // Add to cart
  await page.click('text=Pizza');
  await page.click('text=Add to Cart');
  await page.click('text=Checkout');
  await page.fill('input[name="address"]', '123 Main St');
  await page.click('text=Place Order');
  await expect(page.locator('.order-confirmation')).toContainText('Bestellung #');
});
