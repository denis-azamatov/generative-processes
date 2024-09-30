import p5 from "p5";
import { BaseSketch } from "../BaseSketch";

export type WaveProps = {
    /** Amplitude of the wave in px. */
    amplitude: number;
    /** Frequency of the wave. Less than 1. */
    frequency: number;
    /** Phase of the wave. */
    phase?: number;
    /** Delta of the phase. */
    phaseDelta?: number;
    /** Custom wave function. */
    waveFunction?: WaveFunction;
};

export type WaveFunctionProps = {
    /** X position. */
    i: number;
    /** Amplitude of the wave in px. */
    amplitude: number;
    /** Frequency of the wave. Less than 1. */
    frequency: number;
    /** Phase of the wave. */
    phase: number;
    /** Delta of the phase. */
    phaseDelta: number;
};

export type WaveFunction = (p: p5, props: WaveFunctionProps) => number;

/**
 * Draws a wave.
 * @example
 * new Wave({ amplitude: 20, frequency: 0.2, phase: 0, phaseDelta: 10 }).run();
 */
export default class Wave extends BaseSketch {
    amplitude: number;
    frequency: number;
    phase: number;
    phaseDelta: number;
    waveFunction: WaveFunction;

    constructor(props: WaveProps) {
        super();

        this.amplitude = props.amplitude;
        this.frequency = props.frequency;
        this.phase = props.phase ?? 0;
        this.phaseDelta = props.phaseDelta ?? 1;

        this.waveFunction = props.waveFunction ?? this.sine;
    }

    sine(p: p5, props: WaveFunctionProps): number {
        return props.amplitude * p.sin(props.frequency * props.i + props.phase);
    }

    protected main(p: p5) {
        p.windowResized = () => {
            p.resizeCanvas(window.innerWidth, window.innerHeight);
            p.background("LightSkyBlue");
        };

        p.setup = () => {
            p.frameRate(60);
            p.createCanvas(window.innerWidth, window.innerHeight);
            p.background("LightSkyBlue");
        };

        p.draw = () => {
            p.background("LightSkyBlue");
            p.fill(255, 190);

            for (let i = 0; i < 100; i++) {
                const x = p.width / 100 * i;
                const y = this.waveFunction(p, { i, amplitude: this.amplitude, frequency: this.frequency, phase: this.phase, phaseDelta: this.phaseDelta }) + p.height / 2;
                p.circle(x, y, 50);
            }

            this.phase += this.phaseDelta * p.deltaTime / 1000;
        };
    }

}