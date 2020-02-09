import { ItemPickup } from '../ItemPickup';

export class AssassinsMapPickup extends ItemPickup {
    protected readonly itemTypeId: number = FourCC('I02O');

    constructor() {
        super();
    }

    protected action(): void {
        const owningPlayer: player = GetOwningPlayer(GetTriggerUnit());

        for (let i: number = 0; i < bj_MAX_PLAYERS; i++) {
            if (IsPlayerEnemy(Player(i), owningPlayer)) {
                SetPlayerAllianceStateVisionBJ(Player(i), owningPlayer, true);
            }
        }
    }
}
