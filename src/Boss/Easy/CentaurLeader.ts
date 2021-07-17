import { Boss } from '../Boss';
import { RandomNumberGenerator } from '../../Utility/RandomNumberGenerator';

export class CentaurLeader extends Boss {
    protected readonly bossId: number = FourCC('n02D');
    protected readonly x: number = 14654.0;
    protected readonly y: number = 14658.0;
    protected readonly angle: number = 235.0;
    protected readonly dropTable: number[] = [
        FourCC('I02S'), // Gold Coins (525)
        FourCC('I02T'), // Gold Coins (625)
        FourCC('I02R'), // Gold Coins (675)
        FourCC('I02Q'), // Gold Coins (725)
        FourCC('I02P'), // Gold Coins (825)
    ];

    constructor(randomNumberGenerator: RandomNumberGenerator) {
        super(Rect(14624, 14624, 14688, 14688), randomNumberGenerator);
    }
}
