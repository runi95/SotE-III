import { Spell } from './Spell';
import { TimerUtils } from '../Utility/TimerUtils';
import { Timer } from '../JassOverrides/Timer';
import { GroupInRange } from '../JassOverrides/GroupInRange';
import { SpellCastUtils } from '../Utility/SpellCastUtils';

export class GoblinMine extends Spell {
    protected readonly abilityId: number = FourCC('A02E');
    private readonly dummyUnitTypeId: number = FourCC('n018');
    private readonly timerUtils: TimerUtils;
    private readonly spellCastUtils: SpellCastUtils;

    constructor(timerUtils: TimerUtils, spellCastUtils: SpellCastUtils) {
        super();

        this.timerUtils = timerUtils;
        this.spellCastUtils = spellCastUtils;
    }

    protected action(): void {
        const trig: unit = GetTriggerUnit();
        const x: number = GetSpellTargetX();
        const y: number = GetSpellTargetY();
        const abilityLevel: number = GetUnitAbilityLevel(trig, this.abilityId);
        const intelligence: number = this.spellCastUtils.GetIntelligence(trig);
        const summon: unit = CreateUnit(GetOwningPlayer(trig), this.dummyUnitTypeId, x, y, bj_UNIT_FACING);
        const damage: number = 160 * abilityLevel + 2 * intelligence;

        const t: Timer = this.timerUtils.newTimer();
        t.start(2, false, () => {
            const loc: location = GetUnitLoc(summon);
            const grp: GroupInRange = new GroupInRange(300.0, loc);

            DestroyEffect(
                AddSpecialEffect('Objects\\Spawnmodels\\Human\\HCancelDeath\\HCancelDeath.mdl', GetUnitX(summon), GetUnitY(summon)),
            );
            DestroyEffect(AddSpecialEffect('Abilities\\Spells\\Human\\FlameStrike\\FlameStrike1.mdl', GetUnitX(summon), GetUnitY(summon)));

            grp.for((u: unit) => {
                if (IsUnitEnemy(u, GetOwningPlayer(trig)) && UnitAlive(u)) {
                    UnitDamageTargetBJ(trig, u, damage, ATTACK_TYPE_NORMAL, DAMAGE_TYPE_NORMAL);
                }
            });

            RemoveUnit(summon);
            RemoveLocation(loc);
            grp.destroy();

            this.timerUtils.releaseTimer(t);
        });
    }
}
