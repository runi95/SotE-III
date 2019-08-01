import { Trigger } from '../JassOverrides/Trigger';

export class Commands {
    private readonly debugMode: boolean;
    private readonly trig: Trigger = new Trigger();

    constructor(debugMode: boolean) {
        this.debugMode = debugMode;

        this.trig.AddAction(() => this.action());
        this.trig.RegisterPlayerChatEvent(Player(0), '-', false);
        this.trig.RegisterPlayerChatEvent(Player(1), '-', false);
        this.trig.RegisterPlayerChatEvent(Player(2), '-', false);
        this.trig.RegisterPlayerChatEvent(Player(3), '-', false);
        this.trig.RegisterPlayerChatEvent(Player(4), '-', false);
        this.trig.RegisterPlayerChatEvent(Player(5), '-', false);
    }

    private action(): void {
        const chatstring: string = GetEventPlayerChatString();
        if (!chatstring.startsWith('-')) {
            return;
        }

        const substr: string = chatstring.substr(1);
        if (this.debugMode && substr.startsWith('gold ')) {
            const gold: number = parseInt(substr.substr('gold '.length), undefined);
            if (!gold) {
                BJDebugMsg('Invalid gold amount!');
                return;
            }

            SetPlayerStateBJ(GetTriggerPlayer(), PLAYER_STATE_RESOURCE_GOLD, gold);
        } else if (this.debugMode && substr.startsWith('lumber ')) {
            const lumber: number = parseInt(substr.substr('lumber '.length), undefined);
            if (!lumber) {
                BJDebugMsg('Invalid lumber amount!');
                return;
            }

            SetPlayerStateBJ(GetTriggerPlayer(), PLAYER_STATE_RESOURCE_LUMBER, lumber);
        }
    }
}
