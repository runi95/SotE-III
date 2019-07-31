import { Spell } from './Spell';
import { TimerUtils } from '../Utility/TimerUtils';
import { Timer } from '../JassOverrides/Timer';

export class Fireball extends Spell {
    protected readonly abilityId: number = FourCC('A01U');
    private readonly dummyUnitId: number = FourCC('n012');
    private readonly timerUtils: TimerUtils;

    constructor(timerUtils: TimerUtils) {
        super();

        this.timerUtils = timerUtils;
    }

    protected action(): void {
        const trig: unit = GetTriggerUnit();
        const trigX: number = GetUnitX(trig);
        const trigY: number = GetUnitY(trig);
        const angle: number = GetUnitFacing(trig);
        const x: number = GetSpellTargetX();
        const y: number = GetSpellTargetY();
        const spawnX: number = trigX + 150 * CosBJ(angle);
        const spawnY: number = trigY + 150 * SinBJ(angle);
        const intelligence: number = GetHeroInt(trig, true);
        const abilityLevel: number = GetUnitAbilityLevel(trig, this.abilityId);
        const damage: number = 100.00 * abilityLevel + 2.00 * intelligence;
        const distance: number = Math.sqrt(Pow(spawnX - x, 2) + Pow(spawnY - y, 2));
        const loc: location = GetSpellTargetLoc();
        if (distance < 150) {
            DestroyEffect(AddSpecialEffectLocBJ(loc, 'Abilities\\Spells\\Other\\Doom\\DoomDeath.mdl'));
            const grp: group = GetUnitsInRangeOfLocAll(1000.00, loc);

            ForGroup(grp, () => {
                if (IsUnitEnemy(GetEnumUnit(), GetOwningPlayer(trig))) {
                    UnitDamageTargetBJ(trig, GetEnumUnit(), damage, ATTACK_TYPE_NORMAL, DAMAGE_TYPE_NORMAL);
                }
            });

            RemoveLocation(loc);
            DestroyGroup(grp);
        } else {
            const dummy: unit = CreateUnit(GetOwningPlayer(trig), this.dummyUnitId, spawnX, spawnY, angle);

            IssuePointOrder(dummy, 'move', x, y);

            const travelTime: number = distance / 500.00;
            const t: Timer = this.timerUtils.NewTimer();
            t.start(0.25 + travelTime, false, () => {
                DestroyEffect(AddSpecialEffectLocBJ(loc, 'Abilities\\Spells\\Other\\Doom\\DoomDeath.mdl'));
                RemoveUnit(dummy);
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
}
