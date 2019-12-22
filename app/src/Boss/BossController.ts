import { Boss } from './Boss';
import { DruidOfTheClaw } from './Easy/DruidOfTheClaw';
import { RedDragon } from './Medium/RedDragon';
import { TimerUtils } from '../Utility/TimerUtils';
import { DoomGuard } from './Medium/DoomGuard';
import { Necromancer } from './Easy/Necromancer';
import { Hydra } from './Hard/Hydra';
import { IceSpider } from './Easy/IceSpider';
import { RandomNumberGenerator } from '../Utility/RandomNumberGenerator';

export class BossController {
    private readonly bosses: Boss[];

    constructor(timerUtils: TimerUtils, randomNumberGenerator: RandomNumberGenerator) {
        this.bosses = [new DruidOfTheClaw(), new RedDragon(), new DoomGuard(timerUtils), new Necromancer(), new Hydra(), new IceSpider(timerUtils, randomNumberGenerator)];
    }
}
