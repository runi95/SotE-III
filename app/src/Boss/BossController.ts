import { Boss } from './Boss';
import { CentaurLeader } from './Easy/CentaurLeader';
import { DruidOfTheClaw } from './Easy/DruidOfTheClaw';
import { RedDragon } from './Medium/RedDragon';
import { TimerUtils } from '../Utility/TimerUtils';
import { DoomGuard } from './Medium/DoomGuard';
import { Banshee } from './Medium/Banshee';
import { Necromancer } from './Easy/Necromancer';
import { Hydra } from './Hard/Hydra';
import { SpiritWindRider } from './Hard/SpiritWindRider';
import { IceSpider } from './Easy/IceSpider';
import { RandomNumberGenerator } from '../Utility/RandomNumberGenerator';
import { Chaplain } from './Hard/Chaplain';
import { InfernalJuggernaut } from './Hard/InfernalJuggernaut';

export class BossController {
    private readonly bosses: Boss[];

    constructor(timerUtils: TimerUtils, randomNumberGenerator: RandomNumberGenerator) {
        this.bosses = [
            // Easy
            new CentaurLeader(randomNumberGenerator),
            new DruidOfTheClaw(randomNumberGenerator),
            new IceSpider(timerUtils, randomNumberGenerator),
            new Necromancer(randomNumberGenerator),
            // Medium
            new DoomGuard(timerUtils, randomNumberGenerator),
            new RedDragon(randomNumberGenerator),
            new Banshee(randomNumberGenerator),
            // Hard
            new Hydra(randomNumberGenerator),
            new SpiritWindRider(randomNumberGenerator),
            new Chaplain(randomNumberGenerator),
            new InfernalJuggernaut(timerUtils, randomNumberGenerator),
        ];
    }
}
