import { Spell } from './Spell';
import { TimerUtils } from '../Utility/TimerUtils';
import { Timer } from '../JassOverrides/Timer';
import { GroupInRange } from '../JassOverrides/GroupInRange';
import { SpellCastUtils } from '../Utility/SpellCastUtils';

export class Fireball extends Spell {
    protected readonly abilityId: number = FourCC('A01U');
    private readonly timerUtils: TimerUtils;
    private readonly spellCastUtils: SpellCastUtils;

    constructor(timerUtils: TimerUtils, spellCastUtils: SpellCastUtils) {
        super();

        this.timerUtils = timerUtils;
        this.spellCastUtils = spellCastUtils;
    }

    protected action(): void {
        const trig: unit = GetTriggerUnit();
        const intelligence: number = this.spellCastUtils.GetIntelligence(trig);
        const abilityLevel: number = GetUnitAbilityLevel(trig, this.abilityId);
        const damage: number = 200.0 * abilityLevel + 2.5 * intelligence;
        const loc: location = GetSpellTargetLoc();
        const eff: effect = AddSpecialEffectLoc('Abilities\\Spells\\Human\\FlameStrike\\FlameStrikeTarget.mdl', loc);

        const t: Timer = this.timerUtils.newTimer();
        t.start(2, false, () => {
            DestroyEffect(eff);
            DestroyEffect(AddSpecialEffectLocBJ(loc, 'Abilities\\Spells\\Other\\Doom\\DoomDeath.mdl'));
            const grp: GroupInRange = new GroupInRange(200.0, loc);

            grp.for((u: unit) => {
                if (IsUnitEnemy(u, GetOwningPlayer(trig))) {
                    UnitDamageTargetBJ(trig, u, damage, ATTACK_TYPE_MAGIC, DAMAGE_TYPE_MAGIC);
                }
            });

            RemoveLocation(loc);
            grp.destroy();

            this.timerUtils.releaseTimer(t);
        });
    }
}
