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
        UnitAddAbility(trig, this.dummyAbilityId);

        const t: Timer = this.timerUtils.newTimer();
        t.start(4.00, false, () => {
            if (GetUnitAbilityLevel(trig, this.dummyAbilityId) > 0) {
                UnitRemoveAbility(trig, this.dummyAbilityId);
                const playerId: number = GetPlayerId(GetOwningPlayer(trig));
                SetUnitPosition(trig, GetRectCenterX(this.gameGlobals.PlayerSpawnRegion[playerId]),
                                GetRectCenterY(this.gameGlobals.PlayerSpawnRegion[playerId]));
            }

            this.timerUtils.releaseTimer(t);
        });
    }
}
