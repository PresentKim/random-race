import Vector2 from "./Vector2";

export const requestAnimationFrame = (window.requestAnimationFrame || window.webkitRequestAnimationFrame || (callback => window.setTimeout(callback, 1000 / 60))).bind(window);

export const getCanvasMousePos = (canvas: HTMLCanvasElement, x: number, y: number, expectedWidth: number): Vector2 => {
    return new Vector2(x, y).subtract(canvas.offsetLeft, canvas.offsetTop).multiply(expectedWidth / canvas.offsetWidth);
};