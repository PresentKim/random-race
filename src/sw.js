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

        async staticCacheStrategy(event) {
            event.waitUntil(caches.open(STATIC_CACHE_NAME).then(cache => cache.addAll(STATIC_FILES)));
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

            const url = new URL(event.request.url);
            url.search = '';
            let request = new Request(url, event.request);

            const requests = [
                caches.open(STATIC_CACHE_NAME).then(cache => cache.match(request)),
                caches.open(DYNAMIC_CACHE_NAME).then(cache => cache.match(request)),
            ];
            if (request.referrer !== "") {
                requests.push(fetch(request).then(networkResponse => {
                    if (STATIC_FILES.some(fileName => networkResponse.url.endsWith(fileName))) {
                        if (networkResponse.url.endsWith("version_info.json")) {
                            console.log("version_info Update!!");
                            caches.open(STATIC_CACHE_NAME).then(cache => cache.put(request, networkResponse));
                        } else {
                            caches.open(STATIC_CACHE_NAME).then(cache => cache.put(request, networkResponse));
                        }
                    } else {
                        caches.open(DYNAMIC_CACHE_NAME).then(cache => cache.put(request, networkResponse));
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