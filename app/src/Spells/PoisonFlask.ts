import { Spell } from './Spell';
import { TimerUtils } from '../Utility/TimerUtils';
import { Timer } from '../JassOverrides/Timer';
import { GroupInRange } from '../JassOverrides/GroupInRange';

export class PoisonFlask extends Spell {
    protected readonly abilityId: number = FourCC('A039');
    private readonly chemicalSprayBuff: number = FourCC('B006');
    private readonly timerUtils: TimerUtils;

    constructor(timerUtils: TimerUtils) {
        super();

        this.timerUtils = timerUtils;
    }

    protected action(): void {
        const trig: unit = GetTriggerUnit();
        const x: number = GetUnitX(trig);
        const y: number = GetUnitY(trig);
        const abilityLevel: number = GetUnitAbilityLevel(trig, this.abilityId);
        const intelligence: number = GetHeroInt(GetTriggerUnit(), true);
        const damage: number = (135 * abilityLevel + 3 * intelligence) / 10;
        const units: unit[] = [];
        const unitEffects: effect[] = [];
        const loc: location = Location(x, y);
        const grp: GroupInRange = new GroupInRange(300, loc);
        grp.for((u: unit) => {
            if (UnitAlive(u) && IsUnitEnemy(u, GetOwningPlayer(trig))) {
                units.push(u);
                unitEffects.push(AddSpecialEffectTarget('Abilities\\Spells\\Other\\Parasite\\ParasiteMissile.mdl', u, 'overhead'));
            }
        });

        grp.destroy();
        RemoveLocation(loc);

        let ticks: number = 10;
        const t: Timer = this.timerUtils.newTimer();
        t.start(1, true, () => {
            ticks--;

            for (let i: number = 0; i < units.length; i++) {
                if (UnitHasBuffBJ(units[i], this.chemicalSprayBuff)) {
                    UnitDamageTargetBJ(trig, units[i], 2 * damage, ATTACK_TYPE_NORMAL, DAMAGE_TYPE_NORMAL);
                } else {
                    UnitDamageTargetBJ(trig, units[i], damage, ATTACK_TYPE_NORMAL, DAMAGE_TYPE_NORMAL);
                }
            }

            if (ticks <= 0) {
                for (let i: number = 0; i < unitEffects.length; i++) {
                    DestroyEffect(unitEffects[i]);
                }

                this.timerUtils.releaseTimer(t);
            }
        });
    }
}
