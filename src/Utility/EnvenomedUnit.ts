export class EnvenomedUnit {
    private readonly unit: unit;
    private venom: number;

    constructor(unit: unit, venom: number) {
        this.unit = unit;
        this.venom = venom;
    }

    public getUnit(): unit {
        return this.unit;
    }

    public addVenom(venom: number): void {
        this.venom += venom;
    }

    public getVenom(): number {
        return this.venom;
    }

    public setVenom(venom: number): void {
        this.venom = venom;
    }
}
