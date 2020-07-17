export class EnvenomedUnit {
    private readonly unit: unit;
    private duration: number;
    private venom: number;

    constructor(unit: unit, duration: number, venom: number) {
        this.unit = unit;
        this.duration = duration;
        this.venom = venom;
    }

    public getUnit(): unit {
        return this.unit;
    }

    public addVenom(venom: number): void {
        this.venom += venom;
    }

    public addDuration(duration: number): void {
        this.duration += duration;
    }

    public getVenom(): number {
        return this.venom;
    }

    public getDuration(): number {
        return this.duration;
    }

    public setVenom(venom: number): void {
        this.venom = venom;
    }

    public setDuration(duration: number): void {
        this.duration = duration;
    }
}
