import p5 from "p5";

/**
 * Base class for Sketches.
 */
export abstract class BaseSketch {
    protected abstract main(p: p5): void;

    run() {
        return new p5((p) => this.main(p));
    }
}