import SpriteSheet from "@/sprite/SpriteSheet";
import TextPng from "~/ui/text.png";
import TextJson from "~/ui/text.json";
import BackgroundPng from "~/ui/background.png";
import BackgroundJson from "~/ui/background.json";
import IconPng from "~/ui/icon.png";
import IconJson from "~/ui/icon.json";

export const TextSpriteSheet = new SpriteSheet(TextPng, TextJson);
export const BackgroundSpriteSheet = new SpriteSheet(BackgroundPng, BackgroundJson);
export const IconSpriteSheet = new SpriteSheet(IconPng, IconJson);
