import Sprite from "./Sprite";

export default class SpriteAnimation {
    public readonly frames: Array<Sprite>;
    public fps: number;

    constructor(frames: Array<Sprite> = [], fps: number = 60) {
        this.frames = frames;
        this.fps = fps;
    }

    getFrame(elapsedSecs: number): Sprite | null {
        return this.frames[Math.floor(elapsedSecs / this.fps)] ?? null;
    }

    setFps(value: number): this {
        this.fps = value;
        return this;
    }
}
