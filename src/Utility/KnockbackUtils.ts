import { Timer } from '../JassOverrides/Timer';
import { TimerUtils } from '../Utility/TimerUtils';
import { KnockbackUnit } from './KnockbackUnit';

export class KnockbackUtils {
    private readonly timerUtils: TimerUtils;
    
    constructor(timerUtils: TimerUtils) {
        this.timerUtils = timerUtils;
    }

    public knockback(knockbackUnit: KnockbackUnit): void {
        BlzPauseUnitEx(knockbackUnit.knockbackTarget, true);
        
        const diffX: number = knockbackUnit.targetX - GetUnitX(knockbackUnit.knockbackTarget);
        const diffY: number = knockbackUnit.targetY - GetUnitY(knockbackUnit.knockbackTarget);
        const distFromTarget: number = Math.sqrt(Pow(diffX, 2) + Pow(diffY, 2));
        const multX: number = knockbackUnit.vel * (diffX / distFromTarget);
        const multY: number = knockbackUnit.vel * (diffY / distFromTarget);

        let ticks = Math.ceil(knockbackUnit.dist / knockbackUnit.vel);
        let done = false;
        const t: Timer = this.timerUtils.newTimer();
        t.start(0.03, true, () => {
            ticks--;

            if (UnitAlive(knockbackUnit.knockbackTarget)) {
                const tX: number = GetUnitX(knockbackUnit.knockbackTarget);
                const tY: number = GetUnitY(knockbackUnit.knockbackTarget);
                let moveToX: number = tX + multX;
                let moveToY: number = tY + multY;
                // DestroyEffect(AddSpecialEffect('Objects\\Spawnmodels\\Undead\\ImpaleTargetDust\\ImpaleTargetDust.mdl', tX, tY));
                DestroyEffect(AddSpecialEffect('Abilities\\Weapons\\AncientProtectorMissile\\AncientProtectorMissile.mdl', tX, tY));
    
                if (IsTerrainPathable(moveToX, moveToY, PATHING_TYPE_WALKABILITY)) {
                    moveToX -= multX;
                    moveToY -= multY;
                    if (knockbackUnit.onWallHit !== undefined) {
                        done = knockbackUnit.onWallHit();
                    } else {
                        done = true;
                    }
                }

                SetUnitPosition(knockbackUnit.knockbackTarget, moveToX, moveToY);
            } else {
                done = true;
            }

            if (ticks <= 0) {
                done = true;
            }

            if (done) {
                if (knockbackUnit.onKnockbackEnd !== undefined) {
                    knockbackUnit.onKnockbackEnd();
                }
                BlzPauseUnitEx(knockbackUnit.knockbackTarget, false);
                this.timerUtils.releaseTimer(t);
            }
        });
    }
}