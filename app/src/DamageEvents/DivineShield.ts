import { DamageEvent } from '../DamageEngine/DamageEvent';
import { DamageEngineGlobals } from '../DamageEngine/DamageEngineGlobals';
import { GameGlobals } from '../Game/GameGlobals';

export class DivineShield implements DamageEvent {
    private readonly dummyAbilityId: number = FourCC('A034');
    private readonly gameGlobals: GameGlobals;

    constructor(gameGlobals: GameGlobals) {
        this.gameGlobals = gameGlobals;
    }

    public event(globals: DamageEngineGlobals): void {
        if (GetUnitAbilityLevel(globals.DamageEventTarget as unit, this.dummyAbilityId) < 1) {
            return;
        }

        const playerId: number = GetPlayerId(GetOwningPlayer(globals.DamageEventTarget as unit));
        const blockedDamage: number = Math.min(this.gameGlobals.DivineShieldLife[playerId], globals.DamageEventAmount);
        this.gameGlobals.DivineShieldLife[playerId] -= blockedDamage;
        globals.DamageEventAmount -= blockedDamage;

        if (this.gameGlobals.DivineShieldLife[playerId] <= 0) {
            UnitRemoveAbility(globals.DamageEventTarget as unit, this.dummyAbilityId);
            this.gameGlobals.DivineShieldLife[playerId] = 0;
        }
    }
}
