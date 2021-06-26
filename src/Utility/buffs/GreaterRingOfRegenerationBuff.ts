import { Buff } from '../Buff';
import { BuffTypes } from '../BuffTypes';

export class GreaterRingOfRegenerationBuff extends Buff {
    private readonly buffedUnit: unit;

    constructor(buffedUnit: unit) {
        const tickDuration = 1;
        const initialDuration = 60;
        super(tickDuration, initialDuration);

        this.buffedUnit = buffedUnit;
    }

    public onInitialBuffApply(): void {
        // This function is intentionally left empty!
    }

    public tick(): void {
        SetUnitLifeBJ(this.buffedUnit, GetWidgetLife(this.buffedUnit) + 25);
    }

    public getBuffType(): BuffTypes {
        return BuffTypes.GREATER_RING_OF_REGENERATION;
    }

    public stackBuff(): void {
        this.setDuration(60);
    }

    public clearBuff(): void {
        // This function is intentionally left empty!
    }
}
