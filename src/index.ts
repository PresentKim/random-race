import App from "@/App";
import MainActivity from "@/activity/MainActivity";
import SpriteManager from "@/sprite/SpriteManager";
import {SpriteData} from "@/sprite/Sprite";

//Create canvas element and app instance
document.addEventListener("DOMContentLoaded", async () => {
    await loadSpriteSheets();

    const canvas = document.createElement("canvas");
    canvas.id = "game";
    document.body.appendChild(canvas);

    const app = new App(canvas);
    app.addActivity(new MainActivity(app));
    app.update();
});

async function loadSpriteSheets() {
    const sheetEntries = Object.entries({
        "character/angry_pig": [import("~/character/angry_pig.png"), import("~/character/angry_pig.json")],
        "character/bat": [import("~/character/bat.png"), import("~/character/bat.json")],
        "character/bee": [import("~/character/bee.png"), import("~/character/bee.json")],
        "character/blue_bird": [import("~/character/blue_bird.png"), import("~/character/blue_bird.json")],
        "character/bunny": [import("~/character/bunny.png"), import("~/character/bunny.json")],
        "character/chameleon": [import("~/character/chameleon.png"), import("~/character/chameleon.json")],
        "character/chicken": [import("~/character/chicken.png"), import("~/character/chicken.json")],
        "character/ghost": [import("~/character/ghost.png"), import("~/character/ghost.json")],
        "character/mask_man": [import("~/character/mask_man.png"), import("~/character/mask_man.json")],
        "character/mushroom": [import("~/character/mushroom.png"), import("~/character/mushroom.json")],
        "character/ninja_frog": [import("~/character/ninja_frog.png"), import("~/character/ninja_frog.json")],
        "character/pink_man": [import("~/character/pink_man.png"), import("~/character/pink_man.json")],
        "character/radish": [import("~/character/radish.png"), import("~/character/radish.json")],
        "character/rino": [import("~/character/rino.png"), import("~/character/rino.json")],
        "character/rock1": [import("~/character/rock1.png"), import("~/character/rock1.json")],
        "character/rock2": [import("~/character/rock2.png"), import("~/character/rock2.json")],
        "character/rock3": [import("~/character/rock3.png"), import("~/character/rock3.json")],
        "character/skull": [import("~/character/skull.png"), import("~/character/skull.json")],
        "character/slime": [import("~/character/slime.png"), import("~/character/slime.json")],
        "character/snail": [import("../assets/sprite/character/snail.png"), import("../assets/sprite/character/snail.json")],
        "character/trunk": [import("~/character/trunk.png"), import("~/character/trunk.json")],
        "character/virtual_guy": [import("~/character/virtual_guy.png"), import("~/character/virtual_guy.json")],
        "particle/character_particle": [import("~/particle/character_particle.png"), import("~/particle/character_particle.json")],
        "particle/collect_particle": [import("~/particle/collect_particle.png"), import("~/particle/collect_particle.json")],
        "ui/background": [import("~/ui/background.png"), import("~/ui/background.json")],
        "ui/button": [import("~/ui/button.png"), import("~/ui/button.json")],
        "ui/icon": [import("~/ui/icon.png"), import("~/ui/icon.json")],
        "ui/level": [import("~/ui/level.png"), import("~/ui/level.json")],
        "ui/text": [import("~/ui/text.png"), import("~/ui/text.json")]
    });

    console.log(`Load sprite sheets`);
    const count = sheetEntries.length;
    for (let i = 0; i < count; ++i) {
        const [sheetName, promises] = sheetEntries[i];
        const [pngPromise, jsonPromise] = promises;
        const png = (await pngPromise as { default: string }).default;
        const json = (await jsonPromise as { default: object }).default;

        console.log(`\t...[${i}/${count}] : ${sheetName}`);
        SpriteManager.loadSheet(sheetName, png, new Map<string, SpriteData>(Object.entries(json)));
    }
    console.log("Loaded all sprite sheets");
}