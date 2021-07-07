import { DamageEvent } from '../DamageEngine/DamageEvent';
import { DamageEngineGlobals } from '../DamageEngine/DamageEngineGlobals';
import { GameGlobals } from '../Game/GameGlobals';

export class ScrollOfTownPortal implements DamageEvent {
    private readonly dummyAbilityId: number = FourCC('A02X');
    private readonly gameGlobals: GameGlobals;

    constructor(gameGlobals: GameGlobals) {
        this.gameGlobals = gameGlobals;
    }

    public event(globals: DamageEngineGlobals): void {
        const playerId: number = globals.DamageEventTargetOwningPlayerId as number;

        if (
            this.gameGlobals.ScrollOfTownPortal[playerId] &&
            IsUnitType(globals.DamageEventSource as unit, UNIT_TYPE_HERO) &&
            IsUnitType(globals.DamageEventTarget as unit, UNIT_TYPE_HERO)
        ) {
            this.gameGlobals.ScrollOfTownPortal[playerId] = false;
            UnitRemoveAbility(globals.DamageEventTarget as unit, this.dummyAbilityId);
            BlzPauseUnitEx(globals.DamageEventTarget as unit, false);
        }
    }
}
