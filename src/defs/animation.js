import SpriteAnimation from "@/sprite/SpriteAnimation";
import {CharacterImages, ParticleImages} from "@/defs/image";
import {DefaultCharacterAnimationJson, CollectedItemJson} from "@/defs/json";

export const DefaultCharacterAnimation = {
    idle: image => new SpriteAnimation(image, DefaultCharacterAnimationJson.idle),
    run: image => new SpriteAnimation(image, DefaultCharacterAnimationJson.run),
    hit: image => new SpriteAnimation(image, DefaultCharacterAnimationJson.hit)
}

export const PinkMan = {
    idle: DefaultCharacterAnimation.idle(CharacterImages.PinkMan),
    run: DefaultCharacterAnimation.run(CharacterImages.PinkMan),
    hit: DefaultCharacterAnimation.hit(CharacterImages.PinkMan)
};
export const MaskMan = {
    idle: DefaultCharacterAnimation.idle(CharacterImages.MaskMan),
    run: DefaultCharacterAnimation.run(CharacterImages.MaskMan),
    hit: DefaultCharacterAnimation.hit(CharacterImages.MaskMan)
};
export const NinjaFrog = {
    idle: DefaultCharacterAnimation.idle(CharacterImages.NinjaFrog),
    run: DefaultCharacterAnimation.run(CharacterImages.NinjaFrog),
    hit: DefaultCharacterAnimation.hit(CharacterImages.NinjaFrog)
};
export const VirtualGuy = {
    idle: DefaultCharacterAnimation.idle(CharacterImages.VirtualGuy),
    run: DefaultCharacterAnimation.run(CharacterImages.VirtualGuy),
    hit: DefaultCharacterAnimation.hit(CharacterImages.VirtualGuy)
};

export const CollectedItem = new SpriteAnimation(ParticleImages.CollectedItem, CollectedItemJson);