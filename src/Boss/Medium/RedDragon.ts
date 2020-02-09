import { Boss } from '../Boss';
import { RandomNumberGenerator } from '../../Utility/RandomNumberGenerator';

export class RedDragon extends Boss {
    protected readonly bossId: number = FourCC('n01Q');
    protected readonly x: number = 2268.0;
    protected readonly y: number = -15126.0;
    protected readonly angle: number = 0.0;
    protected readonly dropTable: number[] = [FourCC('I01B')]; // Dragon Egg (4644)

    constructor(randomNumberGenerator: RandomNumberGenerator) {
        super(Rect(2208, -15200, 2336, -15072), randomNumberGenerator);
    }
}
