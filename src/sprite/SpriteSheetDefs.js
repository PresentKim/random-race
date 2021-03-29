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

export const PngFiles = {
    pink_man: PinkManPng,
    mask_man: MaskManPng,
    ninja_frog: NinjaProgPng,
    virtual_guy: VirtualGuyPng
};
export const Animations = {
    main_character: {
        idle: new SpriteAnimation(null, MainCharacterAnimationJson.idle),
        run: new SpriteAnimation(null, MainCharacterAnimationJson.run),
        hit: new SpriteAnimation(null, MainCharacterAnimationJson.hit)
    }
};