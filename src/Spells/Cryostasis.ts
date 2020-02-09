import { Spell } from './Spell';
import { GameGlobals } from '../Game/GameGlobals';

export class Cryostasis extends Spell {
    protected readonly abilityId: number = FourCC('A01M');
    private readonly gameGlobals: GameGlobals;
    private readonly dummyUnitTypeId: number = FourCC('n00K');

    constructor(gameGlobals: GameGlobals) {
        super();

        this.gameGlobals = gameGlobals;
    }

    protected action(): void {
        const x: number = GetUnitX(GetTriggerUnit());
        const y: number = GetUnitY(GetTriggerUnit());
        const abilityLevel: number = GetUnitAbilityLevel(GetTriggerUnit(), this.abilityId);
        const intelligence: number = GetHeroInt(GetTriggerUnit(), true);
        const damage: number = 75 * abilityLevel + 3 * intelligence;
        const playerid: number = GetPlayerId(GetOwningPlayer(GetTriggerUnit()));
        this.gameGlobals.CryostasisSummons[playerid] = CreateUnit(GetOwningPlayer(GetTriggerUnit()), this.dummyUnitTypeId, x, y, 0);
        BlzSetUnitBaseDamage(this.gameGlobals.CryostasisSummons[playerid], damage, 0);
    }
}
