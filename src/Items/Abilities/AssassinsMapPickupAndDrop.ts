import { ItemPickupAndDrop } from '../ItemPickupAndDrop';

export class AssassinsMapPickupAndDrop extends ItemPickupAndDrop {
    protected readonly itemTypeId: number = FourCC('I02O');

    constructor() {
        super();
    }

    protected pickup(): void {
        const owningPlayer: player = GetOwningPlayer(GetTriggerUnit());

        for (let i = 0; i < bj_MAX_PLAYERS; i++) {
            if (IsPlayerEnemy(Player(i), owningPlayer)) {
                SetPlayerAllianceStateVisionBJ(Player(i), owningPlayer, true);
            }
        }
    }

    protected drop(): void {
        const owningPlayer: player = GetOwningPlayer(GetTriggerUnit());

        for (let i = 0; i < bj_MAX_PLAYERS; i++) {
            if (IsPlayerEnemy(Player(i), owningPlayer)) {
                SetPlayerAllianceStateVisionBJ(Player(i), owningPlayer, false);
            }
        }
    }
}
