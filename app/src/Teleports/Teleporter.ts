import { Trigger } from '../JassOverrides/Trigger';

export abstract class Teleporter {
    protected readonly entranceRegion: rect;
    protected readonly exitRegion: rect;
    protected trig: Trigger = new Trigger();

    protected constructor(entranceRegion: rect, exitRegion: rect) {
        this.exitRegion = exitRegion;
        this.entranceRegion = entranceRegion;

        this.trig.addAction(() => this.action());
        this.trig.registerEnterRectSimple(this.entranceRegion);
    }

    protected action(): void {
        SetUnitPosition(GetTriggerUnit(), GetRectCenterX(this.exitRegion), GetRectCenterY(this.exitRegion));
    }
}
