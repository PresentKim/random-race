import {ParticleImages} from "./image";
import {ImageLike} from "@/sprite/Sprite";
import SpriteAnimation from "@/sprite/SpriteAnimation";
import DefaultCharacterAnimationJson from "~/character/default_character.animation.json";
import CollectedItemJson from "~/particle/collected_item.json";
import CharacterAppearingJson from "~/particle/character_appearing.json";

export const DefaultCharacterAnimation = {
    idle: (image: ImageLike | null | undefined) => new SpriteAnimation(image ?? null, DefaultCharacterAnimationJson.idle),
    run: (image: ImageLike | null | undefined) => new SpriteAnimation(image ?? null, DefaultCharacterAnimationJson.run),
    hit: (image: ImageLike | null | undefined) => new SpriteAnimation(image ?? null, DefaultCharacterAnimationJson.hit)
}

export const CharacterAppearingAnimation = {
    in: () => new SpriteAnimation(ParticleImages.get("CharacterAppearing"), CharacterAppearingJson.in),
    out: () => new SpriteAnimation(ParticleImages.get("CharacterAppearing"), CharacterAppearingJson.out)
}
export const CollectedItemAnimation = new SpriteAnimation(ParticleImages.get("CollectedItem"), CollectedItemJson);