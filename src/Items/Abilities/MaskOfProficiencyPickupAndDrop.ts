import { GameGlobals } from '../../Game/GameGlobals';
import { ItemPickupAndDrop } from '../ItemPickupAndDrop';
import { Timer } from '../../JassOverrides/Timer';
import { TimerUtils } from '../../Utility/TimerUtils';

export class MaskOfProficiencyPickupAndDrop extends ItemPickupAndDrop {
    protected readonly itemTypeId: number = FourCC('I026');
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

        const maskOfProficiency: item = GetManipulatedItem();
        const maskOfProficiencyHandleId: number = GetHandleId(maskOfProficiency);
        this.gameGlobals.MaskOfProficiency[maskOfProficiencyHandleId] = true;
        const t: Timer = this.timerUtils.newTimer();
        t.start(1, true, () => {
            if (this.gameGlobals.MaskOfProficiency[maskOfProficiencyHandleId]) {
                const charges: number = GetItemCharges(maskOfProficiency);
                if (charges < 12) {
                    SetItemCharges(maskOfProficiency, charges + 1);
                }
            } else {
                this.timerUtils.releaseTimer(t);
            }
        });
    }

    protected drop(): void {
        const itemHandleId: number = GetHandleId(GetManipulatedItem());
        this.gameGlobals.MaskOfProficiency[itemHandleId] = false;
    }
}
