import { Boss } from './Boss';

export class DruidOfTheClaw extends Boss {
    protected readonly bossId: number = FourCC('n015');
    protected readonly x: number = -578.00;
    protected readonly y: number = 14020.00;
    protected readonly angle: number = 265.00;

    constructor() {
        super(Rect(-608, 13984, -544, 14048));
    }
}
