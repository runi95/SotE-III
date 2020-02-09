import { SpawnTeleporter } from './SpawnTeleporter';

export class BlueEntrance extends SpawnTeleporter {
    protected readonly playerId: number = 1;

    constructor() {
        super(Rect(8512, -320, 8640, -192), Rect(9696, -288, 9760, -224));
    }
}
