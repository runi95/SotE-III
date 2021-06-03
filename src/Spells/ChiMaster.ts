import { Trigger } from '../JassOverrides/Trigger';
import { ChiMasterBuff } from '../Utility/buffs/ChiMasterBuff';
import { BuffUtils } from '../Utility/BuffUtils';
import { SpellCastUtils } from '../Utility/SpellCastUtils';

export class ChiMaster {
    private readonly unitTypeId: number = FourCC('N01Y');
    private readonly trig: Trigger = new Trigger();
    private readonly buffUtils: BuffUtils;
    private readonly spellCastUtils: SpellCastUtils;

    constructor(buffUtils: BuffUtils, spellCastUtils: SpellCastUtils) {
        this.buffUtils = buffUtils;
        this.spellCastUtils = spellCastUtils;

        this.trig.addCondition(() => this.condition());
        this.trig.addAction(() => this.action());
        this.trig.registerAnyUnitEventBJ(EVENT_PLAYER_UNIT_SPELL_EFFECT);
    }

    private condition(): boolean {
        return GetUnitTypeId(GetTriggerUnit()) === this.unitTypeId;
    }

    private action(): void {
        this.buffUtils.applyBuff(GetTriggerUnit(), new ChiMasterBuff(this.spellCastUtils, GetTriggerUnit()));
    }
}
