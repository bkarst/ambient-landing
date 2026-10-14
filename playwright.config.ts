import { defineConfig, devices } from '@playwright/test';

const port = 3200;

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? 'github' : 'list',
  use: {
    baseURL: `http://localhost:${port}`,
    trace: 'retain-on-failure',
  },
  webServer: {
    command: `pnpm build && pnpm start -p ${port}`,
    url: `http://localhost:${port}`,
    reuseExistingServer: !process.env.CI,
    timeout: 240_000,
    env: { NEXT_PUBLIC_SITE_URL: `http://localhost:${port}`, INTEREST_SINK: 'log', INTEREST_HASH_SECRET: 'test', INTEREST_RATE_LIMIT_MAX: '1000' },
  },
  projects: [
    { name: 'desktop-dark', use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 900 }, colorScheme: 'dark' } },
    { name: 'desktop-light-reduced', use: { ...devices['Desktop Chrome'], viewport: { width: 1280, height: 800 }, colorScheme: 'light', reducedMotion: 'reduce' } },
    { name: 'phone', use: { ...devices['iPhone 13'], colorScheme: 'light' } },
  ],
});
