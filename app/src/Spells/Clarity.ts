import { Spell } from './Spell';

export class Clarity extends Spell {
    protected readonly abilityId: number = FourCC('A00M');

    protected action(): void {
        SetUnitManaBJ(GetTriggerUnit(), GetUnitState(GetTriggerUnit(), UNIT_STATE_MANA) + 1.5 * GetHeroInt(GetTriggerUnit(), true));
    }
}
