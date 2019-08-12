import { Spell } from './Spell';
import { GameGlobals } from '../Game/GameGlobals';

export class DivineShield extends Spell {
    protected readonly abilityId: number = FourCC('A033');
    private readonly dummyAbilityId: number = FourCC('A034');
    private readonly gameGlobals: GameGlobals;

    constructor(gameGlobals: GameGlobals) {
        super();

        this.gameGlobals = gameGlobals;
    }

    protected action(): void {
        const playerId: number = GetPlayerId(GetOwningPlayer(GetTriggerUnit()));
        const intelligence: number = GetHeroInt(GetTriggerUnit(), true);
        const abilityLevel: number = GetUnitAbilityLevel(GetTriggerUnit(), this.abilityId);
        const shieldLife: number = 100 * abilityLevel + intelligence;
        this.gameGlobals.DivineShieldLife[playerId] = shieldLife;

        UnitAddAbility(GetTriggerUnit(), this.dummyAbilityId);
    }
}
