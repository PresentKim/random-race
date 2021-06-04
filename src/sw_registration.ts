import InstallPng from "~/ui/install_button.png";

if ("serviceWorker" in navigator && location.hostname !== "" &&
        (new URLSearchParams(window.location.search).get("registerServiceWorker") || location.hostname !== "localhost" && location.hostname !== "127.0.0.1")
) {
    window.addEventListener("load", () => navigator.serviceWorker.register("/sw.js"));
}

let deferredPrompt = null;
let installButton = null;

function showInstallButton(): void {
    if (installButton || !deferredPrompt)
        return;

    installButton = document.createElement("img");
    installButton.id = "install";
    installButton.src = InstallPng;
    installButton.onclick = () => deferredPrompt.prompt().then(hideInstallButton);
    document.body.appendChild(installButton);
}

function hideInstallButton(): void {
    if (!installButton)
        return;

    document.body.removeChild(installButton);
    installButton = null;
    deferredPrompt = null;
}

window.addEventListener("beforeinstallprompt", ev => {
    ev.preventDefault();
    deferredPrompt = ev;
    showInstallButton();
});

window.addEventListener("appinstalled", hideInstallButton);