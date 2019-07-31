import { SpawnTeleporter } from './SpawnTeleporter';

export class PurpleEntrance extends SpawnTeleporter {
    protected readonly playerId: number = 3;

    constructor() {
        super(Rect(-2720, 10208, -2656, 10272), Rect(-3872, 10208, -3808, 10272));
    }
}
