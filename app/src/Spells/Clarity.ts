import { Spell } from './Spell';

export class Clarity extends Spell {
    protected readonly abilityId: number = FourCC('A00M');

    protected action(): void {
        SetUnitManaBJ(GetTriggerUnit(), GetUnitStateSwap(UNIT_STATE_MANA,
                                                         GetTriggerUnit()) + 1.5 * I2R(GetHeroInt(GetTriggerUnit(), true)));
    }
}
