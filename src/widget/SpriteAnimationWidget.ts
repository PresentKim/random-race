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
    public elapsedSecs: number;
    public onAnimationEnd: AnimationEndHandler;

    constructor(pos: Vector2 | null, sheet: SpriteSheet | null = null, animationName: string = "", renderOption: RenderOption = new RenderOption()) {
        super(pos, renderOption);
        this.sheet = sheet;
        this.animationName = animationName;
        this.repeatCount = -1;
        this.playRate = 1;
        this.elapsedSecs = 0;
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

            const deltaVec = Vector2.from(currentFrame).multiply(this.getScale() / 2);
            currentFrame.draw(ctx, this.pos.subtract(deltaVec.divide(2)), this.getScale());
        };
    }

    update(diffSecs: number) {
        this.elapsedSecs += diffSecs * this.playRate;
        super.update(diffSecs);
    }

    getCurrentFrame(): Sprite | null {
        if (!this.animation?.getFrame(this.elapsedSecs)) {
            this.elapsedSecs = 0;
            if (this.repeatCount !== 0) {
                if (this.repeatCount !== -1) {
                    --this.repeatCount;
                }
            } else {
                if (this.onAnimationEnd) {
                    this.onAnimationEnd(this);
                }
            }
        }
        return this.animation?.getFrame(this.elapsedSecs);
    }

    getBoundingBox(): BoundingBox | null {
        if (!this.animation)
            return null;

        const currentFrame = this.getCurrentFrame();
        if (!currentFrame)
            return null;

        const deltaVec = Vector2.from(currentFrame).multiply(this.getScale() / 2);
        return BoundingBox.from(this.pos).expand(deltaVec);
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
        this.elapsedSecs = 0;
        return this;
    }
}
