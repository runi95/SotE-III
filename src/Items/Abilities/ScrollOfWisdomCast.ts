import { Trigger } from '../../JassOverrides/Trigger';
import { RandomNumberGenerator } from '../../Utility/RandomNumberGenerator';

export class ScrollOfWisdomCast {
    private readonly randomNumberGenerator: RandomNumberGenerator;
    private readonly trig: Trigger = new Trigger();
    private readonly itemId: number = FourCC('I04K');

    constructor(randomNumberGenerator: RandomNumberGenerator) {
        this.randomNumberGenerator = randomNumberGenerator;

        this.trig.addCondition(() => this.condition());
        this.trig.addAction(() => this.action());
        this.trig.registerAnyUnitEventBJ(EVENT_PLAYER_UNIT_SPELL_FINISH);
    }

    protected condition(): boolean {
        return UnitHasItemOfTypeBJ(GetTriggerUnit(), this.itemId);
    }

    protected action(): void {
        if (this.randomNumberGenerator.random(1, 100) > 5) {
            return;
        }

        BlzEndUnitAbilityCooldown(GetTriggerUnit(), GetSpellAbilityId());
    }
}
