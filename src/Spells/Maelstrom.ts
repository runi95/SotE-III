import { Spell } from './Spell';
import { TimerUtils } from '../Utility/TimerUtils';
import { Timer } from '../JassOverrides/Timer';
import { GroupInRange } from '../JassOverrides/GroupInRange';
import { SpellCastUtils } from '../Utility/SpellCastUtils';
import { DamageEngineGlobals } from '../DamageEngine/DamageEngineGlobals';

export class Maelstrom extends Spell {
    protected readonly abilityId: number = FourCC('A001');
    private readonly dummyUnitId: number = FourCC('n001');
    private readonly dummyAbilityId: number = FourCC('A002');
    private readonly timerUtils: TimerUtils;
    private readonly spellCastUtils: SpellCastUtils;
    private readonly damageEngineGlobals: DamageEngineGlobals;

    constructor(timerUtils: TimerUtils, spellCastUtils: SpellCastUtils, damageEngineGlobals: DamageEngineGlobals) {
        super();

        this.timerUtils = timerUtils;
        this.spellCastUtils = spellCastUtils;
        this.damageEngineGlobals = damageEngineGlobals;
    }

    protected action(): void {
        const trig: unit = GetTriggerUnit();
        const x: number = GetSpellTargetX();
        const y: number = GetSpellTargetY();
        const damage: number = 2.50 * GetUnitAbilityLevel(trig, this.abilityId) + 0.05 * this.spellCastUtils.GetIntelligence(trig);
        const specialEffect: effect = AddSpecialEffect('war3mapImported\\Whirlpool.mdl', x, y);
        const dummy: unit = CreateUnit(GetOwningPlayer(GetTriggerUnit()), this.dummyUnitId, x, y, 0);
        UnitAddAbility(dummy, this.dummyAbilityId);
        const trigOwner: player = GetOwningPlayer(trig);
        const loc: location = Location(x, y);

        let ticks = 100;
        const t: Timer = this.timerUtils.newTimer();
        t.start(0.05, true, () => {
            ticks--;

            const grp: GroupInRange = new GroupInRange(500.00, loc);
            grp.for((u: unit) => {
                if (IsUnitEnemy(u, trigOwner) && UnitAlive(u)) {
                    this.damageEngineGlobals.NextDefensiveReduction = 0.95;
                    UnitDamageTargetBJ(trig, u, damage, ATTACK_TYPE_NORMAL, DAMAGE_TYPE_NORMAL);
                }
            });
            grp.destroy();

            if (ticks <= 0) {
                DestroyEffect(specialEffect);
                RemoveUnit(dummy);
                RemoveLocation(loc);
                this.timerUtils.releaseTimer(t);
            }
        });
    }
}
