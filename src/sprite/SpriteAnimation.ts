import Sprite, {ImageLike, SpriteJson} from "./Sprite";
import {Vector2Like} from "@/utils/Vector2";

export interface AnimationJson extends SpriteJson {
    fps: number;
    count: number
}

export type AnimationEndHandler = (animation: SpriteAnimation) => void;

export default class SpriteAnimation extends Sprite {
    public frames: Sprite[];
    public fps: number;
    public count: number;
    public loop: number;
    public elapsedSecs: number;
    public onAnimationEnd: AnimationEndHandler;

    constructor(image: ImageLike | null | undefined, json: AnimationJson) {
        const {fps, count} = json;
        super(json);
        this.fps = fps;
        this.frames = [];
        this.count = 0;
        this.loop = -1;
        this.elapsedSecs = 0;
        this.onAnimationEnd = () => {
        };

        this.setImage(image);
        for (let i = 0; i < count; ++i) {
            this.frames[i] = Sprite.from(this.w, this.h, this.sx + i * this.w, this.sy, this.ox, this.oy).setImage(image);
            ++this.count;
        }
    }

    setImage(image: string | HTMLImageElement | null | undefined): this {
        super.setImage(image);
        this.frames.forEach(frame => frame.setImage(image));
        return this;
    }

    getCurrentFrame(): Sprite | null {
        let frame = this.frames[Math.floor(this.elapsedSecs / this.fps)];
        if (!frame) {
            if (this.loop !== 0) {
                if (this.loop !== -1) {
                    --this.loop;
                }
                this.elapsedSecs = 0;
                frame = this.frames[0];
            } else {
                frame = this.frames[this.frames.length - 1];
                if (this.onAnimationEnd) {
                    this.onAnimationEnd(this);
                }
            }
        }
        return frame ?? null;
    }

    setFps(value: number = 60): this {
        this.fps = value;
        return this;
    }

    setLoop(value: number = -1): this {
        this.loop = value;
        return this;
    }

    setOnAnimationEnd(handler: AnimationEndHandler): this {
        this.onAnimationEnd = handler;
        return this;
    }

    /** @param {number} diffSecs */
    update(diffSecs: number): void {
        this.elapsedSecs += diffSecs;
    }

    draw(ctx: CanvasRenderingContext2D, vecObj: Vector2Like, scale: number = 1): void {
        const frame = this.getCurrentFrame();
        if (frame !== null) {
            frame.draw(ctx, vecObj, scale);
        }
    }

    reset(): void {
        this.elapsedSecs = 0;
    }

    clone(): SpriteAnimation {
        return new SpriteAnimation(this.getImage(), this);
    }
}
