import RandomMap from "../utils/RandomMap";

import TextPng from "~/ui/text.png";
import BackgroundPng from "~/ui/background.png";
import IconPng from "~/ui/icon.png";

import PinkManPng from "~/character/pink_man.png";
import MaskManPng from "~/character/mask_man.png";
import NinjaFrogPng from "~/character/ninja_frog.png";
import VirtualGuyPng from "~/character/virtual_guy.png";

import CharacterAppearingPng from "~/particle/character_appearing.png";
import CollectedItemPng from "~/particle/collected_item.png";

export const TextImage = TextPng;
export const BackgroundImage = BackgroundPng;
export const IconImage = IconPng;
export const UiImages = {
    Text: TextImage,
    Background: BackgroundImage,
    Icon: IconImage
};

export const PinkManImage = PinkManPng;
export const MaskManImage = MaskManPng;
export const NinjaFrogImage = NinjaFrogPng;
export const VirtualGuyImage = VirtualGuyPng;
export const DefaultCharacterImages = new RandomMap<string, string>()
        .set("PinkMan", PinkManImage)
        .set("MaskMan", MaskManImage)
        .set("NinjaFrog", NinjaFrogImage)
        .set("VirtualGuy", VirtualGuyImage);

export const CharacterImages = new RandomMap<string, string>(DefaultCharacterImages.entries());
export const CharacterAppearingImage = CharacterAppearingPng;


export const CollectedItemImage = CollectedItemPng;
export const ParticleImages = new RandomMap<string, string>()
        .set("CharacterAppearing", CharacterAppearingImage)
        .set("CollectedItem", CollectedItemImage);