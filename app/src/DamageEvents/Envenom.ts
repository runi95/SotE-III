import { DamageEvent } from '../DamageEngine/DamageEvent';
import { DamageEngineGlobals } from '../DamageEngine/DamageEngineGlobals';
import { GameGlobals } from '../Game/GameGlobals';

export class Envenom implements DamageEvent {
    private readonly gameGlobals: GameGlobals;
    private readonly abilityId: number = FourCC('A017');
    private readonly envenomAbilityId: number = FourCC('A010');

    constructor(gameGlobals: GameGlobals) {
        this.gameGlobals = gameGlobals;
    }

    public event(globals: DamageEngineGlobals): void {
        const abilityLevel: number = GetUnitAbilityLevelSwapped(this.abilityId, globals.DamageEventSource as unit);

        if (abilityLevel > 0) {
            globals.DamageEventAmount += GetHeroInt(globals.DamageEventSource as unit, true)
                + 25 * GetUnitAbilityLevel(globals.DamageEventSource as unit, this.envenomAbilityId);
            if (abilityLevel > 1) {
                DecUnitAbilityLevel(globals.DamageEventSource as unit, this.abilityId);
            } else {
                UnitRemoveAbility(globals.DamageEventSource as unit, this.abilityId);
            }
        }
    }
}
