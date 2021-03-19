import SpriteSheet from "../sprite/SpriteSheet";
import json from "./spritesheet.json";

export const TextSpriteSheet = new SpriteSheet(json.text.texture, json.text.sprites);
export const BackgroundSpriteSheet = new SpriteSheet(json.background.texture, json.background.sprites);
