import SpriteSheet from "../sprite/SpriteSheet";
import json from "./spritesheet.json";
import TextPng from "../../assets/sprite/ui/text.png";
import BackgroundPng from "../../assets/sprite/ui/background.png";

export const TextSpriteSheet = new SpriteSheet(TextPng, json.text);
export const BackgroundSpriteSheet = new SpriteSheet(BackgroundPng, json.background);
