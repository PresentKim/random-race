import Sprite from "@/sprite/Sprite";
import {
    TextJson,
    BackgroundJson,
    IconJson
} from "@/defs/json";
import {TextImage, BackgroundImage, IconImage} from "@/defs/image";

/**
 * @param {string|HTMLImageElement} image
 * @param {object[]} spriteJsons
 */
export function loadSpriteSheet(image, spriteJsons) {
    const map = new Map();
    spriteJsons.forEach(json => {
        map.set(json.hasOwnProperty("name") ? json.name : map.size, Sprite.fromJson(json).setImage(image));
    });
    return map;
}

export const TextSpriteSheet = loadSpriteSheet(TextImage, TextJson);
export const BackgroundSpriteSheet = loadSpriteSheet(BackgroundImage, BackgroundJson);
export const IconSpriteSheet = loadSpriteSheet(IconImage, IconJson);