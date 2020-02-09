import { Spell } from './Spell';

export class EnvenomCast extends Spell {
    protected readonly abilityId: number = FourCC('A010');
    private readonly addAbilityId: number = FourCC('A017');

    protected action(): void {
        UnitAddAbilityBJ(this.addAbilityId, GetTriggerUnit());
        SetUnitAbilityLevel(GetTriggerUnit(), this.addAbilityId, 3);
    }
}
