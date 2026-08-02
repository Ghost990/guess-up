import { expect, test } from "@playwright/test";

test("installs and reopens the game setup offline", async ({ context, page, request }) => {
  const workerResponse = await request.get("/sw.js");
  expect(workerResponse.ok()).toBe(true);
  expect(workerResponse.headers()["content-type"]).toContain("application/javascript");
  expect(workerResponse.headers()["cache-control"]).toContain("no-cache");

  await page.goto("/new-game", { waitUntil: "networkidle" });
  await page.evaluate(() => navigator.serviceWorker.ready);
  await page.reload({ waitUntil: "networkidle" });

  await expect.poll(() => page.evaluate(() => Boolean(navigator.serviceWorker.controller)))
    .toBe(true);
  await expect.poll(() => page.evaluate(() => caches.keys()))
    .toEqual(expect.arrayContaining(["hoppra-shell-v4", "hoppra-runtime-v4"]));

  await context.setOffline(true);
  await page.reload({ waitUntil: "domcontentloaded" });

  await expect(page.getByRole("heading", { name: "Készítsétek elő a játékot" })).toBeVisible();
  await expect(page.locator("main")).toHaveAttribute("data-pack-theme", "classic");
  await expect.poll(
    () => page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth),
  ).toBe(0);
});
