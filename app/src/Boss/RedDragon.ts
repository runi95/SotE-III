import { Boss } from './Boss';

export class RedDragon extends Boss {
    protected readonly bossId: number = FourCC('n01Q');
    protected readonly x: number = 2268.00;
    protected readonly y: number = -15126.00;
    protected readonly angle: number = 0.00;
    protected readonly lootItemId: number | undefined = FourCC('I01B');

    constructor() {
        super(Rect(2208, -15200, 2336, -15072));
    }
}
