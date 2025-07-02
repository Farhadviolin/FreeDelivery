import { test, expect } from '@playwright/test';

test.describe('End-to-End: Customer Wallet Flow', () => {
  test('NFC-Scan und QR-Fallback', async ({ page }) => {
    await page.goto('http://localhost:3000/wallet');

    // NFC-Button sichtbar
    await expect(page.getByRole('button', { name: /NFC/i })).toBeVisible();
    // Simuliere NFC-Scan (Mock/Stub im Test-Backend nötig)
    // await page.click('text=NFC-Scan starten');
    // await expect(page.locator('text=Scan-Ergebnis')).toContainText('NFC');

    // QR/Barcode-Button sichtbar
    await expect(page.getByRole('button', { name: /QR\/Barcode/i })).toBeVisible();
    // Simuliere QR-Scan (Mock/Stub im Test-Backend nötig)
    // await page.click('text=QR/Barcode scannen');
    // await expect(page.locator('text=Scan-Ergebnis')).toContainText('QR');
  });
});
