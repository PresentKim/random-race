import App from "@/App";
import MainActivity from "@/activity/MainActivity";

//Create canvas element and app instance
document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.createElement("canvas");
    canvas.id = "game";
    document.body.appendChild(canvas);

    const app = new App(canvas);
    app.addActivity(new MainActivity(app));
    app.update();
});