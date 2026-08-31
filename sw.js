/* Fit App service worker — toont push-notificaties van de eten-notify Worker */
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (e) => e.waitUntil(self.clients.claim()));

self.addEventListener("push", (e) => {
  let data = {};
  try { data = e.data ? e.data.json() : {}; } catch { data = { titel: "Fit App", tekst: e.data ? e.data.text() : "" }; }
  e.waitUntil(self.registration.showNotification(data.titel || "Fit App", {
    body: data.tekst || "",
    icon: "icon-192.png",
    badge: "icon-192.png",
    tag: "fit-app",
  }));
});

self.addEventListener("notificationclick", (e) => {
  e.notification.close();
  e.waitUntil(self.clients.matchAll({ type: "window", includeUncontrolled: true }).then((lijst) => {
    for (const c of lijst) if ("focus" in c) return c.focus();
    return self.clients.openWindow("https://tarzan-moes.github.io/eten-teller/");
  }));
});