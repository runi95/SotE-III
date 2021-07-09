import { Spell } from './Spell';
import { TimerUtils } from '../Utility/TimerUtils';
import { Timer } from '../JassOverrides/Timer';
import { GroupInRange } from '../JassOverrides/GroupInRange';
import { SpellCastUtils } from '../Utility/SpellCastUtils';

export class BurningFlask extends Spell {
    protected readonly abilityId: number = FourCC('A038');
    private readonly chemicalSprayBuff: number = FourCC('B006');
    private readonly timerUtils: TimerUtils;
    private readonly spellCastUtils: SpellCastUtils;

    constructor(timerUtils: TimerUtils, spellCastUtils: SpellCastUtils) {
        super();

        this.timerUtils = timerUtils;
        this.spellCastUtils = spellCastUtils;
    }

    protected action(): void {
        const trig: unit = GetTriggerUnit();
        let x: number = GetUnitX(trig);
        let y: number = GetUnitY(trig);
        const targX: number = GetSpellTargetX();
        const targY: number = GetSpellTargetY();
        const abilityLevel: number = GetUnitAbilityLevel(trig, this.abilityId);
        const intelligence: number = this.spellCastUtils.GetIntelligence(trig);
        const damage: number = (190 * abilityLevel + 2.5 * intelligence) / 100;
        const eff: effect = AddSpecialEffect('Abilities\\Spells\\Other\\AcidBomb\\BottleMissile.mdl', x, y);
        BlzSetSpecialEffectZ(eff, 50);

        const fireEffects: effect[] = [];
        const fireEffectsSize = 12;
        let ticks = 100;
        let effectHasBroken = false;
        const t: Timer = this.timerUtils.newTimer();
        t.start(0.05, true, () => {
            if (effectHasBroken) {
                ticks--;

                const loc: location = Location(x, y);
                const grp: GroupInRange = new GroupInRange(250, loc);
                grp.for((u: unit) => {
                    if (IsUnitEnemy(u, GetOwningPlayer(trig))) {
                        if (UnitHasBuffBJ(u, this.chemicalSprayBuff)) {
                            UnitDamageTargetBJ(trig, u, 2 * damage, ATTACK_TYPE_MAGIC, DAMAGE_TYPE_MAGIC);
                        } else {
                            UnitDamageTargetBJ(trig, u, damage, ATTACK_TYPE_MAGIC, DAMAGE_TYPE_MAGIC);
                        }
                    }
                });

                grp.destroy();
                RemoveLocation(loc);

                if (ticks <= 0) {
                    for (let i = 0; i < fireEffectsSize; i++) {
                        DestroyEffect(fireEffects[i]);
                    }
                    this.timerUtils.releaseTimer(t);
                }
            } else {
                const dist: number = Math.sqrt(Pow(targX - x, 2.0) + Pow(targY - y, 2.0));
                x += 15 * ((targX - x) / dist);
                y += 15 * ((targY - y) / dist);

                BlzSetSpecialEffectX(eff, x);
                BlzSetSpecialEffectY(eff, y);

                if (dist < 15) {
                    DestroyEffect(eff);
                    effectHasBroken = true;

                    fireEffects[0] = AddSpecialEffect('Abilities\\Spells\\Human\\FlameStrike\\FlameStrikeEmbers.mdl', x, y);
                    fireEffects[1] = AddSpecialEffect('Abilities\\Spells\\Human\\FlameStrike\\FlameStrikeEmbers.mdl', x + 200, y - 150);
                    fireEffects[2] = AddSpecialEffect('Abilities\\Spells\\Human\\FlameStrike\\FlameStrikeEmbers.mdl', x, y + 250);
                    fireEffects[3] = AddSpecialEffect('Abilities\\Spells\\Human\\FlameStrike\\FlameStrikeEmbers.mdl', x + 50, y + 50);
                    fireEffects[4] = AddSpecialEffect('Abilities\\Spells\\Human\\FlameStrike\\FlameStrikeEmbers.mdl', x - 50, y + 25);
                    fireEffects[5] = AddSpecialEffect('Abilities\\Spells\\Human\\FlameStrike\\FlameStrikeEmbers.mdl', x, y - 100);
                    fireEffects[6] = AddSpecialEffect('Abilities\\Spells\\Human\\FlameStrike\\FlameStrikeEmbers.mdl', x - 50, y - 200);
                    fireEffects[7] = AddSpecialEffect('Abilities\\Spells\\Human\\FlameStrike\\FlameStrikeEmbers.mdl', x - 150, y - 30);
                    fireEffects[8] = AddSpecialEffect('Abilities\\Spells\\Human\\FlameStrike\\FlameStrikeEmbers.mdl', x - 200, y + 50);
                    fireEffects[9] = AddSpecialEffect('Abilities\\Spells\\Human\\FlameStrike\\FlameStrikeEmbers.mdl', x + 175, y + 150);
                    fireEffects[10] = AddSpecialEffect('Abilities\\Spells\\Human\\FlameStrike\\FlameStrikeEmbers.mdl', x + 175, y - 40);
                    fireEffects[11] = AddSpecialEffect('Abilities\\Spells\\Human\\FlameStrike\\FlameStrikeEmbers.mdl', x - 75, y + 220);
                }
            }
        });
    }
}
