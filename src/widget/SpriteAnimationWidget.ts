import Widget from "./Widget";
import BoundingBox from "@/utils/BoundingBox";
import Vector2 from "@/utils/Vector2";
import RenderOption from "@/utils/RenderOption";
import SpriteAnimation from "@/sprite/SpriteAnimation";
import SpriteSheet from "@/sprite/SpriteSheet";
import Sprite from "@/sprite/Sprite";

export type AnimationEndHandler = (animation: SpriteAnimationWidget) => void;

export default class SpriteAnimationWidget extends Widget {
    public sheet: SpriteSheet | null;
    public animationName: string;
    public repeatCount: number;
    public playRate: number;
    public elapsedTime: number;
    public onAnimationEnd: AnimationEndHandler;

    constructor(pos: Vector2 | null, sheet: SpriteSheet | null = null, animationName: string = "", renderOption: RenderOption = new RenderOption()) {
        super(pos, renderOption);
        this.sheet = sheet;
        this.animationName = animationName;
        this.repeatCount = -1;
        this.playRate = 1;
        this.elapsedTime = 0;
        this.onAnimationEnd = () => {
        };
    }

    init(): void {
        this.onRender = ctx => {
            if (!this.animation)
                return;

            const currentFrame = this.getCurrentFrame();
            if (!currentFrame)
                return;

            currentFrame.draw(ctx, this.pos, this.getScale());
        };
    }

    update(elapsedTime: number) {
        this.elapsedTime += elapsedTime * this.playRate;
        super.update(elapsedTime);
    }

    getCurrentFrame(): Sprite | null {
        if (!this.animation?.getFrame(this.elapsedTime)) {
            this.elapsedTime = 0;
            if (this.repeatCount !== 0) {
                if (this.repeatCount !== -1) {
                    --this.repeatCount;
                }
            } else {
                if (this.onAnimationEnd) {
                    this.onAnimationEnd(this);
                    return null;
                }
            }
        }
        return this.animation?.getFrame(this.elapsedTime);
    }

    getBoundingBox(): BoundingBox | null {
        if (!this.animation)
            return null;

        const currentFrame = this.getCurrentFrame();
        if (!currentFrame)
            return null;

        return BoundingBox
                .from(new Vector2, Vector2.from(currentFrame.sw, currentFrame.sh).multiply(this.getScale()))
                .add(this.pos.add(Vector2.from(currentFrame.mx, currentFrame.my).multiply(this.getScale())));
    }

    setSheet(sheet: SpriteSheet | null): this {
        this.sheet = sheet;
        return this;
    }

    get animation(): SpriteAnimation | null {
        return this.sheet?.getAnimation(this.animationName);
    }

    setAnimationName(animationName: string): this {
        this.animationName = animationName;
        return this;
    }

    setRepeatCount(value: number): this {
        this.repeatCount = value;
        return this;
    }

    setPlayRate(value: number): this {
        this.playRate = value;
        return this;
    }

    setOnAnimationEnd(handler: AnimationEndHandler): this {
        this.onAnimationEnd = handler;
        return this;
    }

    reset(): this {
        this.elapsedTime = 0;
        return this;
    }
}
