import { Trigger } from '../JassOverrides/Trigger';
import { GameGlobals } from './GameGlobals';
import { PlayerVictoryUtils } from '../Utility/PlayerVictoryUtils';

export class Commands {
    private readonly playerVictoryUtils: PlayerVictoryUtils;
    private readonly gameGlobals: GameGlobals;
    private readonly trig: Trigger = new Trigger();

    constructor(gameGlobals: GameGlobals, playerVictoryUtils: PlayerVictoryUtils) {
        this.gameGlobals = gameGlobals;
        this.playerVictoryUtils = playerVictoryUtils;

        this.trig.addAction(() => this.action());
        this.trig.registerPlayerChatEvent(Player(0), '-', false);
        this.trig.registerPlayerChatEvent(Player(1), '-', false);
        this.trig.registerPlayerChatEvent(Player(2), '-', false);
        this.trig.registerPlayerChatEvent(Player(3), '-', false);
        this.trig.registerPlayerChatEvent(Player(4), '-', false);
        this.trig.registerPlayerChatEvent(Player(5), '-', false);
    }

    private action(): void {
        const chatstring: string = GetEventPlayerChatString();
        if (!chatstring.startsWith('-')) {
            return;
        }

        const split: string[] = chatstring.substr(1).split(' ');
        if (split[0] === 'help') {
            DisplayTextToPlayer(GetTriggerPlayer(), 0, 0, 'If you need help check out the quests menu');
        } else if (this.gameGlobals.DebugMode && split[0] === 'gold' && split.length === 2) {
            const gold: number = Number(split[1]);
            if (!gold) {
                DisplayTextToPlayer(GetTriggerPlayer(), 0, 0, 'Invalid gold amount!');
                return;
            }

            SetPlayerStateBJ(GetTriggerPlayer(), PLAYER_STATE_RESOURCE_GOLD, gold);
        } else if (this.gameGlobals.DebugMode && split[0] === 'lumber' && split.length === 2) {
            const lumber: number = Number(split[1]);
            if (!lumber) {
                DisplayTextToPlayer(GetTriggerPlayer(), 0, 0, 'Invalid lumber amount!');
                return;
            }

            SetPlayerStateBJ(GetTriggerPlayer(), PLAYER_STATE_RESOURCE_LUMBER, lumber);
        } else if (this.gameGlobals.DebugMode && split[0] === 'tp' && split.length === 1) {
            this.gameGlobals.TeleportMovement = !this.gameGlobals.TeleportMovement;
            if (this.gameGlobals.TeleportMovement) {
                DisplayTextToPlayer(GetTriggerPlayer(), 0, 0, 'Teleport movement has been |c0020C000activated|r!');
            } else {
                DisplayTextToPlayer(GetTriggerPlayer(), 0, 0, 'Teleport movement has been |c00FF0303deactivated|r!');
            }
        } else if (this.gameGlobals.DebugMode && split[0] === 'anim' && split.length === 2) {
            const playerId: number = GetPlayerId(GetTriggerPlayer());
            if (this.gameGlobals.PlayerHero[playerId] !== undefined) {
                SetUnitAnimationByIndex(this.gameGlobals.PlayerHero[playerId], Number(split[1]));
            }
        } else if (this.gameGlobals.DebugMode && split[0] === 'defeat' && split.length === 2) {
            this.playerVictoryUtils.defeatPlayer(Number(split[1]), 'has been forcefully defeated!');
        } else if (this.gameGlobals.DebugMode && split[0] === 'speed' && split.length === 1) {
            const playerId: number = GetPlayerId(GetTriggerPlayer());
            if (this.gameGlobals.PlayerHero[playerId] !== undefined) {
                DisplayTextToPlayer(
                    GetTriggerPlayer(),
                    0,
                    0,
                    `Current movementspeed: ${GetUnitMoveSpeed(this.gameGlobals.PlayerHero[playerId])}`,
                );
            }
        } else {
            DisplayTextToPlayer(GetTriggerPlayer(), 0, 0, 'Unknown command!');
        }
    }
}
