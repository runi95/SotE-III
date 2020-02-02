import { Boss } from '../Boss';
import { RandomNumberGenerator } from '../../Utility/RandomNumberGenerator';

export class SpiritWindRider extends Boss {
    protected readonly bossId: number = FourCC('n02F');
    protected readonly x: number = -8898.0;
    protected readonly y: number = -3960.0;
    protected readonly angle: number = 0.0;

    constructor(randomNumberGenerator: RandomNumberGenerator) {
        super(Rect(-8960, -4032, -8832, -3904), randomNumberGenerator);
    }
}
