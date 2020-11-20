import { GameGlobals } from '../../Game/GameGlobals';
import { ItemPickupAndDrop } from '../ItemPickupAndDrop';
import { Timer } from '../../JassOverrides/Timer';
import { TimerUtils } from '../../Utility/TimerUtils';

export class FullVialPickupAndDrop extends ItemPickupAndDrop {
    protected readonly itemTypeId: number = FourCC('I016');
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

        const fullVial: item = GetManipulatedItem();
        const fullVialHandleId: number = GetHandleId(fullVial);
        this.gameGlobals.FullVial[fullVialHandleId] = true;
        const t: Timer = this.timerUtils.newTimer();
        t.start(1, true, () => {
            if (this.gameGlobals.FullVial[fullVialHandleId]) {
                const charges: number = GetItemCharges(fullVial);
                if (charges < 60) {
                    SetItemCharges(fullVial, charges + 1);
                }
            } else {
                this.timerUtils.releaseTimer(t);
            }
        });
    }

    protected drop(): void {
        const itemHandleId: number = GetHandleId(GetManipulatedItem());
        this.gameGlobals.FullVial[itemHandleId] = false;
    }
}
