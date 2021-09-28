import App from "@/App";
import SpriteManager from "@/sprite/SpriteManager";

//Create canvas element and app instance
document.addEventListener("DOMContentLoaded", () => {
    loadSpriteSheets().then(() => new App().update());
});

async function loadSpriteSheets() {
    const sheetPromises: Promise<any>[] = [
        Promise.all(["character", import("~/character.png"), import("~/character.json"), import("~/character.custom.json")]),
        Promise.all(["particle", import("~/particle.png"), import("~/particle.json"), import("~/particle.custom.json")]),
        Promise.all(["ui", import("~/ui.png"), import("~/ui.json"), import("~/ui.custom.json")])
    ];

    const count = sheetPromises.length;
    sheetPromises.forEach((promise, i) => {
        promise.then(([name, png, json, customJson]) => {
            console.log(`%c└────[${i + 1}/${count}] : %cGroup '${name}'`, "color: gray", "background: dimgray");
            SpriteManager.loadSheetGroup(name, png.default, json, customJson);
        });
    })
    return Promise.all(sheetPromises);
}