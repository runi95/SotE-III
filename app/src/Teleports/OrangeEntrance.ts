import { SpawnTeleporter } from './SpawnTeleporter';

export class OrangeEntrance extends SpawnTeleporter {
    protected readonly playerId: number = 5;

    constructor() {
        super(Rect(-2720, -10784, -2656, -10720), Rect(-3872, -10784, -3808, -10720));
    }
}
