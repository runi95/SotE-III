import { TimerUtils } from '../../Utility/TimerUtils';
import { RandomNumberGenerator } from '../../Utility/RandomNumberGenerator';
import { GroupInRange } from '../../JassOverrides/GroupInRange';
import { Spell } from '../../Spells/Spell';
import { Timer } from '../../JassOverrides/Timer';

export class LightningBoltCast extends Spell {
    protected readonly abilityId: number = FourCC('A045');
    private readonly timerUtils: TimerUtils;
    private readonly randomNumberGenerator: RandomNumberGenerator;

    constructor(timerUtils: TimerUtils, randomNumberGenerator: RandomNumberGenerator) {
        super();

        this.timerUtils = timerUtils;
        this.randomNumberGenerator = randomNumberGenerator;
    }

    protected action(): void {
        const trig: unit = GetTriggerUnit();
        const x: number = GetSpellTargetX();
        const y: number = GetSpellTargetY();
        const eff: effect = AddSpecialEffect('Abilities\\Spells\\Human\\FlameStrike\\FlameStrike1.mdl', x, y);

        let ticks = 6;
        const t: Timer = this.timerUtils.newTimer();
        t.start(0.1, true, () => {
            ticks--;

            if (ticks === 2) {
                DestroyEffect(AddSpecialEffect('Abilities\\Spells\\Other\\Monsoon\\MonsoonBoltTarget.mdl', x, y));
            }

            if (ticks <= 0) {
                DestroyEffect(eff);

                for (let i = 0; i < 15; i++) {
                    DestroyEffect(
                        AddSpecialEffect(
                            'Abilities\\Weapons\\Bolt\\BoltImpact.mdl',
                            x + this.randomNumberGenerator.random(0, 400) - 200,
                            y + this.randomNumberGenerator.random(0, 400) - 200,
                        ),
                    );
                }

                const loc: location = GetUnitLoc(trig);
                const grp: GroupInRange = new GroupInRange(400, loc);
                grp.for((u: unit) => {
                    if (IsUnitEnemy(u, GetOwningPlayer(trig))) {
                        const dist: number = Math.sqrt(Pow(x - GetUnitX(u), 2) + Pow(y - GetUnitY(u), 2));
                        const damage: number = 2200 * (1 - dist / 800);
                        UnitDamageTargetBJ(trig, u, damage, ATTACK_TYPE_MAGIC, DAMAGE_TYPE_MAGIC);
                    }
                });

                RemoveLocation(loc);
                grp.destroy();
                this.timerUtils.releaseTimer(t);
            }
        });
    }
}
