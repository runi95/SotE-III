import { Spell } from './Spell';

export class Drink extends Spell {
    protected readonly abilityId: number = FourCC('A037');

    protected action(): void {
        SetUnitLifeBJ(GetTriggerUnit(), GetUnitState(GetTriggerUnit(), UNIT_STATE_LIFE) + 2 * GetHeroInt(GetTriggerUnit(), true));
    }
}
