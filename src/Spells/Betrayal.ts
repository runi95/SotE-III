import { Spell } from './Spell';

export class Betrayal extends Spell {
    protected readonly abilityId: number = FourCC('A00H');
    private readonly buffId: number = FourCC('Beng');

    protected condition(): boolean {
        return super.condition() && !UnitHasBuffBJ(GetTriggerUnit(), this.buffId);
    }

    protected action(): void {
        const trig: unit = GetTriggerUnit();
        const targ: unit = GetSpellTargetUnit();
        const targFacingDirection: number = GetUnitFacing(targ);
        const abilityLevel: number = GetUnitAbilityLevel(trig, FourCC('A00H'));
        const damage: number = 75.0 * abilityLevel + 3 * GetHeroInt(trig, true);
        const newX: number = GetUnitX(targ) + CosBJ(targFacingDirection) * -75;
        const newY: number = GetUnitY(targ) + SinBJ(targFacingDirection) * -75;

        TriggerSleepAction(0.05);

        SetUnitPosition(trig, newX, newY);
        UnitDamageTargetBJ(trig, targ, damage, ATTACK_TYPE_NORMAL, DAMAGE_TYPE_NORMAL);
        SetUnitFacing(trig, targFacingDirection);
    }
}
