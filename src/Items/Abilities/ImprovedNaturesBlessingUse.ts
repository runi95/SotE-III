import { ItemUse } from '../ItemUse';

export class ImprovedNaturesBlessingUse extends ItemUse {
    protected readonly itemTypeId: number = FourCC('I045');
    private readonly dummyUnitTypeId: number = FourCC('n001');
    private readonly dummyAbilityId: number = FourCC('A074');
    private readonly timedLifeBuffId: number = FourCC('BTLF');

    protected action(): void {
        const x: number = GetUnitX(GetTriggerUnit());
        const y: number = GetUnitY(GetTriggerUnit());
        const dummy: unit = CreateUnit(Player(PLAYER_NEUTRAL_AGGRESSIVE), this.dummyUnitTypeId, x, y, 0);
        UnitAddAbilityBJ(this.dummyAbilityId, dummy);
        UnitApplyTimedLifeBJ(2, this.timedLifeBuffId, dummy);
        IssueTargetOrder(dummy, 'rejuvination', GetTriggerUnit());
    }
}
