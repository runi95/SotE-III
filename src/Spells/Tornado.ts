import { SpellCastUtils } from '../Utility/SpellCastUtils';
import { Spell } from './Spell';
import { GroupInRange } from '../JassOverrides/GroupInRange';
import { TimerUtils } from '../Utility/TimerUtils';
import { Timer } from '../JassOverrides/Timer';

export class Tornado extends Spell {
    protected readonly abilityId: number = FourCC('A09I');
    private readonly dummyUnitTypeId: number = FourCC('n002');
    private readonly timedLifeBuffId: number = FourCC('BTLF');
    private readonly timerUtils: TimerUtils;
    private readonly spellCastUtils: SpellCastUtils;

    constructor(timerUtils: TimerUtils, spellCastUtils: SpellCastUtils) {
        super();

        this.timerUtils = timerUtils;
        this.spellCastUtils = spellCastUtils;
    }

    protected action(): void {
        const trig: unit = GetTriggerUnit();
        const owningPlayer: player = GetOwningPlayer(trig);
        const intelligence: number = this.spellCastUtils.GetIntelligence(trig);
        const spellDuration = 20;
        const damage: number = (250 + 1.5 * intelligence) / spellDuration;

        const dummy: unit = CreateUnit(owningPlayer, this.dummyUnitTypeId, GetUnitX(trig), GetUnitY(trig), 0);
        UnitApplyTimedLifeBJ(spellDuration, this.timedLifeBuffId, dummy);
        IssuePointOrder(dummy, 'move', GetSpellTargetX(), GetSpellTargetY());

        const t: Timer = this.timerUtils.newTimer();
        let ticks = spellDuration;
        t.start(1, true, () => {
            ticks--;

            const loc: location = GetUnitLoc(dummy);
            const grp: GroupInRange = new GroupInRange(300, loc);
            grp.for((u: unit) => {
                if (IsUnitEnemy(u, owningPlayer)) {
                    UnitDamageTargetBJ(trig, u, damage, ATTACK_TYPE_MAGIC, DAMAGE_TYPE_MAGIC);
                }
            });
            RemoveLocation(loc);
            grp.destroy();
            RemoveLocation(loc);

            if (ticks < 1) {
                this.timerUtils.releaseTimer(t);
            }
        });
    }
}
