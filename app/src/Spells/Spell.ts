import { Trigger } from '../JassOverrides/Trigger';

export abstract class Spell {

    protected abstract abilityId: number;
    private trig: Trigger = new Trigger();

    constructor() {
        this.trig.AddCondition(() => this.condition());
        this.trig.AddAction(() => this.action());
        this.trig.RegisterAnyUnitEventBJ(EVENT_PLAYER_UNIT_SPELL_EFFECT);
    }

    protected condition(): boolean {
        return GetSpellAbilityId() === this.abilityId;
    }

    protected action(): void {}
}
