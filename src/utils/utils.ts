import Vector2 from "./Vector2";

export const intervalPerAnimationFrame = (callback: FrameRequestCallback): AnimationFrameProvider => (
        (window as any).requestAnimationFrame(callback) || (window as any).webkitRequestAnimationFrame(callback) ||
        (window as any).msRequestAnimationFrame(callback) || (window as any).mozRequestAnimationFrame(callback) ||
        window.setTimeout(callback, 1000 / 60)
);

export const getCanvasMousePos = (canvas: HTMLCanvasElement, x: number, y: number, expectedWidth: number, expectedHeight: number): Vector2 => {
    return new Vector2(x, y).subtract(canvas.offsetLeft, canvas.offsetTop).multiply(expectedWidth / canvas.offsetWidth, expectedHeight / canvas.offsetHeight);
};