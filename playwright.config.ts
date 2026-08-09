import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  timeout: 30_000,
  expect: { timeout: 5000 },
  use: {
    headless: true,
    trace: 'on-first-retry',
    baseURL: process.env.E2E_BASE_URL ?? 'http://localhost:5173',
    viewport: { width: 1280, height: 800 },
    actionTimeout: 10_000,
    navigationTimeout: 15_000,
  },
  projects: [
    { name: 'chromium', use: { browserName: 'chromium' } },
    { name: 'firefox', use: { browserName: 'firefox' } },
    { name: 'webkit', use: { browserName: 'webkit' } },
    {
      name: 'chromium-mobile',
      use: {
        browserName: 'chromium',
        viewport: { width: 375, height: 812 },
      },
    },
  ],
  webServer: {
    command: 'npm run dev',
    url: process.env.E2E_BASE_URL ?? 'http://localhost:5173',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
