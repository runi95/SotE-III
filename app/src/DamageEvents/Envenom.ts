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
        if (globals.IsDamageSpell) {
            return;
        }

        const abilityLevel: number = GetUnitAbilityLevel(globals.DamageEventSource as unit, this.abilityId);

        if (abilityLevel > 0) {
            globals.DamageEventAmount +=
                80 * GetUnitAbilityLevel(globals.DamageEventSource as unit, this.envenomAbilityId) +
                GetHeroInt(globals.DamageEventSource as unit, true);
            if (abilityLevel > 1) {
                DecUnitAbilityLevel(globals.DamageEventSource as unit, this.abilityId);
            } else {
                UnitRemoveAbility(globals.DamageEventSource as unit, this.abilityId);
            }
        }
    }
}
