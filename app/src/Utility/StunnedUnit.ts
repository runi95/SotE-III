export class StunnedUnit {
    private readonly unit: unit;
    private duration: number;

    constructor(unit: unit, duration: number) {
        this.unit = unit;
        this.duration = duration;
    }

    public GetUnit(): unit {
        return this.unit;
    }

    public AddDuration(duration: number): void {
        this.duration += duration;
    }

    public GetDuration(): number {
        return this.duration;
    }
}
