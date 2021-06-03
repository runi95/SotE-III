import { Buff } from '../Buff';
import { BuffTypes } from '../BuffTypes';
import { SpellCastUtils } from '../SpellCastUtils';

export class ChiMasterBuff extends Buff {
    private readonly buffedUnit: unit;
    private readonly spellCastUtils: SpellCastUtils;
    private buffEffect: effect | undefined;

    constructor(spellCastUtils: SpellCastUtils, buffedUnit: unit) {
        const tickDuration = 1;
        const initialDuration = 5;
        super(tickDuration, initialDuration);

        this.spellCastUtils = spellCastUtils;
        this.buffedUnit = buffedUnit;
    }

    public onInitialBuffApply(): void {
        this.buffEffect = AddSpecialEffectTarget('Abilities\\Spells\\NightElf\\Rejuvenation\\RejuvenationTarget.mdl', this.buffedUnit, 'chest');
    }

    public tick(): void {
        const tickHealAmount: number = 0.2 * (100 + 1.5 * this.spellCastUtils.GetIntelligence(this.buffedUnit));
        SetUnitLifeBJ(this.buffedUnit, GetUnitState(this.buffedUnit, UNIT_STATE_LIFE) + tickHealAmount);
    }

    public getBuffType(): BuffTypes {
        return BuffTypes.CHI_MASTER;
    }

    public stackBuff(): void {
        this.setDuration(5);
    }

    public clearBuff(): void {
        if (this.buffEffect !== undefined) {
            DestroyEffect(this.buffEffect);
        }
    }
}
