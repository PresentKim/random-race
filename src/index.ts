import App from "@/App";
import SpriteManager, {CustomDataset, GroupDataset} from "@/sprite/SpriteManager";

//Create canvas element and app instance
document.addEventListener("DOMContentLoaded", async () => {
    await loadSpriteSheets();

    new App().update();
});

async function loadSpriteSheets() {
    const sheetEntries = Object.entries({
        "character": [import("~/character.png"), import("~/character.json"), import("~/character.custom.json")],
        "particle": [import("~/particle.png"), import("~/particle.json"), import("~/particle.custom.json")],
        "ui": [import("~/ui.png"), import("~/ui.json"), import("~/ui.custom.json")]
    });

    console.log(`[Load sprites] start`);
    const count = sheetEntries.length;
    for (let i = 0; i < count; ++i) {
        const [sheetName, promises] = sheetEntries[i];
        const [pngPromise, jsonPromise, customJsonPromise] = promises;
        const png = (await pngPromise as { default: string }).default;
        const json = (await jsonPromise as { default: GroupDataset }).default;
        const customJson = (await customJsonPromise as { default: CustomDataset }).default;

        console.log(`%c└────[${i + 1}/${count}] : %cGroup '${sheetName}'`, "color: gray", "background: dimgray");
        SpriteManager.loadSheetGroup(sheetName, png, json, customJson);
    }
    console.log(SpriteManager);
    console.log(`[Load sprites] done`);
}