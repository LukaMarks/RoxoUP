const CACHE_NAME = 'roxoup-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/style.css', // Substitua pelo nome do seu arquivo CSS, se tiver
  '/script.js'  // Substitua pelo nome do seu arquivo JS, se tiver
];

// Instalando o Service Worker e salvando os arquivos no cache
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Interceptando as requisições para funcionar offline
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Retorna do cache se encontrar, senão busca na rede
        return response || fetch(event.request);
      })
  );
});
