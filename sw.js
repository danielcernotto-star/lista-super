// Service worker: hace la app instalable y rápida.
// - index.html se pide SIEMPRE primero a la red (así cada versión nueva subida
//   a GitHub aparece al instante); si no hay señal, se usa la copia guardada.
// - Los datos de la lista nunca pasan por caché: van en vivo a Microsoft Graph.
// La carpeta /beta/ (entorno de prueba) usa su propia caché y no toca la de producción.
const IS_BETA = self.registration.scope.includes('/beta/');
const CACHE_NAME = (IS_BETA ? 'lista-super-beta-' : 'lista-super-') + 'v3.1';
const SHELL_FILES = ['./', './index.html', './manifest.json', './icons/icon-192.png', './icons/icon-512.png'];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) =>
      // Uno por uno: si falta algún ícono, el resto se guarda igual.
      Promise.all(SHELL_FILES.map((f) => cache.add(f).catch(() => null)))
    )
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys
      .filter((k) => k !== CACHE_NAME && k.includes('-beta-') === IS_BETA)
      .map((k) => caches.delete(k))))
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  // Login y datos de Microsoft: siempre red, nunca caché.
  if (/microsoftonline\.com|graph\.microsoft\.com|live\.com|msauth|msftauth/.test(url.hostname)) return;

  // Página principal: red primero, caché como respaldo sin conexión.
  if (req.mode === 'navigate' || url.pathname.endsWith('.html') || url.pathname.endsWith('/')) {
    event.respondWith(
      fetch(req).then((res) => {
        const copy = res.clone();
        caches.open(CACHE_NAME).then((c) => c.put(req, copy));
        return res;
      }).catch(() => caches.match(req).then((r) => r || caches.match('./index.html')))
    );
    return;
  }

  // Resto (íconos, fuentes, librerías): caché primero.
  event.respondWith(caches.match(req).then((cached) => cached || fetch(req)));
});
