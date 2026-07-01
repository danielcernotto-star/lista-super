// Service worker mínimo: cachea el shell de la app para que abra rápido
// y sea instalable. Los datos de la lista SIEMPRE se piden en vivo a
// Microsoft Graph (nunca se sirven desde caché), para que no veas datos viejos.
const CACHE_NAME = 'lista-super-shell-v1';
const SHELL_FILES = [
  './',
  './index.html',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(SHELL_FILES))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Nunca cachear llamadas a Microsoft (login ni Graph API): siempre red.
  if (url.hostname.includes('microsoftonline.com') || url.hostname.includes('graph.microsoft.com') || url.hostname.includes('live.com')) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request))
  );
});
