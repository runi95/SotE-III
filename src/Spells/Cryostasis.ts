import { Spell } from './Spell';
import { GameGlobals } from '../Game/GameGlobals';
import { SpellCastUtils } from '../Utility/SpellCastUtils';

export class Cryostasis extends Spell {
    protected readonly abilityId: number = FourCC('A01M');
    private readonly dummyUnitTypeId: number = FourCC('n00K');
    private readonly gameGlobals: GameGlobals;
    private readonly spellCastUtils: SpellCastUtils;

    constructor(gameGlobals: GameGlobals, spellCastUtils: SpellCastUtils) {
        super();

        this.gameGlobals = gameGlobals;
        this.spellCastUtils = spellCastUtils;
    }

    protected action(): void {
        const x: number = GetUnitX(GetTriggerUnit());
        const y: number = GetUnitY(GetTriggerUnit());
        const abilityLevel: number = GetUnitAbilityLevel(GetTriggerUnit(), this.abilityId);
        const intelligence: number = this.spellCastUtils.GetIntelligence(GetTriggerUnit());
        const damage: number = 20 * abilityLevel + 0.5 * intelligence;
        const playerid: number = GetPlayerId(GetOwningPlayer(GetTriggerUnit()));
        this.gameGlobals.CryostasisSummons[playerid] = CreateUnit(GetOwningPlayer(GetTriggerUnit()), this.dummyUnitTypeId, x, y, 0);
        BlzSetUnitBaseDamage(this.gameGlobals.CryostasisSummons[playerid], damage, 0);
    }
}
