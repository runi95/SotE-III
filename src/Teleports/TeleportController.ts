import { RedEntrance } from './RedEntrance';
import { BlueEntrance } from './BlueEntrance';
import { TealEntrance } from './TealEntrance';
import { PurpleEntrance } from './PurpleEntrance';
import { YellowEntrance } from './YellowEntrance';
import { OrangeEntrance } from './OrangeEntrance';
import { SpawnTeleporter } from './SpawnTeleporter';

export class TeleportController {
    private readonly teleports: SpawnTeleporter[];

    constructor() {
        this.teleports = [
            new RedEntrance(),
            new BlueEntrance(),
            new TealEntrance(),
            new PurpleEntrance(),
            new YellowEntrance(),
            new OrangeEntrance(),
        ];
    }
}
