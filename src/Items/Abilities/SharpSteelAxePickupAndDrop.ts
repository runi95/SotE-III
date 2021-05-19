import { GameGlobals, ChargedItemStates } from '../../Game/GameGlobals';
import { ItemPickupAndDrop } from '../ItemPickupAndDrop';
import { TimerUtils } from '../../Utility/TimerUtils';
import { Timer } from '../../JassOverrides/Timer';

export class SharpSteelAxePickupAndDrop extends ItemPickupAndDrop {
    protected readonly itemTypeId: number = FourCC('I00Q');
    private readonly gameGlobals: GameGlobals;
    private readonly timerUtils: TimerUtils;

    constructor(gameGlobals: GameGlobals, timerUtils: TimerUtils) {
        super();

        this.gameGlobals = gameGlobals;
        this.timerUtils = timerUtils;
    }

    protected pickup(): void {
        const playerId: number = GetPlayerId(GetOwningPlayer(GetTriggerUnit()));
        this.gameGlobals.SharpSteelAxeCount[playerId] += 1;

        if (this.gameGlobals.SharpSteelAxeCount[playerId] > 1) {
            return;
        }

        const t: Timer = this.timerUtils.newTimer();
        t.start(1, true, () => {
            if (this.gameGlobals.SharpSteelAxeCount[playerId] === 0) {
                t.destroy();
            }

            const item: item = GetItemOfTypeFromUnitBJ(this.gameGlobals.PlayerHero[playerId], this.itemTypeId);
            const itemCharges: number = GetItemCharges(item);
            if (itemCharges < 60) {
                SetItemCharges(item, itemCharges + 1);
            } else {
                this.gameGlobals.SharpSteelAxe[playerId] = ChargedItemStates.READY;
            }
        });
    }

    protected drop(): void {
        const playerId: number = GetPlayerId(GetOwningPlayer(GetTriggerUnit()));
        this.gameGlobals.AssassinsBladeCount[playerId] -= 1;

        if (this.gameGlobals.AssassinsBladeCount[playerId] < 1) {
            this.gameGlobals.AssassinsBlade[playerId] = ChargedItemStates.UNEQUIPPED;
        }
    }
}
