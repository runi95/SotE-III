import { SpawnTeleporter } from './SpawnTeleporter';

export class RedEntrance extends SpawnTeleporter {
    protected readonly playerId: number = 0;

    constructor() {
        super(Rect(8544, 10208, 8608, 10272), Rect(9696, 10208, 9760, 10272));
    }
}
