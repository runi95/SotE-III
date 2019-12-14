import { Boss } from '../Boss';

export class Necromancer extends Boss {
    protected readonly bossId: number = FourCC('n029');
    protected readonly x: number = -8390.0;
    protected readonly y: number = -13294.0;
    protected readonly angle: number = 0.0;
    protected readonly lootItemId: number = FourCC('I00B'); // Blue Soulstone

    constructor() {
        super(Rect(-8384, -13248, -8256, -13120));
    }
}
