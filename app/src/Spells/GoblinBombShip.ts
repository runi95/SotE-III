import { Spell } from './Spell';
import { TimerUtils } from '../Utility/TimerUtils';
import { Timer } from '../JassOverrides/Timer';
import { GroupInRange } from '../JassOverrides/GroupInRange';

export class GoblinBombShip extends Spell {
    protected readonly abilityId: number = FourCC('A02F');
    protected readonly dummyUnitTypeId: number = FourCC('n019');
    protected readonly timedLifeBuffId: number = FourCC('BTLF');
    private readonly timerUtils: TimerUtils;

    constructor(timerUtils: TimerUtils) {
        super();

        this.timerUtils = timerUtils;
    }

    protected action(): void {
        const trig: unit = GetTriggerUnit();
        const loc: location = GetSpellTargetLoc();
        const rng: number = GetRandomInt(0, 359);
        const x: number = GetLocationX(loc) + 300.00 * CosBJ(rng);
        const y: number = GetLocationY(loc) + 300.00 * SinBJ(rng);
        const angle: number = (rng + 180) % 360;
        const abilityLevel: number = GetUnitAbilityLevel(trig, this.abilityId);
        const intelligence: number = GetHeroStatBJ(bj_HEROSTAT_INT, trig, true);
        const summon: unit = CreateUnit(GetOwningPlayer(trig), this.dummyUnitTypeId, x, y, angle);
        const damage: number = 300 * abilityLevel + 10 * intelligence;
        let eff: effect;

        IssuePointOrder(summon, 'move', GetLocationX(loc) + 300 * CosBJ(angle), GetLocationY(loc) + 300 * SinBJ(angle));
        UnitApplyTimedLifeBJ(2, this.timedLifeBuffId, summon);

        let ticks: number = 15;
        const t: Timer = this.timerUtils.NewTimer();
        t.start(0.10, true, () => {
            ticks--;

            if (ticks === 11) {
                eff = AddSpecialEffectLoc('Abilities\\Spells\\Human\\FlameStrike\\FlameStrike1.mdl', loc);
            }

            if (ticks === 5) {
                const grp: GroupInRange = new GroupInRange(300, loc);

                grp.For(() => {
                    if (IsUnitEnemy(GetEnumUnit(), GetOwningPlayer(trig))) {
                        UnitDamageTargetBJ(trig, GetEnumUnit(), damage, ATTACK_TYPE_NORMAL, DAMAGE_TYPE_NORMAL);
                    }
                });

                RemoveLocation(loc);
                grp.Destroy();
            }

            if (ticks <= 0) {
                DestroyEffect(eff);
                this.timerUtils.ReleaseTimer(t);
            }
        });
    }
}
