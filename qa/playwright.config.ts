import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './src/specs',
  testMatch: '**/*.spec.ts',
  timeout: 30000,
  retries: 0,
  use: {
    baseURL: 'file:///Users/tarasyonda/RiderProjects/shop/Shop.Frontend/index.html',
    headless: false,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  reporter: [['list'], ['html', { outputFolder: 'playwright-report' }]],
});