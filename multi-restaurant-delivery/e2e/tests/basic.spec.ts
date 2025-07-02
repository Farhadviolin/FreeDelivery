import { test, expect } from '@playwright/test';

test('homepage loads', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/KiLiefer|Customer App/);
  await expect(page.getByText(/Login|Anmelden/)).toBeVisible();
});

test('login page loads', async ({ page }) => {
  await page.goto('/login');
  await expect(page.getByText(/Login|Anmelden/)).toBeVisible();
});
