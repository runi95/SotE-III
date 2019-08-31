import { ItemUse } from '../ItemUse';
import { TimerUtils } from '../../Utility/TimerUtils';
import { Timer } from '../../JassOverrides/Timer';
import { GameGlobals } from '../../Game/GameGlobals';

export class ScrollOfTownPortalUse extends ItemUse {
    protected readonly itemTypeId: number = FourCC('I01A');
    private readonly dummyAbilityId: number = FourCC('A02X');
    private readonly gameGlobals: GameGlobals;
    private readonly timerUtils: TimerUtils;

    constructor(gameGlobals: GameGlobals, timerUtils: TimerUtils) {
        super();

        this.gameGlobals = gameGlobals;
        this.timerUtils = timerUtils;
    }

    protected action(): void {
        const trig: unit = GetTriggerUnit();
        const playerId: number = GetPlayerId(GetOwningPlayer(trig));
        this.gameGlobals.ScrollOfTownPortal[playerId] = true;

        BlzPauseUnitEx(trig, true);
        UnitAddAbility(trig, this.dummyAbilityId);

        let ticks: number = 100;
        const t: Timer = this.timerUtils.newTimer();
        t.start(0.1, true, () => {
            ticks--;

            if (!this.gameGlobals.ScrollOfTownPortal[playerId]) {
                UnitRemoveAbility(trig, this.dummyAbilityId);
                this.timerUtils.releaseTimer(t);
            }

            if (ticks <= 0) {
                if (this.gameGlobals.ScrollOfTownPortal[playerId]) {
                    UnitRemoveAbility(trig, this.dummyAbilityId);
                    BlzPauseUnitEx(trig, false);
                    SetUnitPosition(trig, GetRectCenterX(this.gameGlobals.PlayerSpawnRegion[playerId]),
                                    GetRectCenterY(this.gameGlobals.PlayerSpawnRegion[playerId]));
                }

                this.timerUtils.releaseTimer(t);
            }
        });
    }
}
