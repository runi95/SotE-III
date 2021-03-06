import { GameGlobals } from '../Game/GameGlobals';
import { Trigger } from '../JassOverrides/Trigger';

export class CryostasisStop {
    private readonly abilityId: number = FourCC('A01M');
    private readonly gameGlobals: GameGlobals;
    private readonly trig: Trigger = new Trigger();

    constructor(gameGlobals: GameGlobals) {
        this.gameGlobals = gameGlobals;
        this.trig.addCondition(() => this.condition());
        this.trig.addAction(() => this.action());
        this.trig.registerAnyUnitEventBJ(EVENT_PLAYER_UNIT_SPELL_ENDCAST);
    }

    private condition(): boolean {
        return GetSpellAbilityId() === this.abilityId;
    }

    private action(): void {
        RemoveUnit(this.gameGlobals.CryostasisSummons.splice(GetPlayerId(GetOwningPlayer(GetTriggerUnit())), 1)[0]);
    }
}
