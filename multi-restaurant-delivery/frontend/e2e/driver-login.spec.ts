import { test, expect } from '@playwright/test';

test('Fahrer-Login und Dashboard', async ({ page }) => {
  await page.goto('/driver-login');
  await page.fill('input[placeholder="Benutzername"]', 'testfahrer');
  await page.fill('input[placeholder="Passwort"]', 'testpass');
  await page.click('button:text("Login")');
  await expect(page).toHaveURL(/driver-dashboard/);
  await expect(page.getByText('Fahrer-Dashboard')).toBeVisible();
});
