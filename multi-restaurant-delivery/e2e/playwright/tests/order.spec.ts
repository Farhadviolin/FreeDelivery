import { test, expect } from '@playwright/test';
test('creates an order via API and UI', async ({ request, page }) => {
  const create = await request.post('/api/orders', { data: { items: [{ productId: 'p1', qty: 2 }] } });
  expect(create.ok()).toBeTruthy();
  const order = await create.json();
  await page.goto(`/orders/${order.orderId}`);
  await expect(page.locator('.order-status')).toHaveText('Pending');
});
