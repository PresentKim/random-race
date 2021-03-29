import Sprite from "@/sprite/Sprite";
import SpriteAnimation from "@/sprite/SpriteAnimation";
import TextPng from "~/ui/text.png";
import TextJson from "~/ui/text.json";
import BackgroundPng from "~/ui/background.png";
import BackgroundJson from "~/ui/background.json";
import IconPng from "~/ui/icon.png";
import IconJson from "~/ui/icon.json";
import PinkManPng from "~/character/pink_man.png";
import MaskManPng from "~/character/mask_man.png";
import NinjaProgPng from "~/character/ninja_frog.png";
import VirtualGuyPng from "~/character/virtual_guy.png";
import MainCharacterAnimationJson from "~/character/main_character.animation.json";

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

export const TextSpriteSheet = loadSpriteSheet(TextPng, TextJson);
export const BackgroundSpriteSheet = loadSpriteSheet(BackgroundPng, BackgroundJson);
export const IconSpriteSheet = loadSpriteSheet(IconPng, IconJson);

export const Characters = new Map()
        .set("pink_man", PinkManPng)
        .set("mask_man", MaskManPng)
        .set("ninja_frog", NinjaProgPng)
        .set("virtual_guy", VirtualGuyPng)
export const Animations = {
    pink_man: {
        idle: new SpriteAnimation(Characters.get("pink_man"), MainCharacterAnimationJson.idle),
        run: new SpriteAnimation(Characters.get("pink_man"), MainCharacterAnimationJson.run),
        hit: new SpriteAnimation(Characters.get("pink_man"), MainCharacterAnimationJson.hit)
    }
};