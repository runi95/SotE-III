import { Spell } from './Spell';
import { TimerUtils } from '../Utility/TimerUtils';
import { Timer } from '../JassOverrides/Timer';
import { GroupInRange } from '../JassOverrides/GroupInRange';

export class Swarm extends Spell {
    protected readonly abilityId: number = FourCC('A01F');
    private readonly timerUtils: TimerUtils;

    constructor(timerUtils: TimerUtils) {
        super();

        this.timerUtils = timerUtils;
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
        const damage: number = 50 * abilityLevel + 2 * GetHeroInt(trig, true); // Will usually hit a unit 2 - 3 times
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

        let ticks: number = 5;
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
                        UnitDamageTargetBJ(trig, u, damage, ATTACK_TYPE_NORMAL, DAMAGE_TYPE_NORMAL);
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
