import { Spell } from './Spell';
import { TimerUtils } from '../Utility/TimerUtils';
import { Timer } from '../JassOverrides/Timer';

// FIXME: This spell does not work as intended
export class Swarm extends Spell {
    protected abilityId: number = FourCC('A01F');
    private timerUtils: TimerUtils;

    constructor(timerUtils: TimerUtils) {
        super();

        this.timerUtils = timerUtils;
    }

    protected action(): void {
        const trig: unit = GetTriggerUnit();
        const abilityLevel: number = GetUnitAbilityLevelSwapped(this.abilityId, trig);
        let x: number = GetUnitX(trig);
        let y: number = GetUnitY(trig);
        const targetX: number = GetSpellTargetX();
        const targetY: number = GetSpellTargetY();
        const dist: number = SquareRoot(Pow(x - targetX, 2) + Pow(y - targetY, 2));
        const multX: number = 100 * ((targetX - x) / dist);
        const multY: number = 100 * ((targetY - y) / dist);
        const damage: number = 50 * abilityLevel + 2 * GetHeroInt(trig, true);
        const fog: fogmodifier = CreateFogModifierRadius(GetOwningPlayer(trig), FOG_OF_WAR_VISIBLE,
                                                         x + 2.50 * multX, y + 2.50 * multY,
                                                         500.00, true, true);
        FogModifierStart(fog);

        let ticks: number = 5;
        const t: Timer = this.timerUtils.NewTimer();
        t.start(0.03, true, () => {
            ticks--;

            x = x + multX;
            y = y + multY;
            if (!IsTerrainPathable(x, y, PATHING_TYPE_WALKABILITY)) {
                DestroyEffect(AddSpecialEffect('Abilities\\Spells\\Undead\\DeathCoil\\DeathCoilSpecialArt.mdl', x, y));

                const loc: location = Location(x, y);
                const grp: group = GetUnitsInRangeOfLocAll(100, loc);
                const playerId: number = GetPlayerId(GetOwningPlayer(trig));

                ForGroup(grp, () => {
                    if (IsUnitEnemy(GetEnumUnit(), Player(playerId))) {
                        UnitDamageTargetBJ(trig, GetEnumUnit(), damage, ATTACK_TYPE_NORMAL, DAMAGE_TYPE_NORMAL);
                    }
                });

                RemoveLocation(loc);
                DestroyGroup(grp);
            } else {
                x = x - multX;
                y = y - multY;
                ticks = 0;
            }

            if (ticks <= 0) {
                this.timerUtils.ReleaseTimer(t);
            }
        });
    }
}
