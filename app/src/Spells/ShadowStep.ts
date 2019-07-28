import { Trigger } from '../JassOverrides/Trigger';

export class ShadowStep {
    public readonly buffId: number = FourCC('B003');
    public readonly trig: Trigger = new Trigger();

    constructor() {
        this.trig.AddCondition(() => this.condition());
        this.trig.AddAction(() => this.action());
        this.trig.RegisterAnyUnitEventBJ(EVENT_PLAYER_UNIT_ISSUED_POINT_ORDER);
    }

    private condition(): boolean {
        if (!UnitHasBuffBJ(GetTriggerUnit(), this.buffId)) {
            return false;
        }

        return GetIssuedOrderIdBJ() === 851971;
    }

    private action(): void {
        const x: number = GetUnitX(GetTriggerUnit());
        const y: number = GetUnitY(GetTriggerUnit());
        const issuedX: number = GetOrderPointX();
        const issuedY: number = GetOrderPointY();
        const dist: number = SquareRoot(Pow(x - issuedX, 2) + Pow(y - issuedY, 2));
        const targetX: number = x + 100 * ((issuedX - x) / dist);
        const targetY: number = y + 100 * ((issuedY - y) / dist);
        if (!IsTerrainPathable(targetX, targetY, PATHING_TYPE_WALKABILITY)) {
            SetUnitPosition(GetTriggerUnit(), targetX, targetY);
            DestroyEffect(AddSpecialEffect('Abilities\\Spells\\Undead\\CarrionSwarm\\CarrionSwarmDamage.mdl', targetX, targetY));
        }
    }
}
