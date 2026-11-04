/* Ativa o isolamento de origem cruzada para o ONNX Runtime usar vários núcleos de CPU.
   Coloque este arquivo na mesma pasta do lumina-upscale.html (precisa de HTTPS, como no GitHub Pages).
   Na primeira visita a página recarrega uma vez. Se algo falhar, a Lumina continua funcionando em um só núcleo. */
if (typeof window === "undefined") {
  self.addEventListener("install", () => self.skipWaiting());
  self.addEventListener("activate", e => e.waitUntil(self.clients.claim()));
  self.addEventListener("fetch", e => {
    const r = e.request;
    if (r.cache === "only-if-cached" && r.mode !== "same-origin") return;
    e.respondWith(fetch(r).then(res => {
      if (res.status === 0) return res;
      const h = new Headers(res.headers);
      h.set("Cross-Origin-Embedder-Policy", "require-corp");
      h.set("Cross-Origin-Resource-Policy", "cross-origin");
      h.set("Cross-Origin-Opener-Policy", "same-origin");
      return new Response(res.body, { status: res.status, statusText: res.statusText, headers: h });
    }).catch(() => fetch(r)));
  });
} else if (window.crossOriginIsolated === false && window.isSecureContext && "serviceWorker" in navigator) {
  navigator.serviceWorker.register(document.currentScript.src).then(reg => {
    const go = () => { if (!sessionStorage.getItem("coi")) { sessionStorage.setItem("coi", "1"); location.reload(); } };
    if (reg.active && !navigator.serviceWorker.controller) go();
    else if (reg.installing) reg.installing.addEventListener("statechange", e => { if (e.target.state === "activated") go(); });
  }).catch(() => {});
}
