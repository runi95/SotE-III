import { SpawnTeleporter } from './SpawnTeleporter';

export class PurpleEntrance extends SpawnTeleporter {
    protected readonly playerId: number = 3;

    constructor() {
        super(Rect(-2752, 10176, -2624, 10304), Rect(-3872, 10208, -3808, 10272));
    }
}
