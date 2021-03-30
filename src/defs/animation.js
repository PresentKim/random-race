import SpriteAnimation from "@/sprite/SpriteAnimation";
import {CharacterImages, ParticleImages} from "@/defs/image";
import {DefaultCharacterAnimationJson, CharacterAppearingJson, CollectedItemJson} from "@/defs/json";

export const DefaultCharacterAnimation = {
    idle: image => new SpriteAnimation(image, DefaultCharacterAnimationJson.idle),
    run: image => new SpriteAnimation(image, DefaultCharacterAnimationJson.run),
    hit: image => new SpriteAnimation(image, DefaultCharacterAnimationJson.hit)
}

export const CharacterAppearingAnimation = {
    in: () => new SpriteAnimation(ParticleImages.CharacterAppearing, CharacterAppearingJson.in),
    out: () => new SpriteAnimation(ParticleImages.CharacterAppearing, CharacterAppearingJson.out)
}
export const CollectedItemAnimation = new SpriteAnimation(ParticleImages.CollectedItem, CollectedItemJson);