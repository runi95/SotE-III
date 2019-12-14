import { Boss } from './Boss';
import { DruidOfTheClaw } from './Easy/DruidOfTheClaw';
import { RedDragon } from './Medium/RedDragon';
import { TimerUtils } from '../Utility/TimerUtils';
import { DoomGuard } from './Medium/DoomGuard';
import { Necromancer } from './Easy/Necromancer';
import { Hydra } from './Hard/Hydra';
import { IceSpider } from './Easy/IceSpider';

export class BossController {
    private readonly bosses: Boss[];

    constructor(timerUtils: TimerUtils) {
        this.bosses = [new DruidOfTheClaw(), new RedDragon(), new DoomGuard(timerUtils), new Necromancer(), new Hydra(), new IceSpider()];
    }
}
