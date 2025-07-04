import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir: 'tests/e2e',
  projects: [
    { name: 'chromium', use: { browserName: 'chromium' } },
    { name: 'firefox',  use: { browserName: 'firefox' } },
    { name: 'webkit',   use: { browserName: 'webkit' } },
  ],
  use: {
    baseURL: 'https://staging.delivery.com',
    headless: true,
    screenshot: 'on',
    video: 'retain-on-failure'
  },
  reporter: [ ['html'], ['allure-playwright'] ]
});
