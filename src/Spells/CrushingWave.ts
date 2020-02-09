import { Spell } from './Spell';
import { TimerUtils } from '../Utility/TimerUtils';
import { Timer } from '../JassOverrides/Timer';
import { GroupInRange } from '../JassOverrides/GroupInRange';

export class CrushingWave extends Spell {
    protected readonly abilityId: number = FourCC('A00O');
    private readonly dummyUnitId: number = FourCC('n00L');
    private readonly timerUtils: TimerUtils;

    constructor(timerUtils: TimerUtils) {
        super();

        this.timerUtils = timerUtils;
    }

    protected action(): void {
        const trig: unit = GetTriggerUnit();
        let x: number = GetUnitX(trig);
        let y: number = GetUnitY(trig);
        const targetX: number = GetSpellTargetX();
        const targetY: number = GetSpellTargetY();
        const intelligence: number = GetHeroInt(trig, true);
        const abilityLevel: number = GetUnitAbilityLevel(trig, this.abilityId);
        const damage: number = (275 * abilityLevel + 3.5 * intelligence) / 35;
        const dummy: unit = CreateUnit(GetOwningPlayer(trig), this.dummyUnitId, x, y, GetUnitFacing(trig));
        SetUnitTimeScalePercent(dummy, 0.0);

        const t: Timer = this.timerUtils.newTimer();
        t.start(0.03, true, () => {
            const distance: number = Math.sqrt(Pow(x - targetX, 2.0) + Pow(y - targetY, 2.0));
            x += 15 * ((targetX - x) / distance);
            y += 15 * ((targetY - y) / distance);

            SetUnitPosition(dummy, x, y);
            const loc: location = Location(x, y);
            const grp: GroupInRange = new GroupInRange(75.0, loc);

            grp.for((u: unit) => {
                if (IsUnitEnemy(u, GetOwningPlayer(trig)) && UnitAlive(u)) {
                    UnitDamageTargetBJ(trig, u, damage, ATTACK_TYPE_NORMAL, DAMAGE_TYPE_NORMAL);
                }
            });

            RemoveLocation(loc);
            grp.destroy();

            if (distance < 15) {
                const detonationLoc: location = Location(x, y);
                const detonationGroup: GroupInRange = new GroupInRange(150.0, detonationLoc);

                DestroyEffect(
                    AddSpecialEffect('Abilities\\Spells\\Other\\CrushingWave\\CrushingWaveDamage.mdl', GetUnitX(dummy), GetUnitY(dummy)),
                );

                detonationGroup.for(() => {
                    if (IsUnitEnemy(GetEnumUnit(), GetOwningPlayer(trig)) && UnitAlive(GetEnumUnit())) {
                        UnitDamageTargetBJ(trig, GetEnumUnit(), 30.0 * damage, ATTACK_TYPE_NORMAL, DAMAGE_TYPE_NORMAL);
                    }
                });

                RemoveUnit(dummy);
                RemoveLocation(detonationLoc);
                detonationGroup.destroy();

                this.timerUtils.releaseTimer(t);
            }
        });
    }
}
