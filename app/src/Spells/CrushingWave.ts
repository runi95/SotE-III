import { Spell } from './Spell';
import { TimerUtils } from '../Utility/TimerUtils';
import { Timer } from '../JassOverrides/Timer';

export class CrushingWave extends Spell {
    protected abilityId: number = FourCC('A00O');
    private dummyUnitId: number = FourCC('n00L');
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
        const damage: number = 6.00 * abilityLevel + 0.10 * intelligence;
        const distance: number = SquareRoot(Pow(trigX - x, 2.00) + Pow(trigY - y, 2.00));
        const travelTime: number = distance / 15.00;
        const dummy: unit = CreateUnit(GetOwningPlayer(trig), this.dummyUnitId, trigX, trigY, GetUnitFacing(trig));

        SetUnitTimeScalePercent(dummy, 0.00);
        IssuePointOrder(dummy, 'move', x, y);

        let ticks: number = travelTime;
        const t: Timer = this.timerUtils.NewTimer();
        t.start(0.05, true, () => {
            ticks--;

            const loc: location = GetUnitLoc(dummy);
            const grp: group = GetUnitsInRangeOfLocAll(75.00, loc);

            ForGroup(grp, () => {
                if (IsUnitEnemy(GetEnumUnit(), GetOwningPlayer(trig)) && IsUnitAliveBJ(GetEnumUnit())) {
                    UnitDamageTargetBJ(trig, GetEnumUnit(), damage, ATTACK_TYPE_NORMAL, DAMAGE_TYPE_NORMAL);
                }
            });

            RemoveLocation(loc);
            DestroyGroup(grp);

            if (ticks <= 0) {
                const detonationLoc: location = GetUnitLoc(dummy);
                const detonationGroup: group = GetUnitsInRangeOfLocAll(150.00, detonationLoc);

                DestroyEffect(AddSpecialEffect('Abilities\\Spells\\Other\\CrushingWave\\CrushingWaveDamage.mdl',
                                               GetUnitX(dummy), GetUnitY(dummy)));

                ForGroup(detonationGroup, () => {
                    if (IsUnitEnemy(GetEnumUnit(), GetOwningPlayer(trig)) && IsUnitAliveBJ(GetEnumUnit())) {
                        UnitDamageTargetBJ(trig, GetEnumUnit(), 30.00 * damage, ATTACK_TYPE_NORMAL, DAMAGE_TYPE_NORMAL);
                    }
                });

                RemoveUnit(dummy);
                RemoveLocation(detonationLoc);
                DestroyGroup(detonationGroup);

                this.timerUtils.ReleaseTimer(t);
            }
        });
    }
}
