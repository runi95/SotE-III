import { Boss } from './Boss';
import { DruidOfTheClaw } from './DruidOfTheClaw';
import { RedDragon } from './RedDragon';

export class BossController {
    private readonly bosses: Boss[];

    constructor() {
        this.bosses = [new DruidOfTheClaw(), new RedDragon()];
    }
}
