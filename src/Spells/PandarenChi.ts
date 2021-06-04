import { Spell } from './Spell';
import { TimerUtils } from '../Utility/TimerUtils';
import { Timer } from '../JassOverrides/Timer';
import { GroupInRange } from '../JassOverrides/GroupInRange';
import { SpellCastUtils } from '../Utility/SpellCastUtils';
import { DamageEngineGlobals } from '../DamageEngine/DamageEngineGlobals';

export class PandarenChi extends Spell {
    protected readonly abilityId: number = FourCC('A03J');
    private readonly timerUtils: TimerUtils;
    private readonly spellCastUtils: SpellCastUtils;
    private readonly damageEngineGlobals: DamageEngineGlobals;

    constructor(timerUtils: TimerUtils, spellCastUtils: SpellCastUtils, damageEngineGlobals: DamageEngineGlobals) {
        super();

        this.timerUtils = timerUtils;
        this.spellCastUtils = spellCastUtils;
        this.damageEngineGlobals = damageEngineGlobals;
    }

    protected action(): void {
        const trig: unit = GetTriggerUnit();
        const loc: location = GetUnitLoc(trig);
        const p: player = GetOwningPlayer(trig);
        const abilityLevel: number = GetUnitAbilityLevel(trig, this.abilityId);
        const intelligence: number = this.spellCastUtils.GetIntelligence(trig);
        const damagePerTick: number = Math.ceil((200 * abilityLevel + 1.5 * intelligence) / 10);
        const healingPerTick: number = Math.ceil((75 * abilityLevel + 1.5 * intelligence) / 10);
        const eff: effect = AddSpecialEffectLoc('Abilities\\Spells\\NightElf\\Tranquility\\Tranquility.mdl', loc);

        let ticks = 40;
        const t: Timer = this.timerUtils.newTimer();
        t.start(0.5, true, () => {
            ticks--;

            const grp: GroupInRange = new GroupInRange(450, loc);
            grp.for((u: unit) => {
                if (UnitAlive(u)) {
                    if (ticks % 4 === 0 && IsUnitEnemy(u, p)) {
                        DestroyEffect(
                            AddSpecialEffect('Abilities\\Spells\\NightElf\\ManaBurn\\ManaBurnTarget.mdl', GetUnitX(u), GetUnitY(u)),
                        );
                        this.damageEngineGlobals.NextDefensiveReduction = 0.9;
                        UnitDamageTargetBJ(trig, u, damagePerTick, ATTACK_TYPE_NORMAL, DAMAGE_TYPE_NORMAL);
                    }

                    if (IsUnitAlly(u, p)) {
                        DestroyEffect(
                            AddSpecialEffect('Abilities\\Spells\\NightElf\\Tranquility\\TranquilityTarget.mdl', GetUnitX(u), GetUnitY(u)),
                        );
                        SetUnitLifeBJ(u, GetUnitState(u, UNIT_STATE_LIFE) + healingPerTick);
                    }
                }
            });

            if (ticks <= 0) {
                DestroyEffect(eff);
                RemoveLocation(loc);

                this.timerUtils.releaseTimer(t);
            }
        });
    }
}
