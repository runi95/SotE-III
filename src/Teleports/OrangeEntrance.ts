import { SpawnTeleporter } from './SpawnTeleporter';

export class OrangeEntrance extends SpawnTeleporter {
    protected readonly playerId: number = 5;

    constructor() {
        super(Rect(-2752, -10816, -2624, -10688), Rect(-3872, -10784, -3808, -10720));
    }
}
