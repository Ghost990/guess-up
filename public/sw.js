const CACHE_NAME = 'guessup-v4';

// On install: skip waiting immediately, wipe all old caches
self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.map((k) => caches.delete(k))))
  );
});

// On activate: claim all clients immediately
self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

// Network only — no caching, always fresh
self.addEventListener('fetch', (event) => {
  event.respondWith(fetch(event.request));
});
