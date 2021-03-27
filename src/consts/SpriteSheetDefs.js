import SpriteSheet from "@/sprite/SpriteSheet";
import json from "./spritesheet.json";
import TextPng from "~/ui/text.png";
import BackgroundPng from "~/ui/background.png";

export const TextSpriteSheet = new SpriteSheet(TextPng, json.text);
export const BackgroundSpriteSheet = new SpriteSheet(BackgroundPng, json.background);
