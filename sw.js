/* El Sobrinito · service worker (v1, 2026-11-09)
   Los tres juegos, sus íconos y la voz en inglés de Chispa quedan guardados para jugar sin internet.
   Páginas: primero internet (para recibir mejoras) y, si no hay, la copia guardada. */
const CACHE='sobrinito-v1';
const FONTS='sobrinito-fonts-v1';
const ARCHIVOS=["./", "index.html", "silabas.html", "sumas.html", "app.js", "manifest-dictado.webmanifest", "manifest-silabas.webmanifest", "manifest-sumas.webmanifest", "icons/dictado-192.png", "icons/dictado-32.png", "icons/dictado-512.png", "icons/dictado-apple-180.png", "icons/dictado-maskable-192.png", "icons/dictado-maskable-512.png", "icons/silabas-192.png", "icons/silabas-32.png", "icons/silabas-512.png", "icons/silabas-apple-180.png", "icons/silabas-maskable-192.png", "icons/silabas-maskable-512.png", "icons/sumas-192.png", "icons/sumas-32.png", "icons/sumas-512.png", "icons/sumas-apple-180.png", "icons/sumas-maskable-192.png", "icons/sumas-maskable-512.png", "audio/en/awesome.mp3", "audio/en/cheer1.mp3", "audio/en/cheer2.mp3", "audio/en/cheer3.mp3", "audio/en/cheer4.mp3", "audio/en/correct.mp3", "audio/en/count.mp3", "audio/en/countdraw.mp3", "audio/en/draw.mp3", "audio/en/fcready.mp3", "audio/en/fcstart.mp3", "audio/en/find.mp3", "audio/en/great.mp3", "audio/en/greatch.mp3", "audio/en/look.mp3", "audio/en/medal.mp3", "audio/en/n0.mp3", "audio/en/n1.mp3", "audio/en/n10.mp3", "audio/en/n11.mp3", "audio/en/n12.mp3", "audio/en/n13.mp3", "audio/en/n14.mp3", "audio/en/n15.mp3", "audio/en/n16.mp3", "audio/en/n17.mp3", "audio/en/n18.mp3", "audio/en/n19.mp3", "audio/en/n2.mp3", "audio/en/n20.mp3", "audio/en/n21.mp3", "audio/en/n22.mp3", "audio/en/n23.mp3", "audio/en/n24.mp3", "audio/en/n25.mp3", "audio/en/n26.mp3", "audio/en/n27.mp3", "audio/en/n28.mp3", "audio/en/n29.mp3", "audio/en/n3.mp3", "audio/en/n30.mp3", "audio/en/n31.mp3", "audio/en/n32.mp3", "audio/en/n33.mp3", "audio/en/n34.mp3", "audio/en/n35.mp3", "audio/en/n36.mp3", "audio/en/n37.mp3", "audio/en/n38.mp3", "audio/en/n39.mp3", "audio/en/n4.mp3", "audio/en/n40.mp3", "audio/en/n41.mp3", "audio/en/n42.mp3", "audio/en/n43.mp3", "audio/en/n44.mp3", "audio/en/n45.mp3", "audio/en/n46.mp3", "audio/en/n47.mp3", "audio/en/n48.mp3", "audio/en/n49.mp3", "audio/en/n5.mp3", "audio/en/n50.mp3", "audio/en/n6.mp3", "audio/en/n7.mp3", "audio/en/n8.mp3", "audio/en/n9.mp3", "audio/en/nice.mp3", "audio/en/perfect.mp3", "audio/en/rex.mp3", "audio/en/w_count.mp3", "audio/en/w_dog.mp3", "audio/en/w_draw.mp3", "audio/en/w_number.mp3", "audio/en/w_play.mp3", "audio/en/w_star.mp3", "audio/en/was.mp3"];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ARCHIVOS)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE&&k!==FONTS).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{
  const r=e.request; if(r.method!=='GET')return;
  const u=new URL(r.url);
  if(u.hostname==='fonts.googleapis.com'||u.hostname==='fonts.gstatic.com'){
    e.respondWith(caches.open(FONTS).then(c=>c.match(r).then(hit=>{const net=fetch(r).then(res=>{c.put(r,res.clone());return res;}).catch(()=>hit);return hit||net;})));return;
  }
  if(u.origin!==location.origin)return;
  if(r.mode==='navigate'){
    e.respondWith(fetch(r).then(res=>{const cp=res.clone();caches.open(CACHE).then(c=>c.put(r,cp));return res;}).catch(()=>caches.match(r,{ignoreSearch:true}).then(h=>h||caches.match('index.html'))));return;
  }
  e.respondWith(caches.match(r).then(h=>h||fetch(r).then(res=>{if(res.ok){const cp=res.clone();caches.open(CACHE).then(c=>c.put(r,cp));}return res;})));
});
