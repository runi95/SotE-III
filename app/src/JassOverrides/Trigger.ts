import { Log } from '../lib/Serilog/Serilog';

export class Trigger {
    private readonly nativeTrigger: trigger;

    constructor() {
        this.nativeTrigger = CreateTrigger();
    }

    public static evaluateCondition(func: () => boolean): boolean {
        let answer: boolean = false;

        xpcall(() => {
            answer = func();
        },
               (err: any) => {
                   this.printError(err);
               });

        return answer;
    }

    public static printError(err: any): void {
        Log.Fatal(err);
    }

    public addAction(actionFunc: () => void): triggeraction {
        return TriggerAddAction(this.nativeTrigger, () => xpcall(() => actionFunc(), err => Trigger.printError(err)));

    }

    public registerTimerEvent(timeout: number, periodic: boolean): event {
        return TriggerRegisterTimerEvent(this.nativeTrigger, timeout, periodic);
    }

    public registerTimerEventSingle(timeout: number): event {
        return TriggerRegisterTimerEventSingle(this.nativeTrigger, timeout);
    }

    public registerTimerEventPeriodic(timeout: number): event {
        return TriggerRegisterTimerEventPeriodic(this.nativeTrigger, timeout);
    }

    public registerPlayerStateEvent(whichPlayer: player, whichState: playerstate, opcode: limitop, limitval: number): event {
        return TriggerRegisterPlayerStateEvent(this.nativeTrigger, whichPlayer, whichState, opcode, limitval);
    }

    public registerDeathEvent(whichWidget: widget): event {
        return TriggerRegisterDeathEvent(this.nativeTrigger, whichWidget);
    }

    public registerDialogEventBJ(whichDialog: dialog): event {
        return TriggerRegisterDialogEventBJ(this.nativeTrigger, whichDialog);
    }

    public registerDialogButtonEvent(whichButton: button): event {
        return TriggerRegisterDialogButtonEvent(this.nativeTrigger, whichButton);
    }

    public registerEnterRectSimple(r: rect): event {
        return TriggerRegisterEnterRectSimple(this.nativeTrigger, r);
    }

    public addCondition(func: () => boolean): triggercondition {
        return TriggerAddCondition(this.nativeTrigger, Condition(() => Trigger.evaluateCondition(func)));
    }

    public addFilterFuncCondition(filter: filterfunc): triggercondition {
        return TriggerAddCondition(this.nativeTrigger, filter);
    }

    public registerAnyUnitEventBJ(whichEvent: playerunitevent): void {
        TriggerRegisterAnyUnitEventBJ(this.nativeTrigger, whichEvent);
    }

    public registerPlayerChatEvent(whichPlayer: player, chatMessageToDetect: string, exactMatchOnly: boolean): event {
        return TriggerRegisterPlayerChatEvent(this.nativeTrigger, whichPlayer, chatMessageToDetect, exactMatchOnly);
    }

    public registerPlayerUnitEventSimple(whichPlayer: player, whichEvent: playerunitevent): event {
        return TriggerRegisterPlayerUnitEventSimple(this.nativeTrigger, whichPlayer, whichEvent);
    }

    public registerFrameEvent(whichFrameHandle: framehandle, whichEvent: frameeventtype): event {
        return BlzTriggerRegisterFrameEvent(this.nativeTrigger, whichFrameHandle, whichEvent);
    }

    public registerPlayerSyncEvent(whichPlayer: player, prefix: string, fromServer: boolean): event {
        return BlzTriggerRegisterPlayerSyncEvent(this.nativeTrigger, whichPlayer, prefix, fromServer);
    }

    public registerPlayerEventLeave(whichPlayer: player): event {
        return TriggerRegisterPlayerEventLeave(this.nativeTrigger, whichPlayer);
    }
}
