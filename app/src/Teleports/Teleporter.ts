import { Trigger } from '../JassOverrides/Trigger';

export abstract class Teleporter {
    protected abstract readonly entranceRegion: rect;
    protected abstract readonly exitRegion: rect;
    protected trig: Trigger = new Trigger();

    protected constructor() {
        this.trig.AddAction(() => this.action());
        this.trig.RegisterEnterRectSimple(this.getEntranceRegion());
    }

    protected getEntranceRegion(): rect {
        return this.entranceRegion;
    }

    protected action(): void {
        SetUnitPosition(GetTriggerUnit(), GetRectCenterX(this.exitRegion), GetRectCenterY(this.exitRegion));
    }
}
