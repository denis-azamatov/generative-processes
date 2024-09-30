import p5 from "p5";
import { BaseSketch } from "../BaseSketch";

export default class Labrinth extends BaseSketch {
    protected main(p: p5): void {
        p.windowResized = () => {
            p.resizeCanvas(window.innerWidth, window.innerHeight);
            p.background(0);
            p.redraw();
        };

        p.setup = () => {
            p.createCanvas(p.windowWidth, p.windowHeight);
            p.background(0);
            p.stroke(255);
            p.noFill();
            p.noLoop();
        };

        p.draw = () => {
            p.background(0);

            this.drawRandomPattern(p);
        }
    }

    drawRandomPattern(p: p5) {
        const gridSize = 50;

        const choices: [() => void, number][] = [
            [pattern1, 4],
            [pattern2, 3],
            [pattern3, 2],
            [pattern4, 2]
        ];

        const raffle: (() => void)[] = [];

        choices.forEach(([pattern, weight]) => {
            for (let i = 0; i < weight; i++) {
                raffle.push(pattern);
            }
        });

        for (let x = 0; x < p.width; x += gridSize) {
            for (let y = 0; y < p.height; y += gridSize) {
                p.push();
                p.translate(x, y);
                p.random(raffle)();
                p.pop();
            }
        }

        function pattern1() {
            p.line(0, gridSize, gridSize, 0)
        }

        function pattern2() {
            p.line(0, 0, gridSize, gridSize)
        }

        function pattern3() {
            p.line(0, 0, gridSize / 2, gridSize / 2)
        }

        function pattern4() {
            p.line(0, gridSize, gridSize / 2, gridSize / 2)
        }
    }
}