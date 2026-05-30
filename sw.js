const CACHE_NAME = "pi-club-cache-v28";

const PRECACHE_ASSETS = [
  "/",
  "/index.html",
  "/style.css",
  "/script.js",
  "/favicon.svg",

  "/assets/img/hero_main.jpg",
  "/assets/img/og-image.jpg",
  "/assets/img/billiard.jpg",
  "/assets/img/bar.jpg",
  "/assets/img/led.jpg",
  "/assets/img/stairs.jpg",
  "/assets/img/karaoke.jpg",

  "/assets/img/biliard/b0.jpg",
  "/assets/img/biliard/b1.jpg",
  "/assets/img/biliard/b2.jpg",
  "/assets/img/biliard/b3.jpg",
  "/assets/img/biliard/b4.jpg",

  "/assets/img/bar/bar0.jpg",

  "/assets/img/vip_karaoke_1/k0.jpg",
  "/assets/img/vip_karaoke_1/k2.jpg",

  "/assets/img/vip_karaoke_2/k2_1.jpg",
  "/assets/img/vip_karaoke_2/k2_2.jpg",

  "/assets/img/disco_zone/d1.jpg",
  "/assets/img/disco_zone/d2.jpg",
  "/assets/img/disco_zone/d3.jpg",
  "/assets/img/disco_zone/d4.jpg",
  "/assets/img/disco_zone/d5.jpg",
  "/assets/img/disco_zone/d6.jpg",
  "/assets/img/disco_zone/d7.jpg",
  "/assets/img/disco_zone/d8.jpg",
  "/assets/img/disco_zone/d9.jpg",
  "/assets/img/disco_zone/d10.jpg",
  "/assets/img/disco_zone/d11.jpg",
  "/assets/img/disco_zone/d12.jpg"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_ASSETS);
    })
  );

  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((cacheName) => cacheName !== CACHE_NAME)
          .map((cacheName) => caches.delete(cacheName))
      );
    })
  );

  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const request = event.request;

  if (request.method !== "GET") return;

  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }

      return fetch(request)
        .then((networkResponse) => {
          const isSameOrigin = new URL(request.url).origin === self.location.origin;

          if (
            isSameOrigin &&
            networkResponse &&
            networkResponse.status === 200
          ) {
            const responseClone = networkResponse.clone();

            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, responseClone);
            });
          }

          return networkResponse;
        })
        .catch(() => {
          return cachedResponse;
        });
    })
  );
});