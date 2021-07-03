import { GameGlobals } from '../../Game/GameGlobals';
import { Trigger } from '../../JassOverrides/Trigger';
import { FigurineBuff, FigurineTypes } from '../../Utility/buffs/FigurineBuff';
import { BuffUtils } from '../../Utility/BuffUtils';

export class ScalyFigurineCast {
    protected readonly itemTypeId: number = FourCC('I05F');
    private readonly trig: Trigger = new Trigger();
    private readonly gameGlobals: GameGlobals;
    private readonly buffUtils: BuffUtils;

    constructor(gameGlobals: GameGlobals, buffUtils: BuffUtils) {
        this.gameGlobals = gameGlobals;
        this.buffUtils = buffUtils;

        this.trig.addCondition(() => this.condition());
        this.trig.addAction(() => this.action());
        this.trig.registerAnyUnitEventBJ(EVENT_PLAYER_UNIT_SPELL_EFFECT);
    }

    private condition(): boolean {
        return UnitHasItemOfTypeBJ(GetTriggerUnit(), this.itemTypeId);
    }

    private action(): void {
        const trig: unit = GetTriggerUnit();
        this.buffUtils.applyBuff(trig, new FigurineBuff(GetPlayerId(GetOwningPlayer(trig)), FigurineTypes.SCALY_FIGURINE, this.gameGlobals));
    }
}
