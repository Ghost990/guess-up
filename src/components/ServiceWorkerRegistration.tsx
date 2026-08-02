"use client";

import { useEffect, useState } from "react";

export function ServiceWorkerRegistration() {
  const [waitingWorker, setWaitingWorker] = useState<ServiceWorker | null>(null);

  useEffect(() => {
    if ("serviceWorker" in navigator && process.env.NODE_ENV === "production") {
      let reloadRequested = false;
      const handleControllerChange = () => {
        if (reloadRequested) window.location.reload();
      };

      navigator.serviceWorker.addEventListener("controllerchange", handleControllerChange);
      navigator.serviceWorker
        .register("/sw.js", { scope: "/", updateViaCache: "none" })
        .then((registration) => {
          if (registration.waiting) setWaitingWorker(registration.waiting);
          registration.addEventListener("updatefound", () => {
            const installing = registration.installing;
            installing?.addEventListener("statechange", () => {
              if (installing.state === "installed" && navigator.serviceWorker.controller) {
                setWaitingWorker(registration.waiting);
              }
            });
          });
        })
        .catch(() => {
          // The game remains usable if private browsing blocks service workers.
        });

      const markReload = () => {
        reloadRequested = true;
      };
      window.addEventListener("hoppra:apply-update", markReload);
      return () => {
        navigator.serviceWorker.removeEventListener("controllerchange", handleControllerChange);
        window.removeEventListener("hoppra:apply-update", markReload);
      };
    }
  }, []);

  if (!waitingWorker) return null;

  return (
    <aside className="pwa-update" role="status">
      <p>Frissítés elérhető / Update available</p>
      <button
        type="button"
        onClick={() => {
          window.dispatchEvent(new Event("hoppra:apply-update"));
          waitingWorker.postMessage({ type: "SKIP_WAITING" });
        }}
      >
        Frissítés / Update
      </button>
      <button type="button" aria-label="Bezárás / Close" onClick={() => setWaitingWorker(null)}>
        ×
      </button>
    </aside>
  );
}
