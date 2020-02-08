import { Boss } from '../Boss';
import { RandomNumberGenerator } from '../../Utility/RandomNumberGenerator';

export class Banshee extends Boss {
    protected readonly bossId: number = FourCC('n02E');
    protected readonly x: number = 7521.0;
    protected readonly y: number = 14817.0;
    protected readonly angle: number = 265.0;
    protected readonly dropTable: number[] = [
        FourCC('I001'), // Vial of Magic (680)
        FourCC('I01G'), // Master Crystal Ball (1200)
        FourCC('I029'), // Mana Infused Mask (1680)
        FourCC('I01Q'), // Lightning Bolt (1850)
    ];

    constructor(randomNumberGenerator: RandomNumberGenerator) {
        super(Rect(7456, 14752, 7584, 14880), randomNumberGenerator);
    }
}
