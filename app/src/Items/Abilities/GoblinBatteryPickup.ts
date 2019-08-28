import { ItemPickup } from '../ItemPickup';
import { TimerUtils } from '../../Utility/TimerUtils';
import { Timer } from '../../JassOverrides/Timer';
import { GameGlobals } from '../../Game/GameGlobals';

export class GoblinBatteryPickup extends ItemPickup {
    protected readonly itemTypeId: number = FourCC('I01O');
    private readonly gameGlobals: GameGlobals;
    private readonly timerUtils: TimerUtils;

    constructor(gameGlobals: GameGlobals, timerUtils: TimerUtils) {
        super();

        this.gameGlobals = gameGlobals;
        this.timerUtils = timerUtils;
    }

    protected action(): void {
        const playerId: number = GetPlayerId(GetOwningPlayer(GetTriggerUnit()));
        if (GetTriggerUnit() !== this.gameGlobals.PlayerHero[playerId]) {
            return;
        }

        const battery: item = GetManipulatedItem();
        const batteryHandleId: number = GetHandleId(battery);
        this.gameGlobals.GoblinBattery[batteryHandleId] = true;
        const t: Timer = this.timerUtils.newTimer();
        t.start(0.1, true, () => {
            if (this.gameGlobals.GoblinBattery[batteryHandleId]) {
                const charges: number = GetItemCharges(battery);
                if (charges < 100) {
                    const mana: number = GetUnitStateSwap(UNIT_STATE_MANA, this.gameGlobals.PlayerHero[playerId]);
                    if (mana > 0) {
                        SetUnitManaBJ(this.gameGlobals.PlayerHero[playerId], mana - 1);
                        SetItemCharges(battery, charges + 1);
                    }
                }
            } else {
                this.timerUtils.releaseTimer(t);
            }
        });
    }
}
