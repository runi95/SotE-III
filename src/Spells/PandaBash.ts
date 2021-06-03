import { Timer } from '../JassOverrides/Timer';
import { TimerUtils } from '../Utility/TimerUtils';
import { Spell } from './Spell';

export class PandaBash extends Spell {
    protected readonly abilityId: number = FourCC('A03N');
    private readonly timerUtils: TimerUtils;

    constructor(timerUtils: TimerUtils) {
        super();

        this.timerUtils = timerUtils;
    }

    protected action(): void {
        const trig: unit = GetTriggerUnit();
        const abilityLevel: number = GetUnitAbilityLevel(trig, this.abilityId);
        const str: number = GetHeroStr(trig, true);

        const spellTargetUnit: unit = GetSpellTargetUnit();
        const x: number = GetUnitX(trig);
        const y: number = GetUnitY(trig);
        const spellTargetX: number = GetUnitX(spellTargetUnit);
        const spellTargetY: number = GetUnitY(spellTargetUnit);
        const dist: number = Math.sqrt(Pow(spellTargetX - x, 2) + Pow(spellTargetY - y, 2));
        const multX: number = 50 * ((spellTargetX - x) / dist);
        const multY: number = 50 * ((spellTargetY - y) / dist);
        
        DestroyEffect(AddSpecialEffect('Abilities\\Spells\\Orc\\WarStomp\\WarStompCaster.mdl', GetUnitX(spellTargetUnit), GetUnitY(spellTargetUnit)));
        UnitDamageTargetBJ(trig, spellTargetUnit, 70 + abilityLevel * str, ATTACK_TYPE_NORMAL, DAMAGE_TYPE_NORMAL);

        let ticks = 8;
        const t: Timer = this.timerUtils.newTimer();
        t.start(0.03, true, () => {
            ticks--;

            if (UnitAlive(spellTargetUnit)) {
                let targetX: number = GetUnitX(spellTargetUnit);
                let targetY: number = GetUnitY(spellTargetUnit);
                DestroyEffect(AddSpecialEffect('Abilities\\Weapons\\AncientProtectorMissile\\AncientProtectorMissile.mdl', targetX, targetY));
    
                targetX += multX;
                targetY += multY;
                if (IsTerrainPathable(targetX, targetY, PATHING_TYPE_WALKABILITY)) {
                    targetX -= multX;
                    targetY -= multY;
                }
    
                SetUnitPosition(spellTargetUnit, targetX, targetY);
            } else {
                this.timerUtils.releaseTimer(t);
            }

            if (ticks <= 0) {
                this.timerUtils.releaseTimer(t);
            }
        })
    }
}
