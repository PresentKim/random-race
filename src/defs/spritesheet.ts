import {TextImage, BackgroundImage, IconImage, ButtonImage} from "./image";
import Sprite, {SpriteJson} from "@/sprite/Sprite";
import RandomMap from "@/utils/RandomMap";
import TextJson from "~/ui/text.json";
import BackgroundJson from "~/ui/background.json";
import IconJson from "~/ui/icon.json";
import ButtonJson from "~/ui/button.json";

export function loadSpriteSheet(image: string | HTMLImageElement, json: SpriteJson[]): RandomMap<string, Sprite> {
    const map = new RandomMap<string, Sprite>();
    json.forEach(json => {
        map.set(json.name ?? map.size + "", new Sprite(json).setImage(image));
    });
    return map;
}

export const TextSpriteSheet = loadSpriteSheet(TextImage, TextJson);
export const BackgroundSpriteSheet = loadSpriteSheet(BackgroundImage, BackgroundJson);
export const IconSpriteSheet = loadSpriteSheet(IconImage, IconJson);
export const ButtonSpriteSheet = loadSpriteSheet(ButtonImage, ButtonJson);