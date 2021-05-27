import Sprite from "./Sprite";

export default class SpriteAnimation {
    public readonly frames: Array<Sprite>;
    public fps: number;

    constructor(frames: Array<Sprite> = [], fps: number = 20) {
        this.frames = frames;
        this.fps = fps;
    }

    getFrame(elapsedTime: number): Sprite | null {
        return this.frames[Math.floor(elapsedTime / 1000 * this.fps)] ?? null;
    }

    setFps(value: number): this {
        this.fps = value;
        return this;
    }
}
