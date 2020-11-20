import { Spell } from './Spell';
import { TimerUtils } from '../Utility/TimerUtils';
import { Timer } from '../JassOverrides/Timer';
import { GroupInRange } from '../JassOverrides/GroupInRange';
import { SpellCastUtils } from '../Utility/SpellCastUtils';

export class HolyLance extends Spell {
    protected readonly abilityId: number = FourCC('A035');
    private readonly timerUtils: TimerUtils;
    private readonly spellCastUtils: SpellCastUtils;

    constructor(timerUtils: TimerUtils, spellCastUtils: SpellCastUtils) {
        super();

        this.timerUtils = timerUtils;
        this.spellCastUtils = spellCastUtils;
    }

    protected action(): void {
        const trig: unit = GetTriggerUnit();
        const facing: number = GetUnitFacing(trig);
        const x: number = GetUnitX(trig);
        const y: number = GetUnitY(trig);
        const z: number = BlzGetUnitZ(trig);
        const lance: effect = AddSpecialEffect('Abilities\\Spells\\Human\\Resurrect\\ResurrectTarget.mdl', x, y);
        BlzSetSpecialEffectScale(lance, 0.6);
        BlzSetSpecialEffectYaw(lance, ((90 + facing) * Math.PI) / 180);
        BlzSetSpecialEffectRoll(lance, (270 * Math.PI) / 180);
        BlzSetSpecialEffectZ(lance, z + 60);
        const directionX: number = Math.cos((facing * Math.PI) / 180);
        const directionY: number = Math.sin((facing * Math.PI) / 180);
        const abilityLevel: number = GetUnitAbilityLevel(trig, this.abilityId);
        const intelligence: number = this.spellCastUtils.GetIntelligence(trig);
        const damage: number = 250 * abilityLevel + 3 * intelligence;

        let tick: number = 8;
        const t: Timer = this.timerUtils.newTimer();
        t.start(0.2, true, () => {
            tick--;
            const multiplier: number = 4 - tick;
            const loc: location = Location(x + multiplier * 100 * directionX, y + multiplier * 100 * directionY);
            const grp: GroupInRange = new GroupInRange(100, loc);

            grp.for((u: unit) => {
                if (IsUnitEnemy(u, GetOwningPlayer(trig))) {
                    UnitDamageTargetBJ(trig, u, damage, ATTACK_TYPE_NORMAL, DAMAGE_TYPE_NORMAL);
                }
            });

            RemoveLocation(loc);
            grp.destroy();

            if (tick <= 0) {
                DestroyEffect(lance);
                this.timerUtils.releaseTimer(t);
            }
        });
    }
}
