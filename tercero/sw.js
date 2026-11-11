/* Repaso 3.º básico · service worker (v1, 2026-11-11)
   Guarda la app completa para usarla sin internet. Páginas y scripts: primero internet (para recibir correcciones) y, si no hay, la copia guardada. */
const CACHE = 'tercero-v1';
const FONTS = 'tercero-fonts-v1';
const ARCHIVOS = ['./', 'index.html', 'protocolo.html', 'base.js', 'svg.js', 'ciencias.js', 'historia.js', 'lenguaje.js', 'matematica.js', 'engine.js', 'manifest.webmanifest',
  'icons/tercero-32.png', 'icons/tercero-192.png', 'icons/tercero-512.png', 'icons/tercero-maskable-192.png', 'icons/tercero-maskable-512.png', 'icons/tercero-apple-180.png',
  'fonts/baloo2-latin.woff', 'fonts/chewy-latin.woff'];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(ARCHIVOS)).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k.startsWith('tercero-') && k !== CACHE && k !== FONTS).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', e => {
  const r = e.request; if (r.method !== 'GET') return;
  const u = new URL(r.url);
  if (u.hostname === 'fonts.googleapis.com' || u.hostname === 'fonts.gstatic.com') {
    e.respondWith(caches.open(FONTS).then(c => c.match(r).then(hit => { const net = fetch(r).then(res => { c.put(r, res.clone()); return res; }).catch(() => hit); return hit || net; }))); return;
  }
  if (u.origin !== location.origin) return;
  e.respondWith(fetch(r).then(res => { if (res.ok) { const cp = res.clone(); caches.open(CACHE).then(c => c.put(r, cp)); } return res; })
    .catch(() => caches.match(r, { ignoreSearch: true }).then(h => h || (r.mode === 'navigate' ? caches.match('index.html') : undefined))));
});
