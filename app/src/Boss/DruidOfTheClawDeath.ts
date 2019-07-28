import { Trigger } from '../JassOverrides/Trigger';
import { GameGlobals } from '../Game/GameGlobals';

export class DruidOfTheClawDeath {
    private readonly gameGlobals: GameGlobals;
    private readonly trig: Trigger = new Trigger();

    constructor(gameGlobals: GameGlobals) {
        this.gameGlobals = gameGlobals;

        this.trig.AddCondition(() => this.condition());
        this.trig.AddAction(() => this.action());
        this.trig.RegisterAnyUnitEventBJ(EVENT_PLAYER_UNIT_DEATH);
    }

    private condition(): boolean {
        return GetTriggerUnit() === this.gameGlobals.BossDruidOfTheClaw;
    }

    private action(): void {
        this.gameGlobals.BossDruidOfTheClaw = undefined;
    }
}
