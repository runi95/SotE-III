import { Trigger } from '../JassOverrides/Trigger';

export abstract class Spell {
    protected readonly abstract abilityId: number;
    private readonly trig: Trigger = new Trigger();

    constructor() {
        this.trig.addCondition(() => this.condition());
        this.trig.addAction(() => this.action());
        this.trig.registerAnyUnitEventBJ(EVENT_PLAYER_UNIT_SPELL_EFFECT);
    }

    protected condition(): boolean {
        return GetSpellAbilityId() === this.abilityId;
    }

    protected action(): void {}
}
