import App from "@/App";
import MainActivity from "@/activity/MainActivity";

const canvas = document.createElement("canvas");
canvas.id = "game";
const app = new App(canvas);
app.addActivity(new MainActivity(app));

const widthMin = 1080 * 16 / 9; //ratio 9:16 (Galaxy 4~)
const widthMax = 1080 * 21 / 9; //ratio 9:21 (~Galaxy Fold)
function resizingCanvas() {
    const beforeWidth = canvas.width;
    canvas.width = Math.min(widthMax, Math.max(widthMin, window.innerWidth / window.innerHeight * 1080));
    canvas.height = 1080;
}

//Init-game
document.addEventListener("DOMContentLoaded", () => {
    resizingCanvas();
    document.body.append(canvas);

    app.update();
});

window.addEventListener("resize", resizingCanvas);
window.addEventListener("orientationchange", resizingCanvas);