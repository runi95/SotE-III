import { Boss } from '../Boss';

export class IceSpider extends Boss {
    protected readonly bossId: number = FourCC('n02C');
    protected readonly x: number = 14169.0;
    protected readonly y: number = 579.0;
    protected readonly angle: number = 280.0;
    protected readonly lootItemId: number = FourCC('I00C'); // Purple Soulstone

    constructor() {
        super(Rect(14208, 384, 14336, 512));
    }
}
