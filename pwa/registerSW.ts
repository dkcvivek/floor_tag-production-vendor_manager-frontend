export function registerServiceWorker() {
  if (typeof window === "undefined") return;

  if (!("serviceWorker" in navigator)) {
    return;
  }


  navigator.serviceWorker
    .register("/sw.js")
    .then(reg => {
    })
    .catch(err => {
    });
}
