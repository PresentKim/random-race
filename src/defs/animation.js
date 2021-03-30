import SpriteAnimation from "@/sprite/SpriteAnimation";
import {CharacterImages, BlockImages} from "@/defs/image";
import {MainCharacterAnimationJson, CollectedItemJson} from "@/defs/json";

export const MainCharacterAnimation = {
    idle: image => new SpriteAnimation(image, MainCharacterAnimationJson.idle),
    run: image => new SpriteAnimation(image, MainCharacterAnimationJson.run),
    hit: image => new SpriteAnimation(image, MainCharacterAnimationJson.hit)
}

export const PinkMan = {
    idle: MainCharacterAnimation.idle(CharacterImages.PinkMan),
    run: MainCharacterAnimation.run(CharacterImages.PinkMan),
    hit: MainCharacterAnimation.hit(CharacterImages.PinkMan)
};
export const MaskMan = {
    idle: MainCharacterAnimation.idle(CharacterImages.MaskMan),
    run: MainCharacterAnimation.run(CharacterImages.MaskMan),
    hit: MainCharacterAnimation.hit(CharacterImages.MaskMan)
};
export const NinjaFrog = {
    idle: MainCharacterAnimation.idle(CharacterImages.NinjaFrog),
    run: MainCharacterAnimation.run(CharacterImages.NinjaFrog),
    hit: MainCharacterAnimation.hit(CharacterImages.NinjaFrog)
};
export const VirtualGuy = {
    idle: MainCharacterAnimation.idle(CharacterImages.VirtualGuy),
    run: MainCharacterAnimation.run(CharacterImages.VirtualGuy),
    hit: MainCharacterAnimation.hit(CharacterImages.VirtualGuy)
};

export const CollectedItem = new SpriteAnimation(BlockImages.CollectedItem, CollectedItemJson);