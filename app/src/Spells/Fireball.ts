import { Spell } from './Spell';
import { TimerUtils } from '../Utility/TimerUtils';
import { Timer } from '../JassOverrides/Timer';

export class Fireball extends Spell {
    protected abilityId: number = FourCC('A01U');
    private dummyUnitId: number = FourCC('n012');
    private timerUtils: TimerUtils;

    constructor(timerUtils: TimerUtils) {
        super();

        this.timerUtils = timerUtils;
    }

    protected action(): void {
        const trig: unit = GetTriggerUnit();
        const trigX: number = GetUnitX(trig);
        const trigY: number = GetUnitY(trig);
        const x: number = GetSpellTargetX();
        const y: number = GetSpellTargetY();
        const intelligence: number = GetHeroInt(trig, true);
        const abilityLevel: number = GetUnitAbilityLevel(trig, this.abilityId);
        const damage: number = 100.00 * abilityLevel + 2.00 * intelligence;
        const distance: number = Math.sqrt(Pow(trigX - x, 2.00) + Pow(trigY - y, 2.00));
        const travelTime: number = distance / 500.00;
        const dummy: unit = CreateUnit(GetOwningPlayer(trig), this.dummyUnitId, trigX, trigY, GetUnitFacing(trig));
        const loc: location = GetSpellTargetLoc();

        IssuePointOrder(dummy, 'move', x, y);

        const t: Timer = this.timerUtils.NewTimer();
        t.start(0.05 + travelTime, false, () => {
            DestroyEffect(AddSpecialEffectLocBJ(loc, 'Abilities\\Spells\\Other\\Doom\\DoomDeath.mdl'));
            KillUnit(dummy);
            const grp: group = GetUnitsInRangeOfLocAll(1000.00, loc);

            ForGroup(grp, () => {
                if (IsUnitEnemy(GetEnumUnit(), GetOwningPlayer(trig))) {
                    UnitDamageTargetBJ(trig, GetEnumUnit(), damage, ATTACK_TYPE_NORMAL, DAMAGE_TYPE_NORMAL);
                }
            });

            RemoveLocation(loc);
            DestroyGroup(grp);

            this.timerUtils.ReleaseTimer(t);
        });
    }
}
