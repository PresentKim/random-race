import SpriteSheet from "@/sprite/SpriteSheet";
import SpriteAnimation from "@/sprite/SpriteAnimation";
import TextPng from "~/ui/text.png";
import TextJson from "~/ui/text.json";
import BackgroundPng from "~/ui/background.png";
import BackgroundJson from "~/ui/background.json";
import IconPng from "~/ui/icon.png";
import IconJson from "~/ui/icon.json";
import PinkManPng from "~/character/pinkman.png";
import MainCharacterAnimationJson from "~/character/main_character.animation.json";

export const TextSpriteSheet = new SpriteSheet(TextPng, TextJson);
export const BackgroundSpriteSheet = new SpriteSheet(BackgroundPng, BackgroundJson);
export const IconSpriteSheet = new SpriteSheet(IconPng, IconJson);

export const Characters = new Map()
        .set("pink_man", PinkManPng);
export const Animations = {
    pink_man: {
        idle: new SpriteAnimation(Characters.get("pink_man"), MainCharacterAnimationJson.idle),
        run: new SpriteAnimation(Characters.get("pink_man"), MainCharacterAnimationJson.run),
        hit: new SpriteAnimation(Characters.get("pink_man"), MainCharacterAnimationJson.hit)
    }
};