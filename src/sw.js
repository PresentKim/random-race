importScripts("https://storage.googleapis.com/workbox-cdn/releases/5.0.0/workbox-sw.js");

self.skipWaiting();

workbox.loadModule("workbox-core");
workbox.core.clientsClaim();

workbox.loadModule("workbox-routing");
workbox.loadModule("workbox-strategies");
workbox.routing.registerRoute((req) => {
    //TODO
    return true;
}, new workbox.strategies.NetworkFirst());

workbox.loadModule("workbox-precaching");
workbox.precaching.precacheAndRoute(self.__WB_MANIFEST || []);