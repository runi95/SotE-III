import { Spell } from './Spell';

export class HolyLight extends Spell {
    protected readonly abilityId: number = FourCC('A031');

    protected action(): void {
        const trig: unit = GetTriggerUnit();
        const targ: unit = GetSpellTargetUnit();
        const abilityLevel: number = GetUnitAbilityLevel(trig, this.abilityId);
        const intelligence: number = GetHeroInt(trig, true);
        const healing: number = 250 * abilityLevel + 3 * intelligence;

        SetUnitLifeBJ(targ, GetUnitState(targ, UNIT_STATE_LIFE) + healing);
    }
}
