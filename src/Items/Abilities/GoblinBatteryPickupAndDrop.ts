import { GameGlobals } from '../../Game/GameGlobals';
import { ItemPickupAndDrop } from '../ItemPickupAndDrop';
import { Timer } from '../../JassOverrides/Timer';
import { TimerUtils } from '../../Utility/TimerUtils';

export class GoblinBatteryPickupAndDrop extends ItemPickupAndDrop {
    protected readonly itemTypeId: number = FourCC('I01O');
    private readonly gameGlobals: GameGlobals;
    private readonly timerUtils: TimerUtils;

    constructor(gameGlobals: GameGlobals, timerUtils: TimerUtils) {
        super();

        this.gameGlobals = gameGlobals;
        this.timerUtils = timerUtils;
    }

    protected pickup(): void {
        const playerId: number = GetPlayerId(GetOwningPlayer(GetTriggerUnit()));
        if (GetTriggerUnit() !== this.gameGlobals.PlayerHero[playerId]) {
            return;
        }

        const battery: item = GetManipulatedItem();
        const batteryHandleId: number = GetHandleId(battery);
        this.gameGlobals.GoblinBattery[batteryHandleId] = true;
        const t: Timer = this.timerUtils.newTimer();
        t.start(1, true, () => {
            if (this.gameGlobals.GoblinBattery[batteryHandleId]) {
                const charges: number = GetItemCharges(battery);
                if (charges < 100) {
                    const mana: number = GetUnitState(this.gameGlobals.PlayerHero[playerId], UNIT_STATE_MANA);
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

    protected drop(): void {
        const itemHandleId: number = GetHandleId(GetManipulatedItem());
        this.gameGlobals.GoblinBattery[itemHandleId] = false;
    }
}
