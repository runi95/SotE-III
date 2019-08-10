import { Spell } from './Spell';

export class HolyLight extends Spell {
    protected readonly abilityId: number = FourCC('A031');

    protected action(): void {
        const trig: unit = GetTriggerUnit();
        const targ: unit = GetSpellTargetUnit();
        const abilityLevel: number = GetUnitAbilityLevel(trig, this.abilityId);
        const intelligence: number = GetHeroInt(trig, true);
        const healing: number = 50 * abilityLevel + intelligence;

        SetUnitLifeBJ(targ, GetUnitStateSwap(UNIT_STATE_LIFE, targ) + healing);
    }
}
