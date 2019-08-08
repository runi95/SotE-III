import { Point } from './Point';

export class Region {
    public readonly minX: number;
    public readonly maxX: number;
    public readonly minY: number;
    public readonly maxY: number;

    constructor(minX: number, maxX: number, minY: number, maxY: number) {
        this.minX = minX;
        this.maxX = maxX;
        this.minY = minY;
        this.maxY = maxY;
    }

    public GetCenter(): Point {
        return new Point((this.minX + this.maxX) / 2, (this.minY + this.maxY) / 2);
    }
}
