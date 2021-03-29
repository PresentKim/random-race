import SpriteSheet from "@/sprite/SpriteSheet";
import SpriteAnimation from "@/sprite/SpriteAnimation";
import TextPng from "~/ui/text.png";
import TextJson from "~/ui/text.json";
import BackgroundPng from "~/ui/background.png";
import BackgroundJson from "~/ui/background.json";
import IconPng from "~/ui/icon.png";
import IconJson from "~/ui/icon.json";
import PinkManIdlePng from "~/character/pink_man/idle.png";
import PinkManIdleJson from "~/character/pink_man/idle.json";
import PinkManRunPng from "~/character/pink_man/run.png";
import PinkManRunJson from "~/character/pink_man/run.json";

export const TextSpriteSheet = new SpriteSheet(TextPng, TextJson);
export const BackgroundSpriteSheet = new SpriteSheet(BackgroundPng, BackgroundJson);
export const IconSpriteSheet = new SpriteSheet(IconPng, IconJson);
export const Characters = {
    pink_man: {
        idle: new SpriteSheet(PinkManIdlePng, PinkManIdleJson),
        run: new SpriteSheet(PinkManRunPng, PinkManRunJson)
    }
};
export const Animations = {
    pink_man: {
        idle: new SpriteAnimation(Characters.pink_man.idle.sprites),
        run: new SpriteAnimation(Characters.pink_man.run.sprites)
    }
};