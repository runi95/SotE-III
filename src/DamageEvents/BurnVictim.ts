import { DamageEvent } from '../DamageEngine/DamageEvent';
import { DamageEngineGlobals } from '../DamageEngine/DamageEngineGlobals';
import { TimerUtils } from '../Utility/TimerUtils';
import { Timer } from '../JassOverrides/Timer';
import { SpellCastUtils } from '../Utility/SpellCastUtils';
import * as settings from '../Game/GameSettings';

export class BurnVictim implements DamageEvent {
    private readonly abilityId: number = FourCC('A02I');
    private readonly dummyAbilityId: number = FourCC('A02J');
    private readonly timerUtils: TimerUtils;
    private readonly spellCastUtils: SpellCastUtils;

    constructor(timerUtils: TimerUtils, spellCastUtils: SpellCastUtils) {
        this.timerUtils = timerUtils;
        this.spellCastUtils = spellCastUtils;
    }

    public event(globals: DamageEngineGlobals): void {
        if (!globals.IsDamageSpell) {
            return;
        }

        if (globals.DamageEventDamageT === settings.DAMAGE_TYPE_UNIVERSAL) {
            return;
        }

        const trig: unit = globals.DamageEventSource as unit;
        const abilityLevel: number = GetUnitAbilityLevel(trig, this.abilityId);

        if (abilityLevel < 1) {
            return;
        }

        const targ: unit = globals.DamageEventTarget as unit;

        if (GetUnitAbilityLevel(targ, this.dummyAbilityId) === 1) {
            return;
        }

        UnitAddAbility(targ, this.dummyAbilityId);

        const intelligence: number = this.spellCastUtils.GetIntelligence(trig);
        const damage: number = 5 * abilityLevel + intelligence;

        let ticks = 5;
        const t: Timer = this.timerUtils.newTimer();
        t.start(1, true, () => {
            ticks--;

            UnitDamageTargetBJ(trig, targ, damage, ATTACK_TYPE_NORMAL, DAMAGE_TYPE_NORMAL);

            if (ticks <= 0) {
                UnitRemoveAbility(targ, this.dummyAbilityId);
                this.timerUtils.releaseTimer(t);
            }
        });
    }
}
