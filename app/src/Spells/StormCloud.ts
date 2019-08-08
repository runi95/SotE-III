import { Spell } from './Spell';
import { TimerUtils } from '../Utility/TimerUtils';
import { Timer } from '../JassOverrides/Timer';

export class StormCloud extends Spell {
    protected readonly abilityId: number = FourCC('A003');
    private readonly dummyUnitId: number = FourCC('n004');
    private readonly timerUtils: TimerUtils;

    constructor(timerUtils: TimerUtils) {
        super();

        this.timerUtils = timerUtils;
    }


    protected action(): void {
        const trig: unit = GetTriggerUnit();
        const trigOwner: player = GetOwningPlayer(trig);
        const x: number = GetSpellTargetX();
        const y: number = GetSpellTargetY();
        const dummy: unit = CreateUnit(GetOwningPlayer(trig), this.dummyUnitId, x, y, 0);
        const loc: location = GetUnitLoc(dummy);
        const abilityLevel: number = GetUnitAbilityLevelSwapped(this.abilityId, trig);
        const intelligence: number = GetHeroInt(trig, true);
        const damage: number = 35.00 * abilityLevel + 0.20 * intelligence;

        let ticks: number = 200;
        const t: Timer = this.timerUtils.NewTimer();
        t.start(0.05, true, () => {
            ticks--;

            const grp: group = GetUnitsInRangeOfLocAll(300.00, loc);
            ForGroup(grp, () => {
                if (IsUnitEnemy(GetEnumUnit(), trigOwner) && UnitAlive(GetEnumUnit()) && GetRandomInt(1, 10) === 1) {
                    DestroyEffect(AddSpecialEffect('Abilities\\Spells\\Other\\Monsoon\\MonsoonBoltTarget.mdl',
                                                   GetUnitX(GetEnumUnit()), GetUnitY(GetEnumUnit())));
                    UnitDamageTargetBJ(trig, GetEnumUnit(), damage, ATTACK_TYPE_NORMAL, DAMAGE_TYPE_NORMAL);
                }
            });
            DestroyGroup(grp);

            if (ticks <= 0) {
                RemoveUnit(dummy);
                RemoveLocation(loc);
                this.timerUtils.ReleaseTimer(t);
            }
        });
    }
}
