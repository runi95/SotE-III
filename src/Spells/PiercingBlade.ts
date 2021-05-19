import { Spell } from './Spell';
import { TimerUtils } from '../Utility/TimerUtils';
import { Timer } from '../JassOverrides/Timer';
import { GroupInRange } from '../JassOverrides/GroupInRange';
import { SpellCastUtils } from '../Utility/SpellCastUtils';

export class PiercingBlade extends Spell {
    protected readonly abilityId: number = FourCC('A00L');
    private readonly dummyUnitId: number = FourCC('n00M');
    private readonly timerUtils: TimerUtils;
    private readonly spellCastUtils: SpellCastUtils;

    constructor(timerUtils: TimerUtils, spellCastUtils: SpellCastUtils) {
        super();

        this.timerUtils = timerUtils;
        this.spellCastUtils = spellCastUtils;
    }

    protected action(): void {
        const trig: unit = GetTriggerUnit();
        const trigX: number = GetUnitX(trig);
        const trigY: number = GetUnitY(trig);
        const targetX: number = GetSpellTargetX();
        const targetY: number = GetSpellTargetY();
        const diffX: number = targetX - trigX;
        const diffY: number = targetY - trigY;
        const diff: number = SquareRoot(Pow(diffX, 2.00) + Pow(diffY, 2.00));
        const x: number = trigX + 750.00 * (diffX / diff);
        const y: number = trigY + 750.00 * (diffY / diff);
        const intelligence: number = this.spellCastUtils.GetIntelligence(trig);
        const abilityLevel: number = GetUnitAbilityLevel(trig, this.abilityId);
        const damage: number = 20.00 * abilityLevel + 0.50 * intelligence;
        const dummy: unit = CreateUnit(GetOwningPlayer(trig), this.dummyUnitId, trigX, trigY, GetUnitFacing(trig));

        IssuePointOrder(dummy, 'move', x, y);

        let ticks = 40;
        const t: Timer = this.timerUtils.newTimer();
        t.start(0.05, true, () => {
            ticks--;

            const loc: location = GetUnitLoc(dummy);
            const grp: GroupInRange = new GroupInRange(50.00, loc);

            grp.for((u: unit) => {
                if (IsUnitEnemy(u, GetOwningPlayer(trig)) && UnitAlive(u)) {
                    DestroyEffect(AddSpecialEffect('Abilities\\Spells\\Other\\Stampede\\StampedeMissileDeath.mdl',
                                                   GetUnitX(u), GetUnitY(u)));
                    UnitDamageTargetBJ(trig, u, damage, ATTACK_TYPE_NORMAL, DAMAGE_TYPE_NORMAL);
                }
            });

            RemoveLocation(loc);
            grp.destroy();

            if (ticks <= 0) {
                RemoveUnit(dummy);
                this.timerUtils.releaseTimer(t);
            }
        });
    }
}
