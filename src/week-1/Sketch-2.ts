import p5 from "p5";
import { BaseSketch } from "../BaseSketch";

export default class Spooky extends BaseSketch {
    protected main(p: p5): void {
        p.windowResized = () => {
            p.resizeCanvas(window.innerWidth, window.innerHeight);
            p.background(0);
        };

        p.setup = () => {
            p.frameRate(12);
            p.createCanvas(p.windowWidth, p.windowHeight);
            p.background(0);
            p.stroke(255);
            p.noFill();
        };

        p.draw = () => {
            p.background(0);

            this.drawParticles(p);
        }
    }

    drawParticles(p: p5) {
        const cellSize = p.map(p.width, 0, 1920, 10, 50);

        for (let x = 0; x < p.width; x += cellSize) {
            for (let y = 0; y < p.height; y += cellSize) {
                p.push();
                p.translate(x, y);
                p.translate(p.random(-cellSize / 2, cellSize / 2), p.random(-cellSize / 2, cellSize / 2));
                p.strokeWeight(p.random(1, 10));
                const distance = p.dist(p.width / 2, p.height / 2, x, y);
                const size = p.map(distance, 0, p.dist(0, 0, p.width / 2, p.height / 2), 0, cellSize);
                const alpha = p.map(distance, 0, p.dist(0, 0, p.width / 2, p.height / 2), 0, 255);
                p.stroke(255, alpha);
                p.rect(0, 0, size);
                p.pop();
            }
        }
    }
}