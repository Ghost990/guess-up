import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import manifest from "@/app/manifest";

describe("PWA delivery", () => {
  it("publishes an installable manifest with shortcuts and safe maskable icons", () => {
    const value = manifest();

    expect(value).toMatchObject({
      id: "/",
      start_url: "/",
      scope: "/",
      display: "standalone",
    });
    expect(value.shortcuts).toEqual(
      expect.arrayContaining([expect.objectContaining({ url: "/new-game" })]),
    );
    expect(value.icons).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ src: "/icon-maskable-512.png", purpose: "maskable" }),
      ]),
    );
  });

  it("uses namespaced offline caches and leaves private endpoints network-only", () => {
    const worker = readFileSync(join(process.cwd(), "public", "sw.js"), "utf8");

    expect(worker).toContain('const CACHE_PREFIX = "hoppra-"');
    expect(worker).toContain('url.pathname.startsWith("/api/")');
    expect(worker).toContain('cache.match("/offline")');
    expect(worker).not.toContain("keys.map((k) => caches.delete(k))");
  });
});
