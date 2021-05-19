import { Spell } from './Spell';
import { TimerUtils } from '../Utility/TimerUtils';
import { Timer } from '../JassOverrides/Timer';
import { GroupInRange } from '../JassOverrides/GroupInRange';
import { SpellCastUtils } from '../Utility/SpellCastUtils';

export class Maelstrom extends Spell {
    protected readonly abilityId: number = FourCC('A001');
    private readonly dummyUnitId: number = FourCC('n002');
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
        const damage: number = 2.50 * GetUnitAbilityLevel(trig, this.abilityId) + 0.05 * this.spellCastUtils.GetIntelligence(trig);
        const dummy: unit = CreateUnit(GetOwningPlayer(GetTriggerUnit()), this.dummyUnitId, x, y, 0);
        const trigOwner: player = GetOwningPlayer(trig);
        const loc: location = GetUnitLoc(dummy);

        let ticks = 100;
        const t: Timer = this.timerUtils.newTimer();
        t.start(0.05, true, () => {
            ticks--;

            const grp: GroupInRange = new GroupInRange(500.00, loc);
            grp.for((u: unit) => {
                if (IsUnitEnemy(u, trigOwner) && UnitAlive(u)) {
                    UnitDamageTargetBJ(trig, u, damage, ATTACK_TYPE_NORMAL, DAMAGE_TYPE_NORMAL);
                }
            });
            grp.destroy();

            if (ticks <= 0) {
                RemoveUnit(dummy);
                RemoveLocation(loc);
                this.timerUtils.releaseTimer(t);
            }
        });
    }
}
