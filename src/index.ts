import App from "@/App";
import MainActivity from "@/activity/MainActivity";
import FullScreen from "@/utils/FullScreen";

const canvas = document.createElement("canvas");
canvas.id = "game";
const app = new App(canvas);

const widthMin = 1080 * 16 / 9; //ratio 9:16 (Galaxy 4~)
const widthMax = 1080 * 21 / 9; //ratio 9:21 (~Galaxy Fold)
function resizingCanvas() {
    const beforeWidth = canvas.width;
    canvas.width = Math.min(widthMax, Math.max(widthMin, window.innerWidth / window.innerHeight * 1080));
    canvas.height = 1080;

    if (beforeWidth !== canvas.width) {
        app.activities.forEach(activity => activity.relocation(beforeWidth / canvas.width));
    }
}

//Init-game
document.addEventListener("DOMContentLoaded", () => {
    resizingCanvas();
    document.body.appendChild(canvas);
    app.addActivity(new MainActivity(app));
    app.update();
});

window.addEventListener("resize", resizingCanvas);
window.addEventListener("orientationchange", resizingCanvas);

//Force orientation to "landscape" when full-screen enabled
if (FullScreen.isSupport && window.screen && screen.orientation && screen.orientation.lock) {
    FullScreen.onChange(() => {
        if (!FullScreen.isEnabled || window.innerWidth > window.innerHeight)
            return;

        const orientation = screen.orientation.type;
        if (orientation !== "portrait-primary" && orientation !== "portrait-secondary")
            return;

        screen.orientation.lock("landscape");
    });
}

if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => navigator.serviceWorker.register("/sw.js"));
}