import { Boss } from './Boss';
import { DruidOfTheClaw } from './DruidOfTheClaw';

export class BossController {
    private readonly bosses: Boss[];

    constructor() {
        this.bosses = [
            new DruidOfTheClaw(),
        ];
    }
}
