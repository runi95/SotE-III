import { Trigger } from '../JassOverrides/Trigger';
import { GameGlobals } from '../Game/GameGlobals';

export class DruidOfTheClawSpawn {
    private readonly bossId: number = FourCC('n015');
    private readonly region: rect = Rect(-608, 13984, -544, 14048);
    private readonly gameGlobals: GameGlobals;
    private readonly trig: Trigger = new Trigger();

    constructor(gameGlobals: GameGlobals) {
        this.gameGlobals = gameGlobals;

        this.trig.addCondition(() => this.condition());
        this.trig.addAction(() => this.action());
        this.trig.registerEnterRectSimple(this.region);
    }

    private condition(): boolean {
        if (!IsUnitType(GetTriggerUnit(), UNIT_TYPE_HERO)) {
            return false;
        }

        return this.gameGlobals.BossDruidOfTheClaw === undefined;
    }

    private action(): void {
        this.gameGlobals.BossDruidOfTheClaw = CreateUnit(Player(PLAYER_NEUTRAL_AGGRESSIVE), this.bossId, -578.00, 14020.00, 265.00);
    }
}
