import { SpawnTeleporter } from './SpawnTeleporter';

export class RedEntrance extends SpawnTeleporter {
    protected readonly playerId: number = 0;

    constructor() {
        super(Rect(8512, 10176, 8640, 10304), Rect(9696, 10208, 9760, 10272));
    }
}
