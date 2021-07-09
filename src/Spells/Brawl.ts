import { Spell } from './Spell';
import { GroupInRange } from '../JassOverrides/GroupInRange';
import { SpellCastUtils } from '../Utility/SpellCastUtils';
import { TimerUtils } from '../Utility/TimerUtils';
import { Timer } from '../JassOverrides/Timer';
import { KnockbackUtils } from '../Utility/KnockbackUtils';

export class Brawl extends Spell {
    protected readonly abilityId: number = FourCC('A03I');
    private readonly spellCastUtils: SpellCastUtils;
    private readonly timerUtils: TimerUtils;
    private readonly knockbackUtils: KnockbackUtils;

    private readonly effectStringList: string[] = [
        'Units\\Creeps\\StormPandarenBrewmaster\\StormPandarenBrewmaster.mdl',
        'Doodads\\Cinematic\\GlowingRunes\\GlowingRunes4.mdl',
        'Units\\Creeps\\EarthPandarenBrewmaster\\EarthPandarenBrewmaster.mdl',
        'Doodads\\Cinematic\\GlowingRunes\\GlowingRunes6.mdl',
        'Units\\Creeps\\FirePandarenBrewmaster\\FirePandarenBrewmaster.mdl',
        'Doodads\\Cinematic\\GlowingRunes\\GlowingRunes0.mdl',
        'Units\\Creeps\\StormPandarenBrewmaster\\StormPandarenBrewmaster.mdl',
        'Doodads\\Cinematic\\GlowingRunes\\GlowingRunes4.mdl',
        'Units\\Creeps\\EarthPandarenBrewmaster\\EarthPandarenBrewmaster.mdl',
        'Doodads\\Cinematic\\GlowingRunes\\GlowingRunes6.mdl',
        'Units\\Creeps\\FirePandarenBrewmaster\\FirePandarenBrewmaster.mdl',
        'Doodads\\Cinematic\\GlowingRunes\\GlowingRunes0.mdl',
    ];

    constructor(spellCastUtils: SpellCastUtils, timerUtils: TimerUtils, knockbackUtils: KnockbackUtils) {
        super();

        this.spellCastUtils = spellCastUtils;
        this.timerUtils = timerUtils;
        this.knockbackUtils = knockbackUtils;
    }

    protected action(): void {
        const trig: unit = GetTriggerUnit();
        const abilityLevel: number = GetUnitAbilityLevel(trig, this.abilityId);
        const intelligence: number = this.spellCastUtils.GetIntelligence(trig);
        const owningPlayer: player = GetOwningPlayer(trig);
        const bonusDamage: number = 300 * abilityLevel + 4 * intelligence;
        const damage: number = BlzGetUnitBaseDamage(trig, 0) + bonusDamage;
        const x: number = GetUnitX(trig);
        const y: number = GetUnitY(trig);
        DestroyEffect(AddSpecialEffect('Abilities\\Spells\\Human\\FlakCannons\\FlakTarget.mdl', x, y));
        const loc: location = Location(x, y);
        const grp: GroupInRange = new GroupInRange(600, loc);
        const unitsInLoc: unit[] = [];
        let unitsInLocCount = 0;
        grp.for((u: unit) => {
            if (UnitAlive(u)) {
                unitsInLoc.push(u);
                unitsInLocCount++;
                if (u !== trig) {
                    DestroyEffect(AddSpecialEffect('Abilities\\Spells\\Human\\FlakCannons\\FlakTarget.mdl', GetUnitX(u), GetUnitY(u)));
                    UnitDamageTargetBJ(trig, u, damage, ATTACK_TYPE_MAGIC, DAMAGE_TYPE_MAGIC);
                }
            }
        });
        grp.destroy();

        const listLength: number = this.effectStringList.length;
        const listCountDiv = 360 / listLength;
        const radius = 600.0;

        const effects: effect[] = [];
        for (let i = 0; i < listLength; i++) {
            effects[i] = AddSpecialEffect(this.effectStringList[i], x + radius * CosBJ(i * listCountDiv), y + radius * SinBJ(i * listCountDiv));
            BlzSetSpecialEffectYaw(effects[i], Deg2Rad(180 + listCountDiv * i));
            BlzPlaySpecialEffect(effects[i], ANIM_TYPE_SPELL);
            BlzSetSpecialEffectColorByPlayer(effects[i], owningPlayer);
        }

        let ticks = 100;
        const t: Timer = this.timerUtils.newTimer();
        t.start(0.1, true, () => {
            ticks--;

            for (let i = 0; i < unitsInLocCount; i++) {
                if (UnitAlive(unitsInLoc[i])) {
                    const uX: number = GetUnitX(unitsInLoc[i]);
                    const uY: number = GetUnitY(unitsInLoc[i]);
   
                    const dist: number = Math.sqrt(Pow(uX - x, 2) + Pow(uY - y, 2));

                    if (dist > 550 && dist < 700) {
                        this.knockbackUtils.knockback({ 
                            knockbackTarget: unitsInLoc[i],
                            targetX: x,
                            targetY: y,
                            dist: 300,
                            vel: 100,
                            onWallHit: undefined,
                            onKnockbackEnd: undefined
                        });
                    }
                }
            }

            if (ticks <= 0) {
                for (let i = 0; i < listLength; i++) {
                    BlzSetSpecialEffectAlpha(effects[i], 0);
                    DestroyEffect(effects[i]);
                }
    
                this.timerUtils.releaseTimer(t);
            }
        });
    }
}
