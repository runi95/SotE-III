import { SpawnTeleporter } from './SpawnTeleporter';

export class YellowEntrance extends SpawnTeleporter {
    protected readonly playerId: number = 4;

    constructor() {
        super(Rect(-2752, -320, -2624, -192), Rect(-3872, -288, -3808, -224));
    }
}
