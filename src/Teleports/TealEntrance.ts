import { SpawnTeleporter } from './SpawnTeleporter';

export class TealEntrance extends SpawnTeleporter {
    protected readonly playerId: number = 2;

    constructor() {
        super(Rect(8512, -10816, 8640, -10688), Rect(9696, -10784, 9760, -10720));
    }
}
