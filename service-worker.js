const CACHE_NAME = 'roster-shell-v20260414a'
const SHELL_ASSETS = [
  './',
  './index.html',
  './app.html',
  './pricing.html',
  './site.css?v=20260402a',
  './site.js?v=20260402a',
  './billing-config.js?v=20260401f',
  './styles.css?v=20260414a',
  './app.js?v=20260414a',
  './manifest.webmanifest?v=20260414a',
  './assets/roster-logo.svg?v=20260414a',
  './assets/icon.iconset/icon_256x256.png',
  './assets/icon.iconset/icon_512x512.png',
]

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(SHELL_ASSETS)))
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))),
    ),
  )
  self.clients.claim()
})

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') {
    return
  }

  const url = new URL(event.request.url)
  const sameOrigin = url.origin === self.location.origin
  const shellRequest = sameOrigin && (
    event.request.mode === 'navigate' ||
    /\/(?:app\.html|index\.html|pricing\.html)?$/.test(url.pathname) ||
    /\/(?:app\.js|styles\.css|site\.js|site\.css|manifest\.webmanifest)$/.test(url.pathname)
  )

  if (shellRequest) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          const copy = response.clone()
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy))
          return response
        })
        .catch(() => caches.match(event.request)),
    )
    return
  }

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) {
        return cached
      }

      return fetch(event.request).then((response) => {
        const copy = response.clone()
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy))
        return response
      })
    }),
  )
})
