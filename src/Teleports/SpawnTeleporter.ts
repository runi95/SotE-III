import { Teleporter } from './Teleporter';

export abstract class SpawnTeleporter extends Teleporter {
    protected abstract readonly playerId: number;

    protected constructor(entranceRegion: rect, exitRegion: rect) {
        super(entranceRegion, exitRegion);

        this.trig.addCondition(() => this.condition());
    }

    protected condition(): boolean {
        return GetPlayerId(GetOwningPlayer(GetTriggerUnit())) === this.playerId;
    }

    protected action(): void {
        super.action();
    }
}
