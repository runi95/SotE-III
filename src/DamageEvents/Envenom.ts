import { DamageEvent } from '../DamageEngine/DamageEvent';
import { DamageEngineGlobals } from '../DamageEngine/DamageEngineGlobals';
import { SpellCastUtils } from '../Utility/SpellCastUtils';
import * as settings from '../Game/GameSettings';

export class Envenom implements DamageEvent {
    private readonly spellCastUtils: SpellCastUtils;
    private readonly abilityId: number = FourCC('A017');
    private readonly envenomAbilityId: number = FourCC('A010');

    constructor(spellCastUtils: SpellCastUtils) {
        this.spellCastUtils = spellCastUtils;
    }

    public event(globals: DamageEngineGlobals): void {
        if (globals.IsDamageSpell) {
            return;
        }

        if (globals.DamageEventDamageT === settings.DAMAGE_TYPE_UNIVERSAL) {
            return;
        }

        const abilityLevel: number = GetUnitAbilityLevel(globals.DamageEventSource as unit, this.abilityId);

        if (abilityLevel > 0) {
            globals.DamageEventAmount +=
                24 * GetUnitAbilityLevel(globals.DamageEventSource as unit, this.envenomAbilityId) +
                this.spellCastUtils.GetIntelligence(globals.DamageEventSource as unit);
            if (abilityLevel > 1) {
                DecUnitAbilityLevel(globals.DamageEventSource as unit, this.abilityId);
            } else {
                UnitRemoveAbility(globals.DamageEventSource as unit, this.abilityId);
            }
        }
    }
}
