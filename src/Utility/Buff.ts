import { BuffTypes } from './BuffTypes';

export abstract class Buff {
    public readonly tickTimeout: number;
    private duration: number;

    constructor(tickTimeout: number, duration: number) {
        this.tickTimeout = tickTimeout;
        this.duration = duration;
    }

    public abstract onInitialBuffApply(): void;
    public abstract tick(): void;
    public abstract getBuffType(): BuffTypes;
    public abstract stackBuff(buff: this): void;
    public abstract clearBuff(): void;

    public getDuration(): number {
        return this.duration;
    }

    public addDuration(duration: number): void {
        this.duration += duration;
    }

    public setDuration(duration: number): void {
        this.duration = duration;
    }
}
