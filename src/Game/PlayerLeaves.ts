import { Trigger } from '../JassOverrides/Trigger';
import { PlayerVictoryUtils } from '../Utility/PlayerVictoryUtils';

export class PlayerLeaves {
    private readonly playerVictoryUtils: PlayerVictoryUtils;
    private readonly trig: Trigger = new Trigger();

    constructor(playerVictoryUtil: PlayerVictoryUtils) {
        this.playerVictoryUtils = playerVictoryUtil;

        this.trig.addAction(() => this.action());
        for (let i = 0; i < bj_MAX_PLAYERS; i++) {
            this.trig.registerPlayerEventLeave(Player(i));
        }
    }

    private action(): void {
        const playerId: number = GetPlayerId(GetTriggerPlayer());
        this.playerVictoryUtils.defeatPlayer(playerId, 'has left the game!');
    }
}
