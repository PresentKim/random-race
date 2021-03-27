import App from '@/App';
import MainActivity from "@/activity/MainActivity";

//Init-game
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.createElement("canvas");
    canvas.width = 540;
    canvas.height = 540;
    canvas.id = "game";
    document.body.append(canvas);

    const app = new App(canvas);
    app.addActivity(new MainActivity());
    app.update();
});
