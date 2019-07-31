import { SpawnTeleporter } from './SpawnTeleporter';

export class TealEntrance extends SpawnTeleporter {
    protected readonly playerId: number = 2;

    constructor() {
        super(Rect(8544, -10784, 8608, -10720), Rect(9696, -10784, 9760, -10720));
    }
}
