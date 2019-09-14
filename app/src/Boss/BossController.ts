import { Boss } from './Boss';
import { DruidOfTheClaw } from './DruidOfTheClaw';
import { RedDragon } from './RedDragon';
import { TimerUtils } from '../Utility/TimerUtils';
import { DoomGuard } from './DoomGuard';

export class BossController {
    private readonly bosses: Boss[];

    constructor(timerUtils: TimerUtils) {
        this.bosses = [new DruidOfTheClaw(), new RedDragon(), new DoomGuard(timerUtils)];
    }
}
