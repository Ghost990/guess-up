import { defineConfig, devices } from "@playwright/test";

const port = process.env.PWA_PORT ?? "3200";
const baseURL = `http://127.0.0.1:${port}`;

export default defineConfig({
  testDir: "./tests/pwa",
  fullyParallel: false,
  retries: 0,
  reporter: [["list"]],
  use: {
    ...devices["Pixel 5"],
    baseURL,
    serviceWorkers: "allow",
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
  },
  webServer: {
    command: `pnpm start --hostname 127.0.0.1 --port ${port}`,
    url: baseURL,
    reuseExistingServer: false,
    timeout: 120000,
  },
});
