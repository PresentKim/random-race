import App from './App';
import MainActivity from "./activity/MainActivity";


//Init-game
document.addEventListener('DOMContentLoaded', () => {
    const app = new App(document.getElementById('game'));
    app.addActivity(new MainActivity());
    app.update();
});
