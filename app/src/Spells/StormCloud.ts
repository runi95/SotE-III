import { Spell } from './Spell';
import { TimerUtils } from '../Utility/TimerUtils';
import { Timer } from '../JassOverrides/Timer';
import { GroupInRange } from '../JassOverrides/GroupInRange';
import { RandomNumberGenerator } from '../Utility/RandomNumberGenerator';

export class StormCloud extends Spell {
    protected readonly abilityId: number = FourCC('A003');
    private readonly dummyUnitId: number = FourCC('n004');
    private readonly timerUtils: TimerUtils;
    private readonly randomNumberGenerator: RandomNumberGenerator;

    constructor(timerUtils: TimerUtils, randomNumberGenerator: RandomNumberGenerator) {
        super();

        this.timerUtils = timerUtils;
        this.randomNumberGenerator = randomNumberGenerator;
    }

    protected action(): void {
        const trig: unit = GetTriggerUnit();
        const trigOwner: player = GetOwningPlayer(trig);
        const x: number = GetSpellTargetX();
        const y: number = GetSpellTargetY();
        const dummy: unit = CreateUnit(GetOwningPlayer(trig), this.dummyUnitId, x, y, 0);
        const loc: location = GetUnitLoc(dummy);
        const abilityLevel: number = GetUnitAbilityLevel(trig, this.abilityId);
        const intelligence: number = GetHeroInt(trig, true);
        const damage: number = (140 * abilityLevel + 1.5 * intelligence) / 5;

        let ticks: number = 25;
        const t: Timer = this.timerUtils.newTimer();
        t.start(0.4, true, () => {
            ticks--;

            const grp: GroupInRange = new GroupInRange(300.0, loc);
            grp.for((u: unit) => {
                if (IsUnitEnemy(u, trigOwner) && UnitAlive(u) && this.randomNumberGenerator.random(1, 5) === 1) {
                    DestroyEffect(AddSpecialEffect('Abilities\\Spells\\Other\\Monsoon\\MonsoonBoltTarget.mdl', GetUnitX(u), GetUnitY(u)));
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
