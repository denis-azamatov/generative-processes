import { BaseSketch } from "./BaseSketch";

export default class Grid extends BaseSketch {
    protected main(p: import("p5")): void {
        p.windowResized = () => {
            p.resizeCanvas(window.innerWidth, window.innerHeight);
            p.background(0);
        };

        p.setup = () => {
            p.createCanvas(p.windowWidth, p.windowHeight);
            p.background(0);
            p.stroke(255);
            p.noFill();
        };

        p.draw = () => {
            const cellSize = p.width / 30;

            for (let x = 0; x < p.width; x += cellSize) {
                for (let y = 0; y < p.height; y += cellSize) {
                    p.rect(x, y, cellSize, cellSize);
                }
            }
        }
    }
}