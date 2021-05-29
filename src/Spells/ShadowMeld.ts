import { Trigger } from "../JassOverrides/Trigger";

export class ShadowMeld {
    protected readonly abilityId: number = FourCC('A08P');
    private readonly trig: Trigger = new Trigger();
    private readonly dummyUnitTypeId: number = FourCC('n001');
    private readonly dummyAbilityId: number = FourCC('A08Q');
    private readonly timedLifeBuffId: number = FourCC('BTLF');

    constructor() {
        this.trig.addCondition(() => this.condition());
        this.trig.addAction(() => this.action());
        this.trig.registerAnyUnitEventBJ(EVENT_PLAYER_UNIT_SPELL_EFFECT);
    }

    protected condition(): boolean {
        return GetSpellAbilityId() === this.abilityId;
    }

    protected action(): void {
        const trig: unit = GetTriggerUnit();
        const dummy: unit = CreateUnit(GetOwningPlayer(trig), this.dummyUnitTypeId, GetUnitX(trig), GetUnitY(trig), 0);
        UnitAddAbilityBJ(this.dummyAbilityId, dummy);
        UnitApplyTimedLifeBJ(2, this.timedLifeBuffId, dummy);
        IssueTargetOrder(dummy, 'invisibility', trig);
    }
}
