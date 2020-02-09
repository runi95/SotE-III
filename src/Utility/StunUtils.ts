import { StunnedUnit } from './StunnedUnit';
import { TimerUtils } from './TimerUtils';
import { Timer } from '../JassOverrides/Timer';
import { GameGlobals } from '../Game/GameGlobals';

export class StunUtils {
    private readonly stunAbilityId: number = FourCC('A00S');
    private readonly scrollOfTownPortalAbilityId: number = FourCC('A02X');
    private readonly stunnedUnits: Map<number, StunnedUnit>;
    private readonly gameGlobals: GameGlobals;
    private readonly timerUtils: TimerUtils;

    constructor(gameGlobals: GameGlobals, timerUtils: TimerUtils) {
        this.gameGlobals = gameGlobals;
        this.timerUtils = timerUtils;
        this.stunnedUnits = new Map<number, StunnedUnit>();
    }

    /**
     * Stun a unit for a certain amount of time
     *
     * @param u - The unit to stun
     * @param duration - The duration (in seconds) to stun the unit for
     */
    public stunUnit(u: unit, duration: number): void {
        const handleId: number = GetHandleIdBJ(u);
        if (this.stunnedUnits.has(handleId)) {
            (this.stunnedUnits.get(handleId) as StunnedUnit).addDuration(duration);
        } else {
            const playerId: number = GetPlayerId(GetOwningPlayer(u));
            if (this.gameGlobals.ScrollOfTownPortal[playerId] && IsUnitType(u, UNIT_TYPE_HERO)) {
                this.gameGlobals.ScrollOfTownPortal[playerId] = false;
                UnitRemoveAbility(u, this.scrollOfTownPortalAbilityId);
            }

            const stunnedUnit: StunnedUnit = new StunnedUnit(u, duration);
            this.stunnedUnits.set(handleId, stunnedUnit);
            UnitAddAbilityBJ(this.stunAbilityId, stunnedUnit.getUnit());
            BlzPauseUnitEx(stunnedUnit.getUnit(), true);
            const t: Timer = this.timerUtils.newTimer();
            t.start(0.05, true, () => {
                stunnedUnit.addDuration(-0.05);
                if (stunnedUnit.getDuration() <= 0) {
                    UnitRemoveAbility(stunnedUnit.getUnit(), this.stunAbilityId);
                    BlzPauseUnitEx(stunnedUnit.getUnit(), false);
                    this.stunnedUnits.delete(handleId);
                    this.timerUtils.releaseTimer(t);
                }
            });
        }
    }

    public clearAllStuns(): void {
        this.stunnedUnits.forEach((value: StunnedUnit) => value.setDuration(0));
    }
}
