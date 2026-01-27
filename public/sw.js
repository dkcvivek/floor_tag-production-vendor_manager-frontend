const CACHE_VERSION = "v1";
const STATIC_CACHE = `static-${CACHE_VERSION}`;
const OFFLINE_URL = "/offline";

/* Install */
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then(cache =>
      cache.addAll([
        "/",
        "/manifest.json",
        OFFLINE_URL
      ])
    )
  );
  self.skipWaiting();
});

/* Activate */
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== STATIC_CACHE)
          .map(key => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

/* Fetch */
self.addEventListener("fetch", event => {
  const { request } = event;

  // Only GET requests
  if (request.method !== "GET") return;

  // HTML navigation → Network First
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request).catch(() =>
        caches.match(OFFLINE_URL)
      )
    );
    return;
  }

  // Static assets → Cache First
  if (
    request.destination === "style" ||
    request.destination === "script" ||
    request.destination === "image" ||
    request.destination === "font"
  ) {
    event.respondWith(
      caches.match(request).then(cached => {
        if (cached) return cached;

        return fetch(request).then(response => {
          const copy = response.clone();
          caches.open(STATIC_CACHE).then(cache =>
            cache.put(request, copy)
          );
          return response;
        });
      })
    );
  }
});
