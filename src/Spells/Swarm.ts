import { Spell } from './Spell';
import { TimerUtils } from '../Utility/TimerUtils';
import { Timer } from '../JassOverrides/Timer';
import { GroupInRange } from '../JassOverrides/GroupInRange';
import { SpellCastUtils } from '../Utility/SpellCastUtils';

export class Swarm extends Spell {
    protected readonly abilityId: number = FourCC('A01F');
    private readonly timerUtils: TimerUtils;
    private readonly spellCastUtils: SpellCastUtils;

    constructor(timerUtils: TimerUtils, spellCastUtils: SpellCastUtils) {
        super();

        this.timerUtils = timerUtils;
        this.spellCastUtils = spellCastUtils;
    }

    protected action(): void {
        const trig: unit = GetTriggerUnit();
        const abilityLevel: number = GetUnitAbilityLevel(trig, this.abilityId);
        let x: number = GetUnitX(trig);
        let y: number = GetUnitY(trig);
        const targetX: number = GetSpellTargetX();
        const targetY: number = GetSpellTargetY();
        const dist: number = Math.sqrt(Pow(x - targetX, 2) + Pow(y - targetY, 2));
        const multX: number = 100 * ((targetX - x) / dist);
        const multY: number = 100 * ((targetY - y) / dist);
        const damage: number = (250 * abilityLevel + 3 * this.spellCastUtils.GetIntelligence(trig)) / 3;
        const fog: fogmodifier = CreateFogModifierRadius(
            GetOwningPlayer(trig),
            FOG_OF_WAR_VISIBLE,
            x + 2.5 * multX,
            y + 2.5 * multY,
            500.0,
            true,
            true,
        );
        FogModifierStart(fog);

        let ticks = 5;
        const t: Timer = this.timerUtils.newTimer();
        t.start(0.03, true, () => {
            ticks--;

            x = x + multX;
            y = y + multY;
            if (!IsTerrainPathable(x, y, PATHING_TYPE_WALKABILITY)) {
                DestroyEffect(AddSpecialEffect('Abilities\\Spells\\Undead\\DeathCoil\\DeathCoilSpecialArt.mdl', x, y));

                const loc: location = Location(x, y);
                const grp: GroupInRange = new GroupInRange(100, loc);
                const playerId: number = GetPlayerId(GetOwningPlayer(trig));

                grp.for((u: unit) => {
                    if (IsUnitEnemy(u, Player(playerId))) {
                        UnitDamageTargetBJ(trig, u, damage, ATTACK_TYPE_MAGIC, DAMAGE_TYPE_MAGIC);
                    }
                });

                RemoveLocation(loc);
                grp.destroy();
            } else {
                x = x - multX;
                y = y - multY;
                ticks = 0;
            }

            if (ticks <= 0) {
                SetUnitPosition(trig, x, y);
                FogModifierStop(fog);
                DestroyFogModifier(fog);

                this.timerUtils.releaseTimer(t);
            }
        });
    }
}
