import App from '@/App';
import MainActivity from "@/activity/MainActivity";

//Init-game
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.createElement("canvas");
    canvas.width = 1024;
    canvas.height = 576;
    canvas.id = "game";
    document.body.append(canvas);

    const app = new App(canvas);
    app.addActivity(new MainActivity(app));
    app.update();
});
