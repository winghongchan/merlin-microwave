const cache_name = "merlin-microwave-v1-cache"

const content_to_cache = ["index.html", "script.js", "style.css", "/images/merlin-microwave-dark-16.png", "/images/merlin-microwave-light-192.svg", "/images/merlin-microwave-dark-192.svg"]

self.addEventListener("install", (e) => {
  console.log("[Service Worker] Install");
  e.waitUntil(
    (async () => {
      const cache = await caches.open(cache_name);
      console.log("[Service Worker] Caching all: app shell and content");
      await cache.addAll(content_to_cache);
    })()
  );
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    (async () => {
      const r = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (r) {
        return r;
      }
      const response = await fetch(e.request);
      const cache = await caches.open(cache_name);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })()
  );
});
