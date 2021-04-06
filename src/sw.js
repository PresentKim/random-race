importScripts("https://storage.googleapis.com/workbox-cdn/releases/5.0.0/workbox-sw.js");
/** @var {LoaderContext} workbox */
workbox.loadModule("workbox-core");
workbox.loadModule("workbox-routing");
workbox.loadModule("workbox-strategies");
workbox.loadModule("workbox-precaching");

self.skipWaiting();
workbox.core.clientsClaim();

(() => {
    const STATIC_CACHE_NAME = "static_v1";
    const DYNAMIC_CACHE_NAME = "dynamic_v1";

    const STATIC_FILES = [
        "/",
        "/index.html",
        "/favicon.ico",
        "/polyfill.js",
        "/sw_registration.js"
    ];

    const WORKBOX_HANDLER = {
        init() {
            self.addEventListener("install", this.staticCacheStrategy.bind(this));
            self.addEventListener("activate", this.deleteOldCache.bind(this));
            self.addEventListener("fetch", this.dynamicCacheStrategy.bind(this));
        },

        async staticCacheStrategy() {
            /** @var {Cache} */
            const staticCache = await caches.open(STATIC_CACHE_NAME);
            await staticCache.addAll(STATIC_FILES);
        },

        async deleteOldCache() {
            for (const key of await caches.keys()) {
                if (STATIC_CACHE_NAME.indexOf(key) === -1 && DYNAMIC_CACHE_NAME.indexOf(key) === -1) {
                    await caches.delete(key);
                }
            }
        },

        dynamicCacheStrategy(event) {
            if (event.request.method !== "GET")
                return;

            const requests = [
                caches.open(STATIC_CACHE_NAME).then(cache => cache.match(event.request.clone())),
                caches.open(DYNAMIC_CACHE_NAME).then(cache => cache.match(event.request.clone())),
            ];
            if (event.request.referrer !== "") {
                requests.push(fetch(event.request.clone()).then(networkResponse => {
                    if (STATIC_FILES.some(fileName => networkResponse.url.endsWith(fileName))) {
                        caches.open(STATIC_CACHE_NAME).then(cache => cache.put(event.request, networkResponse));
                    } else {
                        caches.open(DYNAMIC_CACHE_NAME).then(cache => cache.put(event.request, networkResponse));
                    }
                    return networkResponse.clone();
                }));
            }

            event.respondWith(Promise.all(requests).then(responses => responses.find(response => response)));
        }
    };

    WORKBOX_HANDLER.init();
})();

workbox.precaching.precacheAndRoute(self.__WB_MANIFEST || []);