import { Trigger } from '../JassOverrides/Trigger';
import { GameGlobals } from './GameGlobals';
import { PlayerVictoryUtils } from '../Utility/PlayerVictoryUtils';

export class PlayerRespawn {
    private readonly gameGlobals: GameGlobals;
    private readonly playerVictoryUtils: PlayerVictoryUtils;
    private readonly trig: Trigger = new Trigger();

    constructor(gameGlobals: GameGlobals, playerVictoryUtils: PlayerVictoryUtils) {
        this.gameGlobals = gameGlobals;
        this.playerVictoryUtils = playerVictoryUtils;

        this.trig.addCondition(() => this.condition());
        this.trig.addAction(() => this.action());
        this.trig.registerAnyUnitEventBJ(EVENT_PLAYER_UNIT_DEATH);
    }

    private condition(): boolean {
        return IsUnitType(GetTriggerUnit(), UNIT_TYPE_HERO);
    }

    private action(): void {
        const playerId: number = GetPlayerId(GetOwningPlayer(GetTriggerUnit()));
        DisplayTextToForce(
            GetPlayersAll(),
            // tslint:disable-next-line:max-line-length
            `${this.gameGlobals.PlayerColorCodes[playerId]}${GetPlayerName(Player(playerId))}|r has died!`,
        );
        this.gameGlobals.RazorBladesOn[playerId] = false;
        this.gameGlobals.PlayerLives[playerId] -= 1;
        if (this.gameGlobals.PlayerLives[playerId] > 0) {
            MultiboardSetItemValueBJ(
                this.gameGlobals.Multiboard as multiboard,
                2,
                2 + playerId,
                I2S(this.gameGlobals.PlayerLives[playerId]),
            );
            TriggerSleepAction(RMinBJ(I2R(GetHeroLevel(GetTriggerUnit())), 10.0));
            if (!this.gameGlobals.IsArenaBattleInProgress) {
                ReviveHero(
                    GetTriggerUnit(),
                    GetRectCenterX(this.gameGlobals.PlayerSpawnRegion[playerId]),
                    GetRectCenterY(this.gameGlobals.PlayerSpawnRegion[playerId]),
                    true,
                );
                SetUnitManaPercentBJ(GetTriggerUnit(), 100);
            }
        } else {
            this.playerVictoryUtils.defeatPlayer(playerId, 'has been defeated!');
        }
    }
}
