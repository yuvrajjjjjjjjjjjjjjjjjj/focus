const CACHE_NAME = 'focus-timer-v2'; // Version badal diya taaki phone naya data fetch kare
const urlsToCache = [
  './index.html',     // Isse check kar lein ki aapki main file ka naam index.html hi hai
  './manifest.json',
  './icon-192.png',   // Ye wahi icons hain jo aapne upload kiye
  './icon-512.png'
];

// Service worker install hote hi files ko cache (save) kar leta hai
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('Opened cache');
      return cache.addAll(urlsToCache);
    })
  );
});

// Purane cache ko delete karne ke liye
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Network se pehle cache check karega, isse app instant khulegi
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
