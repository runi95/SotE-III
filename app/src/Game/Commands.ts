import { Trigger } from '../JassOverrides/Trigger';
import { GameGlobals } from './GameGlobals';

export class Commands {
    private readonly gameGlobals: GameGlobals;
    private readonly trig: Trigger = new Trigger();

    constructor(gameGlobals: GameGlobals) {
        this.gameGlobals = gameGlobals;

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

        const substr: string = chatstring.substr(1);
        if (this.gameGlobals.DebugMode && substr.startsWith('gold ')) {
            const gold: number = parseInt(substr.substr('gold '.length), undefined);
            if (!gold) {
                BJDebugMsg('Invalid gold amount!');
                return;
            }

            SetPlayerStateBJ(GetTriggerPlayer(), PLAYER_STATE_RESOURCE_GOLD, gold);
        } else if (this.gameGlobals.DebugMode && substr.startsWith('lumber ')) {
            const lumber: number = parseInt(substr.substr('lumber '.length), undefined);
            if (!lumber) {
                BJDebugMsg('Invalid lumber amount!');
                return;
            }

            SetPlayerStateBJ(GetTriggerPlayer(), PLAYER_STATE_RESOURCE_LUMBER, lumber);
        } else if (this.gameGlobals.DebugMode && substr === 'tp') {
            this.gameGlobals.TeleportMovement = !this.gameGlobals.TeleportMovement;
            if (this.gameGlobals.TeleportMovement) {
                BJDebugMsg('Teleport movement has been |c0020C000activated|r!');
            } else {
                BJDebugMsg('Teleport movement has been |c00FF0303deactivated|r!');
            }
        }
    }
}
